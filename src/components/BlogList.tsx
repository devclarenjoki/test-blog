
import React from 'react';
import type { BlogPost } from './types';

interface BlogListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-brand-slate rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group animate-slide-up"
            onClick={() => onSelectPost(post)}
            style={{ animationDelay: `${post.id * 100}ms`, animationFillMode: 'backwards' }}
          >
            <img className="w-full h-56 object-cover" src={post.imageUrl} alt={post.title} />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-brand-smoke group-hover:text-brand-secondary transition-colors duration-300">{post.title}</h2>
              <p className="text-sm text-gray-400 mb-4">
                By {post.author} on {post.date}
              </p>
              <p className="text-gray-300">{post.snippet}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
