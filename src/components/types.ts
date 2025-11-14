
export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  snippet: string;
  content: string; // Can be a remote URL or a local blob URL
  imageUrl: string;
}