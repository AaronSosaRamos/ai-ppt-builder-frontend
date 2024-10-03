import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
      setTimeout(() => setIsCopied(false), 2000);
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
          <h2 className="text-4xl font-bold mb-6">{slide.title}</h2>
          <p className="whitespace-pre-line text-lg leading-relaxed">{slide.content}</p>
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
        <span className="text-lg mx-4">{currentIndex + 1} / {totalSlides}</span>
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
