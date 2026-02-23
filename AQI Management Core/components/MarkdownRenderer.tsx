import React from 'react';

// Basic markdown-like rendering to avoid heavy dependencies if possible,
// but for a "world-class" feel we usually want a real parser.
// Since we can't install packages dynamically, we will implement a lightweight parser
// or assume a standard markdown structure. For this snippet, we'll do basic formatting.

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Split by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // Code block
          const content = part.slice(3, -3).replace(/^.*\n/, ''); // remove first line (lang)
          return (
            <div key={index} className="my-3 bg-gray-950 rounded-lg overflow-hidden border border-gray-700">
               <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 border-b border-gray-700 flex justify-between">
                  <span>Code</span>
               </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-blue-200">
                <code>{content}</code>
              </pre>
            </div>
          );
        } else {
          // Regular text with simple bold/paragraph handling
          return (
            <div key={index} className="whitespace-pre-wrap leading-relaxed">
              {part.split('\n').map((line, i) => (
                <p key={i} className="min-h-[1em]">
                   {line}
                </p>
              ))}
            </div>
          );
        }
      })}
    </>
  );
};