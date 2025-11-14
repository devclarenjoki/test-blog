import React, { useState, useRef, useEffect } from 'react';
import type { BlogPost as BlogPostType } from './components/types';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import AdminPanel from './components/AdminPanel';
import gsap from 'gsap'

const MOCK_POSTS: BlogPostType[] = [
  {
    id: 1,
    title: "Sample PDF Document 1",
    author: "W3C",
    date: "November 5, 2023",
    snippet: "A simple dummy PDF file from the World Wide Web Consortium (W3C).",
    content: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    imageUrl: "https://picsum.photos/seed/pdf1/800/600",
  },
  {
    id: 2,
    title: "Africa University Sample PDF",
    author: "Africa University",
    date: "November 4, 2023",
    snippet: "A sample PDF document used for educational purposes and examples.",
    content: "https://www.africau.edu/images/default/sample.pdf",
    imageUrl: "https://picsum.photos/seed/pdf2/800/600",
  },
  {
    id: 3,
    title: "UNEEC Sample PDF",
    author: "UNEEC",
    date: "November 3, 2023",
    snippet: "A sample PDF document from unec.edu.az for testing and demonstration.",
    content: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
    imageUrl: "https://picsum.photos/seed/pdf3/800/600",
  },
  {
    id: 4,
    title: "Research Paper on Immersive Experiences",
    author: "IEEE",
    date: "November 2, 2023",
    snippet: "A research paper discussing the future of immersive user experiences in virtual reality.",
    content: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    imageUrl: "https://picsum.photos/seed/pdf4/800/600",
  },
];

type View = 'list' | 'post' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('list');
  const [posts, setPosts] = useState<BlogPostType[]>(MOCK_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectPost = (post: BlogPostType) => {
    setSelectedPost(post);
    const tl = gsap.timeline({
      onComplete: () => setView('post'),
    });
    tl.to(containerRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });
  };

  const handleBack = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setView('list');
        setSelectedPost(null);
      },
    });
    tl.to(containerRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' });
  };
  
  const handleAddPost = (newPostData: Omit<BlogPostType, 'id'>) => {
    const newPost = {
      ...newPostData,
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setView('list');
  };

  useEffect(() => {
    if (containerRef.current) {
        gsap.fromTo(containerRef.current, 
            { opacity: 0, y: view === 'post' ? 20 : -20 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    }
  }, [view, selectedPost]);

  const renderView = () => {
    switch (view) {
      case 'post':
        return selectedPost && <BlogPost post={selectedPost} onBack={handleBack} />;
      case 'admin':
        return <AdminPanel onAddPost={handleAddPost} />;
      case 'list':
      default:
        return <BlogList posts={posts} onSelectPost={handleSelectPost} />;
    }
  };

  return (
    <div className="min-h-screen">
       <header className="bg-brand-slate/80 backdrop-blur-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold cursor-pointer" onClick={() => setView('list')}>
            Gemini<span className="text-brand-secondary">Blog</span>
          </h1>
          <div>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md transition-colors ${view === 'list' ? 'text-brand-secondary font-semibold' : 'hover:text-brand-light'}`}
            >
              Home
            </button>
            <button
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-md transition-colors ${view === 'admin' ? 'text-brand-secondary font-semibold' : 'hover:text-brand-light'}`}
            >
              Admin Panel
            </button>
          </div>
        </nav>
      </header>
      <main ref={containerRef}>
        {renderView()}
      </main>
      <footer className="text-center py-6 mt-12 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Gemini GSAP Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
