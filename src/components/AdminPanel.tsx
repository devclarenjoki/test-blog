import React, { useState } from 'react';
import type { BlogPost } from './types';
import { UploadIcon } from './Icons';

interface AdminPanelProps {
  onAddPost: (post: Omit<BlogPost, 'id'>) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setPdfUrl(''); // Clear URL input when a file is selected
        if (!title) {
          // Pre-fill title from filename, removing the .pdf extension
          setTitle(file.name.replace(/\.pdf$/i, ''));
        }
      } else {
        alert('Please select a valid PDF file.');
        e.target.value = ''; // Reset file input
      }
    }
  };

  const handlePublish = async () => {
    if (!title || (!pdfUrl && !selectedFile)) {
      alert('Please provide a title and either a PDF URL or a local file.');
      return;
    }

    let contentSource: string | Uint8Array;
    if (selectedFile) {
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        contentSource = new Uint8Array(arrayBuffer);
      } catch (error) {
        console.error("Error reading file:", error);
        alert("There was an error reading the selected file.");
        return;
      }
    } else {
      try {
        new URL(pdfUrl);
        contentSource = pdfUrl;
      } catch (_) {
        alert('Please enter a valid PDF URL.');
        return;
      }
    }

    const newPost: any = {
      title: title,
      content: contentSource,
      author: 'Admin',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      snippet: `View the document: ${title}`,
      imageUrl: `https://picsum.photos/seed/${Math.random()}/800/600`,
    };
    onAddPost(newPost);
    setTitle('');
    setPdfUrl('');
    setSelectedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement | null;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <h1 className="text-4xl font-bold text-center">Admin Content Dashboard</h1>

      {/* Content Editor */}
      <div className="bg-brand-slate p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Add New PDF Post</h2>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Document Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the post title"
              className="w-full p-3 bg-brand-dark border border-gray-700 rounded-md text-brand-smoke focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="pdfUrl"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              PDF URL
            </label>
            <input
              id="pdfUrl"
              type="url"
              value={pdfUrl}
              onChange={(e) => {
                setPdfUrl(e.target.value);
                if (e.target.value) {
                    setSelectedFile(null);
                }
              }}
              placeholder="https://example.com/document.pdf"
              className="w-full p-3 bg-brand-dark border border-gray-700 rounded-md text-brand-smoke focus:ring-2 focus:ring-brand-secondary focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-brand-slate text-sm text-gray-400">OR</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload a PDF File
            </label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
                <div className="flex text-sm text-gray-400 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-brand-slate rounded-md font-medium text-brand-secondary hover:text-brand-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-brand-slate focus-within:ring-brand-secondary px-1">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,application/pdf" onChange={handleFileChange} />
                  </label>
                </div>
                {selectedFile ? (
                  <p className="text-sm text-green-400">{selectedFile.name}</p>
                ) : (
                  <p className="text-xs text-gray-500">PDF documents only</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Publish */}
      <div className="text-center">
        <button
          onClick={handlePublish}
          className="px-10 py-4 bg-green-600 text-white text-lg font-bold rounded-md hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={!title || (!pdfUrl && !selectedFile)}
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
