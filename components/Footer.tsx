import { useState, useEffect } from 'react';

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const currentYear: number = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 w-full flex flex-col items-center justify-center space-y-4 text-center transition-colors duration-500">
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        © {year} AI PPT Builder. All rights reserved.
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Made by: <span className="font-bold">Wilfredo Aaron Sosa Ramos</span>
      </p>
    </footer>
  );
};

export default Footer;
