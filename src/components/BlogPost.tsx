import React, { useState, useEffect } from 'react';
import type { BlogPost as BlogPostType } from './types';
import { LoaderIcon } from './Icons';

// pdf.js is loaded from the CDN in index.html
declare var pdfjsLib: any;

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const [parsedContent, setParsedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsePdfContent = async () => {
      setIsLoading(true);
      setError(null);
      setParsedContent('');
      
      try {
        const loadingTask = pdfjsLib.getDocument(post.content);
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n\n'; // Add newlines between pages for spacing
        }
        
        setParsedContent(fullText.trim());
      } catch (err) {
        console.error('Failed to parse PDF:', err);
        setError('Could not load or parse the PDF document. The file might be corrupted or inaccessible due to security (CORS) policies.');
      } finally {
        setIsLoading(false);
      }
    };

    if (post.content && typeof pdfjsLib !== 'undefined') {
      parsePdfContent();
    } else {
        setError("PDF parsing library is not available.");
        setIsLoading(false);
    }
  }, [post.content]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <LoaderIcon className="w-12 h-12 animate-spin text-brand-secondary" />
          <p className="mt-4 text-lg text-gray-400">Parsing document...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 text-center bg-red-900/50 border border-red-500 rounded-lg">
          <h3 className="text-xl font-bold text-red-300">Error</h3>
          <p className="mt-2 text-red-400">{error}</p>
        </div>
      );
    }

    return (
      <div 
        className="prose prose-invert lg:prose-lg max-w-none prose-p:text-gray-300 prose-headings:text-brand-smoke whitespace-pre-wrap"
      >
        {parsedContent}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={onBack}
        className="mb-8 text-brand-secondary hover:underline transition-all"
      >
        &larr; Back to all posts
      </button>
      <article className="max-w-4xl mx-auto">
        <img className="w-full h-96 object-cover rounded-lg mb-8" src={post.imageUrl} alt={post.title} />
        <h1 className="text-5xl font-extrabold mb-4 text-brand-smoke">{post.title}</h1>
        <p className="text-gray-400 mb-8">
          By {post.author} on {post.date}
        </p>
        <div className="p-6 sm:p-8 mt-8 bg-brand-slate/50 border border-gray-700 rounded-lg">
          {renderContent()}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;