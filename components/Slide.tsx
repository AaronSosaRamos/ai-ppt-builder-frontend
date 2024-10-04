import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Choose any style you like for syntax highlighting

interface SlideProps {
  slide: {
    title: string;
    content: string;
  };
  currentIndex: number;
  totalSlides: number;
  goToNext: () => void;
  goToPrev: () => void;
}

const Slide: React.FC<SlideProps> = ({ slide, currentIndex, totalSlides, goToNext, goToPrev }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const copyText = `Title: ${slide.title}\n\n${slide.content}`;
      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-xl w-full max-w-3xl transition-all">
      <Transition
        appear
        show
        enter="transform transition ease-in-out duration-700"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Render title with Markdown, but without code or tables */}
          <ReactMarkdown className="text-4xl font-bold mb-6">
            {slide.title}
          </ReactMarkdown>

          {/* Render content, applying remark and rehype plugins ONLY if content has code blocks or tables */}
          <ReactMarkdown
            className="whitespace-pre-line text-lg leading-relaxed"
            remarkPlugins={[remarkGfm]}  // Enable GitHub Flavored Markdown for tables and lists
            rehypePlugins={[rehypeHighlight]}  // Syntax highlighting for code blocks
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || ''); // Detect language for syntax highlighting
                return match ? (
                  <pre className={`p-4 my-4 rounded-md bg-gray-100 dark:bg-gray-700`}>
                    <code className={`${className}`} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <table className="table-auto border-collapse border border-gray-400 w-full my-4">
                    {children}
                  </table>
                );
              },
              th({ children }) {
                return <th className="border border-gray-300 px-4 py-2 bg-gray-200">{children}</th>;
              },
              td({ children }) {
                return <td className="border border-gray-300 px-4 py-2">{children}</td>;
              },
            }}
          >
            {slide.content}
          </ReactMarkdown>
        </motion.div>
      </Transition>

      <button
        onClick={handleCopy}
        className="right-4 top-4 md:right-8 md:top-8 flex items-center p-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition md:p-2 md:mr-2"
      >
        {isCopied ? (
          <>
            <FontAwesomeIcon icon={faCheck} className="h-5 w-5 mr-2" />
            Copied
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faClipboard} className="h-5 w-5 mr-2" />
            Copy
          </>
        )}
      </button>

      <div className="bottom-6 flex justify-between items-center w-full px-10 mt-4">
        <button
          onClick={goToPrev}
          className="p-3 text-blue-500 hover:text-blue-700 transition"
          disabled={currentIndex === 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-6 w-6" />
        </button>
        <span className="text-lg mx-4">
          {currentIndex + 1} / {totalSlides}
        </span>
        <button
          onClick={goToNext}
          className="p-3 text-blue-500 hover:text-blue-700 transition"
          disabled={currentIndex === totalSlides - 1}
        >
          <FontAwesomeIcon icon={faArrowRight} className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Slide;
