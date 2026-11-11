import type { ServiceArticle } from "@/lib/service-article-types";
import { restorativeArticles } from "@/lib/service-articles-restorative";
import { advancedArticles } from "@/lib/service-articles-advanced";

export const serviceArticles: Record<string, ServiceArticle> = {
  ...restorativeArticles,
  ...advancedArticles,
};

export function getServiceArticle(slug: string): ServiceArticle | undefined {
  return serviceArticles[slug];
}
