export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  skills: string[];
  benefits: string[];
  suitableFor: string[];
  imageUrl: string;
  relevanceScore?: number;
}