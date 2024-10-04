import { useState } from 'react';
import Slide from './Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';

interface PresentationProps {
  title: string;
  description: string;
  slides: {
    title: string;
    content: string;
  }[];
}

const Presentation: React.FC<PresentationProps> = ({ title, description, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCopyPresentation = async () => {
    try {
      const copyText = `Presentation Title: ${title}\n\nDescription: ${description}`;
      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="mt-5 flex flex-col items-center justify-center min-h-screen bg-blue-50 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="max-w-4xl w-full p-4 sm:p-8 text-center">
        <div className="relative mb-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 break-words">{title}</h1>
          <p className="text-lg md:text-xl mb-4 break-words">{description}</p>

          <button
            onClick={handleCopyPresentation}
            className="flex items-center p-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition md:p-2 md:mr-2"
          >
            {isCopied ? (
              <>
                <FontAwesomeIcon icon={faCheck} className="h-5 w-5 mr-2" />
                Copied
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faClipboard} className="h-5 w-5 mr-2" />
                Copy Info
              </>
            )}
          </button>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-2xl">
            <Slide
              slide={slides[currentIndex]}
              currentIndex={currentIndex}
              totalSlides={slides.length}
              goToNext={goToNext}
              goToPrev={goToPrev}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
