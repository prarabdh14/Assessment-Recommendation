// Simulate backend API for assessment predictions

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string | number | null;
  skills: string[];
  benefits: string[];
  suitableFor: string[];
  imageUrl: string;
  jobLevel: string | number | null;
  remoteTestingAvailable: boolean;
  similarity_score: number;
}

interface ApiResponse {
  success: boolean;
  recommendations: Assessment[];
}

export async function predictAssessment(jobDescription: string): Promise<Assessment[]> {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_description: jobDescription }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch assessment recommendations');
    }
    
    // Get the raw text and replace NaN with null
    const rawText = await response.text();
    const cleanedText = rawText.replace(/NaN/g, 'null');
    
    // Parse the cleaned JSON
    const data: ApiResponse = JSON.parse(cleanedText);
    
    if (!data.success) {
      throw new Error('Failed to get assessment recommendations');
    }
    
    return data.recommendations;
  } catch (error) {
    console.error('Error fetching assessment prediction:', error);
    throw error;
  }
}