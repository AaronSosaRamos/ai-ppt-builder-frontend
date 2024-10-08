import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineAppstoreAdd, AiOutlineCloudUpload, AiFillFilePpt } from 'react-icons/ai';
import { MdDarkMode, MdOutlineComputer, MdOutlineDesignServices } from 'react-icons/md';
import { GiRobotGolem } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

const MainScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleTryIt = () => {
    router.push('/ai-ppt-builder');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500 px-4">
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={toggleDarkMode}
          className="bg-red-light dark:bg-red-dark text-white p-2 md:p-3 rounded-full hover:scale-110 transition-transform duration-300"
        >
          <MdDarkMode className="text-2xl md:text-3xl" />
        </button>
      </div>

      <motion.div
        className="absolute w-full h-full top-0 left-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-red-light dark:bg-red-dark opacity-20 rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-red-light dark:bg-red-dark opacity-30 rounded-full bottom-20 right-16 animate-pulse"></div>
        <div className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-red-light dark:bg-red-dark opacity-25 rounded-full bottom-32 left-32 animate-pulse"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-center z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          AI PPT Builder
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          The Future of Presentation Creation with AI Power
        </p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center mb-12"
        >
          <div className="group flex flex-col items-center">
            <AiOutlineAppstoreAdd className="text-red-light dark:text-red-dark text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300" />
            <p className="mt-4 text-gray-900 dark:text-white font-semibold text-md sm:text-lg">Add Slides</p>
          </div>
          <div className="group flex flex-col items-center">
            <MdOutlineComputer className="text-red-light dark:text-red-dark text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300" />
            <p className="mt-4 text-gray-900 dark:text-white font-semibold text-md sm:text-lg">Customize & Edit</p>
          </div>
          <div className="group flex flex-col items-center">
            <AiFillFilePpt className="text-red-light dark:text-red-dark text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300" />
            <p className="mt-4 text-gray-900 dark:text-white font-semibold text-md sm:text-lg">Generate PPT</p>
          </div>
          <div className="group flex flex-col items-center">
            <MdOutlineDesignServices className="text-red-light dark:text-red-dark text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300" />
            <p className="mt-4 text-gray-900 dark:text-white font-semibold text-md sm:text-lg">AI Design</p>
          </div>
          <div className="group flex flex-col items-center">
            <GiRobotGolem className="text-red-light dark:text-red-dark text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300" />
            <p className="mt-4 text-gray-900 dark:text-white font-semibold text-md sm:text-lg">Automated Edits</p>
          </div>
          <div className="group flex flex-col items-center">
            <AiOutlineCloudUpload className="text-red-light dark:text-red-dark text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300" />
            <p className="mt-4 text-gray-900 dark:text-white font-semibold text-md sm:text-lg">Cloud Integration</p>
          </div>
        </motion.div>

        <motion.button
          onClick={handleTryIt}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-light dark:bg-red-dark text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg font-bold text-md sm:text-xl transition-transform duration-300"
        >
          Try it
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MainScreen;
