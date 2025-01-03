import React from 'react';
import { motion } from 'framer-motion';
import GuestLayout from '../Layouts/GuestLayout';
import { Head, router } from '@inertiajs/react'; // Import router
import '../../../resources/css/Scrollbar.css';
import Searchbar from '../../../resources/js/Components/Searchbar'; // Import the Searchbar component
import searchImage from '@/Components/uploadedImage.jpg';
import libraryImage from '@/Components/uploadedImage1.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export default function GuestPage() {
    // Define the handleSearch function
    const handleSearch = (searchTerm, filters) => {
        const url = route('userpapers.view'); // Replace with your route name
        const data = {
            searchQuery: searchTerm,
        };
        router.get(url, data); // Use Inertia's router to navigate or fetch data
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const searchbarVariants = {
        focused: { scale: 1.05, transition: { duration: 0.3 } },
        default: { scale: 1, transition: { duration: 0.3 } },
    };

    const iconVariants = {
        hover: { scale: 1.3, transition: { duration: 0.3 } },
        default: { scale: 1, transition: { duration: 0.3 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    const footerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const featureVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <GuestLayout>
            <Head title="Home" />
            <main className="bg-white">
                {/* Hero Section */}
                <motion.section
                    className="relative py-16"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    whileInView="visible"
                    viewport={{ once: false }}  // Ensures animation happens when scrolls down
                >
                    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="max-w-xl">
                            <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center lg:text-left">
                                Discover<br />
                                Academic Excellence
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Welcome to TUP Manila's Institutional Repository System - your gateway to a vast collection of thesis papers. 
                                Explore groundbreaking research, innovative solutions, and scholarly works from our talented students and faculty.
                            </p>
                            {/* Use the Searchbar component */}
                            <motion.div
                                initial="default"
                                animate="default"
                                variants={searchbarVariants}
                            >
                                <Searchbar onSearch={handleSearch} />
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { duration: 1 } }}
                        >
                            <img 
                                src={searchImage} 
                                alt="Library" 
                                className="w-full rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section
                    className="py-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }} // Ensures animation happens when scrolls down
                    variants={staggerContainer}
                >
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl font-bold text-center mb-12">Explore Our Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[{
                                Icon: "fas fa-pen",
                                text: "Access thousands of thesis papers across various courses and topics",
                            }, {
                                Icon: "fas fa-lightbulb",
                                text: "Advanced search functionality with filters for course, college department, year, and research area",
                            }, {
                                Icon: "fas fa-mobile-alt",
                                text: "User-friendly interface for seamless access to research materials anytime, anywhere",
                            }, {
                                Icon: "fas fa-lock",
                                text: "Secure repository system with proper citation and intellectual property protection",
                            }].map((feature, index) => (
                                <motion.div 
                                    key={index} 
                                    className="flex flex-col items-center text-center"
                                    variants={featureVariants}
                                    whileInView="visible"
                                    viewport={{ once: false }}  // Ensures animation happens when scrolls down
                                >
                                    <motion.div 
                                        className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4"
                                        whileHover="hover"
                                        initial="default"
                                        animate="default"
                                        variants={iconVariants}
                                    >
                                        <i className={`${feature.Icon} text-3xl text-[#4A0404]`}></i>
                                    </motion.div>
                                    <p className="text-gray-600 text-sm">
                                        {feature.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* About Section */}
                <motion.section
                    className="bg-white py-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }} // Ensures animation happens when scrolls down
                    variants={fadeIn}
                >
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <motion.div 
                                className="md:w-1/2 relative"
                                initial="hidden"
                                whileInView="visible"
                                variants={imageVariants}
                                viewport={{ once: false }}  // Ensures animation happens when scrolls down
                            >
                                <div className="flex gap-4">
                                    <motion.img 
                                        src={libraryImage} 
                                        alt="Student Researcher 1" 
                                        className="w-32 h-48 rounded-[40px] object-cover"
                                        variants={imageVariants}
                                    />
                                    <div className="mt-12">
                                        <motion.img 
                                            src={libraryImage} 
                                            alt="Student Researcher 2" 
                                            className="w-48 h-64 rounded-[60px] object-cover"
                                            variants={imageVariants}
                                        />
                                    </div>
                                    <motion.img 
                                        src={libraryImage} 
                                        alt="Student Researcher 3" 
                                        className="w-32 h-48 rounded-[40px] object-cover mt-24"
                                        variants={imageVariants}
                                    />
                                </div>
                            </motion.div>
                            <div className="md:w-1/2">
                                <h3 className="text-xl font-semibold mb-2">About Our Repository</h3>
                                <h4 className="text-2xl font-bold mb-4">Empowering Research<br />and Innovation</h4>
                                <p className="text-gray-600">
                                    TUP Scholarly serves as a digital archive for all thesis papers produced at TUP Manila. 
                                    Our platform facilitates knowledge sharing, promotes academic excellence, and preserves the 
                                    intellectual output of our university community. Whether you're a student, researcher, or faculty 
                                    member, our repository provides the resources you need to advance your academic journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Footer */}
                <footer className="bg-[#4A0404] text-white py-4">
                    <motion.div 
                        className="container mx-auto px-6 flex justify-between items-center"
                        initial="hidden"
                        whileInView="visible"
                        variants={footerVariants}
                    >
                        <div className="flex items-center">
                            <span className="font-bold">TUP</span>
                            <span>Scholarly</span>
                        </div>
                        <div className="flex gap-4">
                            <motion.a 
                                href="#" 
                                className="text-white hover:text-gray-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <i className="fab fa-facebook-f"></i>
                            </motion.a>
                            <motion.a 
                                href="#" 
                                className="text-white hover:text-gray-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <i className="fab fa-instagram"></i>
                            </motion.a>
                        </div>
                    </motion.div>
                </footer>
            </main>
        </GuestLayout>
    );
}
