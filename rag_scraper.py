import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import json
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Constants
BASE_URL = "https://www.shl.com"
CATALOG_URL = "https://www.shl.com/solutions/products/product-catalog/"
OUTPUT_FILE = "shl_assessments_rag.csv"
CACHE_FILE = "assessment_cache.json"

# Initialize models
try:
    # Load sentence transformer for embeddings
    logger.info("Loading sentence transformer model...")
    sentence_transformer = SentenceTransformer('all-MiniLM-L6-v2')
    
    # Load text classification model for feature extraction
    logger.info("Loading text classification model...")
    classifier = pipeline("text-classification", model="facebook/bart-large-mnli")
    
    logger.info("Models loaded successfully")
except Exception as e:
    logger.error(f"Error loading models: {e}")
    raise

def get_assessment_links():
    """Retrieve all assessment links from the catalog page."""
    logger.info("Fetching assessment links from catalog...")
    try:
        response = requests.get(CATALOG_URL)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        cards = soup.find_all("a", class_="product-card")
        links = [BASE_URL + card['href'] for card in cards if card.get('href')]
        
        logger.info(f"Found {len(links)} assessment links")
        return links
    except Exception as e:
        logger.error(f"Error fetching assessment links: {e}")
        return []

def extract_features_with_rag(text):
    """Extract features using RAG approach with transformer models."""
    features = {
        "duration": "N/A",
        "remote": "No",
        "adaptive": "No",
        "test_type": "N/A"
    }
    
    # Generate embeddings for the text
    text_embedding = sentence_transformer.encode(text)
    
    # Define feature templates
    feature_templates = {
        "duration": ["duration", "time", "length", "minutes", "hours"],
        "remote": ["remote", "online", "virtual", "web-based"],
        "adaptive": ["adaptive", "irt", "item response theory", "dynamic"],
        "test_type": ["type", "category", "format", "style"]
    }
    
    # Extract features using zero-shot classification
    for feature, templates in feature_templates.items():
        for template in templates:
            result = classifier(text, candidate_labels=[template], hypothesis_template=f"This text contains information about {template}.")
            if result[0]['scores'][0] > 0.7:  # Confidence threshold
                if feature == "duration":
                    # Extract duration value using regex or text processing
                    import re
                    duration_match = re.search(r'(\d+)\s*(minute|hour|min|hr)', text.lower())
                    if duration_match:
                        features["duration"] = f"{duration_match.group(1)} {duration_match.group(2)}"
                elif feature in ["remote", "adaptive"]:
                    features[feature] = "Yes"
                elif feature == "test_type":
                    # Extract test type using context
                    type_match = re.search(r'type:?\s*([^.,]+)', text.lower())
                    if type_match:
                        features["test_type"] = type_match.group(1).strip()
    
    return features

def parse_assessment_page(url):
    """Parse an assessment page and extract information using RAG."""
    logger.info(f"Parsing assessment page: {url}")
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract title
        name = soup.find("h1").text.strip() if soup.find("h1") else "N/A"
        
        # Extract all text content for RAG processing
        content = soup.get_text()
        
        # Extract features using RAG
        features = extract_features_with_rag(content)
        
        assessment_data = {
            "Assessment Name": name,
            "URL": url,
            "Duration": features["duration"],
            "Remote Testing": features["remote"],
            "Adaptive Support": features["adaptive"],
            "Test Type": features["test_type"]
        }
        
        logger.info(f"Successfully parsed assessment: {name}")
        return assessment_data
    except Exception as e:
        logger.error(f"Error parsing assessment page {url}: {e}")
        return None

def load_cache():
    """Load cached assessment data if available."""
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading cache: {e}")
    return {}

def save_cache(cache_data):
    """Save assessment data to cache."""
    try:
        with open(CACHE_FILE, 'w') as f:
            json.dump(cache_data, f)
        logger.info("Cache saved successfully")
    except Exception as e:
        logger.error(f"Error saving cache: {e}")

def scrape_catalog():
    """Main function to scrape the assessment catalog using RAG."""
    logger.info("Starting catalog scraping with RAG...")
    
    # Load cache
    cache = load_cache()
    
    # Get assessment links
    links = get_assessment_links()
    logger.info(f"Found {len(links)} assessments to process")
    
    data = []
    for i, link in enumerate(links):
        # Check cache first
        if link in cache:
            logger.info(f"[{i+1}/{len(links)}] Using cached data for: {link}")
            data.append(cache[link])
            continue
        
        try:
            logger.info(f"[{i+1}/{len(links)}] Scraping: {link}")
            item = parse_assessment_page(link)
            if item:
                data.append(item)
                cache[link] = item  # Update cache
                save_cache(cache)  # Save cache after each successful scrape
            time.sleep(2)  # Polite delay between requests
        except Exception as e:
            logger.error(f"Failed to scrape {link}: {e}")
    
    # Create DataFrame and save to CSV
    df = pd.DataFrame(data)
    df.to_csv(OUTPUT_FILE, index=False)
    logger.info(f"✅ Saved {len(data)} assessments to {OUTPUT_FILE}")

if __name__ == "__main__":
    scrape_catalog() 