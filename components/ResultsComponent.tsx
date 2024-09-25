import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineFileText, AiOutlineRocket, AiFillStar } from 'react-icons/ai';
import { MdOutlineInsertComment, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { GiLightBulb, GiMagicGate, GiBookmarklet, GiPaintBrush } from 'react-icons/gi';

const SlideItem = ({ title, content }: { title: string; content: string }) => {
  const icons = [
    { icon: <AiOutlineFileText className="text-blue-500 text-4xl" />, key: 'file-text' },
    { icon: <GiLightBulb className="text-yellow-400 text-4xl" />, key: 'light-bulb' },
    { icon: <MdOutlineInsertComment className="text-purple-500 text-4xl" />, key: 'comment' },
    { icon: <AiOutlineRocket className="text-green-800 text-4xl" />, key: 'rocket' },
    { icon: <GiMagicGate className="text-pink-500 text-4xl" />, key: 'magic-gate' },
    { icon: <AiFillStar className="text-orange-500 text-4xl" />, key: 'star' },
    { icon: <GiBookmarklet className="text-red-500 text-4xl" />, key: 'bookmarklet' },
    { icon: <GiPaintBrush className="text-indigo-500 text-4xl" />, key: 'paint-brush' },
    { icon: <MdOutlineTipsAndUpdates className="text-green-800 text-4xl" />, key: 'tips' },
  ];

  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <motion.div
      className="bg-gradient-to-r from-green-400 to-blue-400 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-lg p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 text-white flex-grow">
          {title}
        </h2>
        <div className="ml-4" key={randomIcon.key}>{randomIcon.icon}</div>
      </div>
      <p className="text-white dark:text-gray-300 text-lg leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};

export default function ResultsComponent({ data }: { data: any }) {
  return (
    <div className="space-y-8 p-6 md:p-12">
      <motion.h1
        className="text-5xl font-extrabold text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {data.title} 🌟
      </motion.h1>
      <motion.p
        className="text-xl text-gray-600 dark:text-gray-300 mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {data.description} ✨
      </motion.p>
      {data.slides.map((slide: any, index: number) => (
        <SlideItem key={index} title={slide.title} content={slide.content} />
      ))}

      <motion.button
        className={`w-full bg-red-500 text-white py-3 rounded-lg font-bold transition-colors duration-300 hover:bg-red-600`}
        whileHover={{ scale: 1.05 }}
      >
        {'Generate PPT 📨'}
      </motion.button>
    </div>
  );
};
