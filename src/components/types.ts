
export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  snippet: string;
  content: string; // Markdown content
  imageUrl: string;
}
