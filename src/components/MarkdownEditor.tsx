
import React, { useState, useEffect } from 'react';

declare var marked: any;
declare var DOMPurify: any;

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const [htmlPreview, setHtmlPreview] = useState('');

  useEffect(() => {
    if (value && typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
      const rawHtml = marked.parse(value);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setHtmlPreview(sanitizedHtml);
    } else {
      setHtmlPreview('');
    }
  }, [value]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing your blog post in Markdown..."
        className="w-full h-full p-4 bg-brand-dark border border-gray-700 rounded-md text-brand-smoke focus:ring-2 focus:ring-brand-secondary focus:outline-none resize-none font-mono"
      />
      <div className="w-full h-full p-4 bg-brand-dark border border-gray-700 rounded-md overflow-y-auto">
        <div
          className="prose prose-invert lg:prose-lg max-w-none prose-p:text-gray-300 prose-a:text-brand-secondary"
          dangerouslySetInnerHTML={{ __html: htmlPreview || '<p class="text-gray-500">Preview will appear here</p>' }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
