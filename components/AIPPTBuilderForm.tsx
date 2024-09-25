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
import dynamic from 'next/dynamic';

const LazyResults = dynamic(() => import('./ResultsComponent'), {
    suspense: true,
});

const Spinner = () => (
    <div className="flex items-center justify-center h-full">
        <AiOutlineCloudUpload className="animate-spin text-6xl text-red-500" />
    </div>
);

const presentationData = {
    title: 'Introducción a Python',
    description: 'Una presentación básica sobre programación en Python para principiantes.',
    slides: [
      {
        title: 'Introducción',
        content: 'Python es un lenguaje de programación ampliamente utilizado, especialmente en el ámbito científico. Es conocido por su legibilidad y sintaxis sencilla, lo que lo hace ideal para principiantes.\n\nEn esta presentación, cubriremos los conceptos básicos de Python, incluyendo variables, tipos de datos, estructuras de control y más.'
      },
      {
        title: 'Variables',
        content: 'Las variables son como contenedores para almacenar datos en Python. Puedes pensar en ellas como etiquetas que se asignan a diferentes valores.\n\nEjemplo:\n\n```python\nmensaje = "¡Hola, mundo!" \n```\n\nEn este ejemplo, \'mensaje\' es la variable y "¡Hola, mundo!" es el valor asignado a la variable.'
      },
      {
        title: 'Tipos de Datos',
        content: 'Python tiene varios tipos de datos incorporados, incluyendo:\n\n* Enteros (int): Números enteros como 10, 25, -5.\n* Flotantes (float): Números con decimales como 3.14, 2.7, -1.0.\n* Cadenas (str): Secuencias de caracteres como "Hola", "Python", "programación".\n* Booleanos (bool): Valores de verdad, True o False.'
      },
      {
        title: 'Control de Flujo',
        content: 'El control de flujo determina el orden en que se ejecutan las instrucciones en un programa. Las estructuras de control comunes incluyen:\n\n* Condicionales (if, elif, else): Permiten ejecutar diferentes bloques de código según una condición.\n* Bucles (for, while): Permiten repetir un bloque de código varias veces.'
      },
      {
        title: 'Funciones',
        content: 'Las funciones son bloques de código reutilizables que realizan una tarea específica. Puedes definir tus propias funciones o usar funciones predefinidas de Python.\n\nEjemplo:\n\n```python\ndef saludar(nombre):\n  print(f"¡Hola, {nombre}!")\n\nsaludar("Juan")\n```\n\nEsta función \'saludar\' toma un nombre como argumento e imprime un saludo personalizado.'
      },
      {
        title: 'Módulos',
        content: "Los módulos son archivos de Python que contienen funciones, clases y variables predefinidas que puedes reutilizar en tus propios programas.\n\nPara usar un módulo, primero debes importarlo:\n\n```python\nimport math\n\nprint(math.pi)\n```\n\nEste código importa el módulo 'math' y luego usa la constante 'pi' definida en ese módulo."
      },
      {
        title: 'Entrada/Salida de Archivos (File I/O)',
        content: 'Python te permite leer y escribir datos en archivos. Esto es útil para almacenar información de forma permanente o para procesar grandes conjuntos de datos.\n\nEjemplo:\n\n```python\nwith open("mi_archivo.txt", "w") as archivo:\n  archivo.write("¡Hola desde Python!")\n```\n\nEste código abre el archivo \'mi_archivo.txt\' en modo de escritura (\'w\') y escribe una línea de texto en él.'
      },
      {
        title: 'Manejo de Errores',
        content: 'El manejo de errores te permite prevenir que tu programa se detenga inesperadamente debido a errores. Puedes usar bloques try-except para capturar y manejar excepciones.\n\nEjemplo:\n\n```python\ntry:\n  resultado = 10 / 0\nexcept ZeroDivisionError:\n  print("Error: No puedes dividir entre cero.")\n```\n\nEste código intenta dividir 10 entre 0, lo que genera una excepción \'ZeroDivisionError\'. El bloque \'except\' captura la excepción e imprime un mensaje de error.'
      },
      {
        title: 'Clases',
        content: 'Las clases son plantillas para crear objetos, que son instancias de una clase. Las clases pueden tener atributos (datos) y métodos (funciones) que definen su comportamiento.\n\nEjemplo:\n\n```python\nclass Perro:\n  def __init__(self, nombre):\n    self.nombre = nombre\n\n  def ladrar(self):\n    print("¡Woof!")\n\nmi_perro = Perro("Fido")\nprint(mi_perro.nombre)\nmi_perro.ladrar()\n```\n\nEste código define una clase \'Perro\' con un atributo \'nombre\' y un método \'ladrar\'. Luego crea un objeto \'mi_perro\' de la clase \'Perro\'.'
      },
      {
        title: 'Conclusión',
        content: 'Esta presentación ha cubierto los conceptos básicos de Python, pero es solo el comienzo. Python es un lenguaje poderoso y versátil con una gran comunidad y muchos recursos disponibles para aprender más. ¡Sigue practicando y explorando para convertirte en un experto en Python!'
      }
    ]
  };
  

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
        toast.success('Form submitted successfully! ✅');
        setLoading(true); 

        await new Promise(resolve => setTimeout(resolve, 2000));

        setShowResults(true); 
        setLoading(false);
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

            {
                loading && (
                    <Spinner />
                )
            }

            {!loading && showResults && (
                <Suspense fallback={<Spinner />}>
                    <LazyResults data={presentationData} />
                </Suspense>
            )}

        </div>
    );
};

export default AIPPTBuilderForm;
