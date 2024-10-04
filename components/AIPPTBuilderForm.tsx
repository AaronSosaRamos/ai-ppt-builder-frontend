import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { AiOutlineCloudUpload, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdOutlineLanguage, MdOutlineSlideshow, MdDarkMode } from 'react-icons/md';
import { GiNotebook, GiTargeting } from 'react-icons/gi';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { GiRobotGolem } from 'react-icons/gi';
import Presentation from '@/components/Presentation';
import axiosInstance from '@/lib/axiosInstance';

const Spinner = () => (
    <div className="flex items-center justify-center h-full">
        <AiOutlineCloudUpload className="animate-spin text-6xl text-red-500" />
    </div>
);

const formSchema = z.object({
    topic: z.string().min(1, 'Topic is required'),
    objective: z.string().min(1, 'Objective is required'),
    target_audience: z.string().min(1, 'Target audience is required'),
    n_slides: z.number().positive('Number of slides must be positive').int(),
    slide_breakdown: z.string().min(1, 'Slide breakdown is required'),
    lang: z.enum(['en', 'es', 'fr', 'de', 'it', 'pt']),
    file_url: z.string().url('Please provide a valid URL'),
    file_type: z.enum([
        'pdf', 'csv', 'txt', 'md', 'url', 'pptx', 'docx', 'xls', 'xlsx', 'xml', 'gdoc', 'gsheet', 'gslide', 'gpdf', 'youtube_url', 'img',
    ]),
});

type FormData = z.infer<typeof formSchema>;

const AIPPTBuilderForm = () => {
    const [results, setResults] = useState<any>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setShowResults(false);
        setResults(null);
        setLoading(true);

        const formData = {
            request_args: {
                topic: data.topic,
                objective: data.objective,
                target_audience: data.target_audience,
                n_slides: data.n_slides,
                slide_breakdown: data.slide_breakdown,
                lang: data.lang
            },
            file_url: data.file_url,
            file_type: data.file_type
        }

        try {
            const response = await axiosInstance.post('/generate-ppt', formData);

            toast.success('PPT generated successfully! ✅');
            setResults(response.data);
            setShowResults(true); 
        } catch (error) {
            toast.error('Error occurred while generating the PPT.');
        } finally {
            setLoading(false);
        }
    };

    const onError = () => {
        toast.error('Please check your inputs. ⚠️');
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500 p-4 z-10">
            <button
                className="absolute top-5 left-5 text-gray-900 dark:text-white hover:scale-110 transition-transform z-20"
                onClick={() => router.push('/')}
            >
                <AiOutlineArrowLeft className="text-2xl" />
            </button>

            <div className="absolute top-3 right-5 z-20">
                <button
                    onClick={toggleDarkMode}
                    className="bg-red-light dark:bg-red-dark text-white p-2 md:p-3 rounded-full hover:scale-110 transition-transform duration-300"
                >
                    <MdDarkMode className="text-2xl md:text-3xl" />
                </button>
            </div>

            <motion.div
                className="absolute w-full h-full top-0 left-0 z-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
                <div className="absolute w-56 h-56 sm:w-72 sm:h-72 bg-red-light dark:bg-red-dark opacity-20 rounded-full top-10 left-10 animate-pulse"></div>
                <div className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-red-light dark:bg-red-dark opacity-30 rounded-full bottom-20 right-16 animate-pulse"></div>
                <div className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-red-light dark:bg-red-dark opacity-25 rounded-full bottom-32 left-32 animate-pulse"></div>
                <div className="absolute w-28 h-28 bg-red-light dark:bg-red-dark opacity-20 rounded-full top-32 right-32 animate-pulse"></div>
            </motion.div>

            <motion.h1
                className="text-4xl max-md:text-3xl font-bold text-gray-900 dark:text-white mb-6 z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                AI PPT Builder 🛠️
            </motion.h1>

            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="w-full max-w-lg bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-500 space-y-6 z-10"
            >
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Topic:</label>
                    <div className="flex items-center space-x-2">
                        <GiNotebook className="text-2xl text-gray-700 dark:text-gray-300" />
                        <input
                            type="text"
                            {...register('topic')}
                            placeholder="Enter the topic 📑"
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                    </div>
                    {errors.topic && <p className="text-red-500 mt-2">{errors.topic.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Objective:</label>
                    <div className="flex items-center space-x-2">
                        <GiRobotGolem className="text-2xl text-gray-700 dark:text-gray-300" />
                        <textarea
                            {...register('objective')}
                            placeholder="What's the objective? 🎯"
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                    </div>
                    {errors.objective && <p className="text-red-500 mt-2">{errors.objective.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Target Audience:</label>
                    <div className="flex items-center space-x-2">
                        <GiTargeting className="text-2xl text-gray-700 dark:text-gray-300" />
                        <input
                            type="text"
                            {...register('target_audience')}
                            placeholder="Who's your audience? 👥"
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                    </div>
                    {errors.target_audience && <p className="text-red-500 mt-2">{errors.target_audience.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Number of Slides:</label>
                    <div className="flex items-center space-x-2">
                        <MdOutlineSlideshow className="text-2xl text-gray-700 dark:text-gray-300" />
                        <input
                            type="number"
                            {...register('n_slides', { valueAsNumber: true })}
                            placeholder="Number of slides 🎞️"
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                    </div>
                    {errors.n_slides && <p className="text-red-500 mt-2">{errors.n_slides?.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Slide Breakdown:</label>
                    <div className="flex items-center space-x-2">
                        <GiNotebook className="text-2xl text-gray-700 dark:text-gray-300" />
                        <textarea
                            {...register('slide_breakdown')}
                            placeholder="Describe the slide breakdown 📝"
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                    </div>
                    {errors.slide_breakdown && <p className="text-red-500 mt-2">{errors.slide_breakdown.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Language:</label>
                    <div className="flex items-center space-x-2">
                        <MdOutlineLanguage className="text-2xl text-gray-700 dark:text-gray-300" />
                        <select
                            {...register('lang')}
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        >
                            <option value="en">English 🇬🇧</option>
                            <option value="es">Spanish 🇪🇸</option>
                            <option value="fr">French 🇫🇷</option>
                            <option value="de">German 🇩🇪</option>
                            <option value="it">Italian 🇮🇹</option>
                            <option value="pt">Portuguese 🇵🇹</option>
                        </select>
                    </div>
                    {errors.lang && <p className="text-red-500 mt-2">{errors.lang.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">File URL:</label>
                    <div className="flex items-center space-x-2">
                        <AiOutlineCloudUpload className="text-2xl text-gray-700 dark:text-gray-300" />
                        <input
                            type="text"
                            {...register('file_url')}
                            placeholder="Paste the file URL 🌐"
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                    </div>
                    {errors.file_url && <p className="text-red-500 mt-2">{errors.file_url.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">File Type:</label>
                    <div className="flex items-center space-x-2">
                        <AiOutlineCloudUpload className="text-2xl text-gray-700 dark:text-gray-300" />
                        <select
                            {...register('file_type')}
                            className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg"
                        >
                            <option value="pdf">PDF 📄</option>
                            <option value="csv">CSV 📊</option>
                            <option value="txt">TXT 📃</option>
                            <option value="md">Markdown 📝</option>
                            <option value="url">URL 🌐</option>
                            <option value="pptx">PowerPoint 📽️</option>
                            <option value="docx">Word 📄</option>
                            <option value="xls">Excel 📊</option>
                            <option value="xlsx">Excel (XLSX) 📊</option>
                            <option value="xml">XML 🛠️</option>
                            <option value="gdoc">Google Doc 📝</option>
                            <option value="gsheet">Google Sheet 📊</option>
                            <option value="gslide">Google Slide 📽️</option>
                            <option value="gpdf">Google PDF 📄</option>
                            <option value="youtube_url">YouTube URL 🎥</option>
                            <option value="img">Image 🖼️</option>
                        </select>
                    </div>
                    {errors.file_type && <p className="text-red-500 mt-2">{errors.file_type.message}</p>}
                </div>
                <motion.button
                    type="submit"
                    className={`w-full bg-red-500 text-white py-3 rounded-lg font-bold transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                    whileHover={{ scale: loading ? 1 : 1.05 }}
                    disabled={loading} 
                >
                    {loading ? 'Processing...' : 'Submit 📨'}
                </motion.button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />

            {loading && <Spinner />}

            {!loading && showResults && results && (
                <Suspense fallback={<Spinner />}>
                    <Presentation {...results} />
                </Suspense>
            )}
        </div>
    );
};

export default AIPPTBuilderForm;
