export type ServiceArticle = {
  lead: string;
  overview: string[];
  occasions: string[];
  stages: { title: string; body: string }[];
  aftercare: string[];
  considerations: string[];
  pricing: string;
  faq: { question: string; answer: string }[];
};
