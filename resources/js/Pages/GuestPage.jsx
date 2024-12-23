import React from 'react';
import GuestLayout from '../Layouts/GuestLayout'; // Adjust the path as necessary
import { Head, router } from '@inertiajs/react';
import '../../../resources/css/Scrollbar.css';
import uploadedImage1 from '@/Components/uploadedImage1.jpg'; // Image placed in Components directory
import uploadedImage from '@/Components/uploadedImage.jpg'; // Image placed in Components directory
import creatorImage1 from '@/Components/creator1.png';
import creatorImage2 from '@/Components/creator2.png';
import creatorImage3 from '@/Components/creator3.png';
import creatorImage4 from '@/Components/creator4.png';
import creatorImage5 from '@/Components/creator5.png';

export default function GuestPage() {
    return (
        <GuestLayout>
            <Head title="Home" />

            <main className="bg-white">
                {/* Welcome Section */}
                <section className="py-12">
                    <div className="container mx-auto flex flex-col sm:flex-row items-center px-6 gap-8">
                        {/* Left Side - Text */}
                        <div className="sm:w-1/2 text-left">
                            <h1 className="text-4xl font-bold text-maroon-600 mb-6">
                                Welcome to TUP Scholarly
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Your Gateway to Knowledge and Discovery
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Explore a world of academic resources, curated just for you. Whether you're researching for a project, expanding your knowledge, or just browsing, our platform ensures easy access to the information you need.
                            </p>
                            <p className="text-gray-600 mt-4 leading-relaxed">
                                Discover new opportunities, expand your knowledge, and achieve academic excellence with our platform.
                            </p>
                        </div>

                        {/* Right Side - Image */}
                        <div className="sm:w-1/2">
                            <img src={uploadedImage} alt="Landing Page Design" className="rounded-lg w-full h-auto" />
                        </div>
                    </div>
                </section>

                {/* Reintroduced Section */}
                <section className="bg-gray-50 py-12">
                    <div className="container mx-auto text-center">
                        <h2 className="text-2xl font-bold text-maroon-600 mb-6">Discover, Learn, and Achieve.</h2>
                        <p className="text-gray-600 mb-8">
                            "Knowledge is the pathway to innovation, and we’re here to guide you."
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            {/* Left Side - Image */}
                            <div className="sm:w-1/2">
                                <img src={uploadedImage1} alt="Group" className="rounded-lg w-full h-auto" />
                            </div>
                            {/* Right Side - Text */}
                            <div className="sm:w-1/2 text-left">
                                <h4 className="text-lg font-bold text-maroon-600">What We Offer:</h4>
                                <ul className="list-disc text-gray-600 ml-6 mt-4">
                                    <li>A vast repository of academic materials from TUP - Manila.</li>
                                    <li>Advanced search tools for effortless information retrieval.</li>
                                    <li>User-friendly navigation and features.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-gray-100 py-12">
                    <div className="container mx-auto text-center">
                        <h3 className="text-2xl font-semibold text-maroon-600 mb-8">Features</h3>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <span role="img" aria-label="Document" className="text-4xl">📄</span>
                                <p className="mt-4 text-gray-600">Feature 1</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <span role="img" aria-label="Light Bulb" className="text-4xl">💡</span>
                                <p className="mt-4 text-gray-600">Feature 2</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <span role="img" aria-label="Graduation Cap" className="text-4xl">🎓</span>
                                <p className="mt-4 text-gray-600">Feature 3</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Circular Icons Section */}
                <section className="py-12">
                    <div className="container mx-auto text-center">
                        <h3 className="text-2xl font-semibold text-maroon-600 mb-6">Creators</h3>
                        <div className="flex justify-center items-center gap-12 flex-wrap">
                            {[
                                { image: creatorImage1, name: 'Alexandria Lee G. Brillo', title: 'Bachelor of Science in Computer Science' },
                                { image: creatorImage2, name: 'Deazelle M. Capistrano', title: 'Bachelor of Science in Computer Science' },
                                { image: creatorImage3, name: 'Raine Francesca Maximo', title: 'Bachelor of Science in Computer Science' },
                                { image: creatorImage4, name: 'Erika F. Velasquez', title: 'Bachelor of Science in Computer Science' },
                                { image: creatorImage5, name: 'Maria Lourdes T. Villaruz', title: 'Bachelor of Science in Computer Science' },
                            ].map((creator, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="rounded-full bg-gray-200 w-32 h-32 flex items-center justify-center shadow-md overflow-hidden">
                                        <img
                                            src={creator.image}
                                            alt={creator.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-gray-600 font-semibold mt-2">{creator.name}</p>
                                    <p className="text-gray-500 text-sm">{creator.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center text-sm">
                    <p>© 2024 TUP University. All Rights Reserved.</p>
                </div>
            </footer>
        </GuestLayout>
    );
}
