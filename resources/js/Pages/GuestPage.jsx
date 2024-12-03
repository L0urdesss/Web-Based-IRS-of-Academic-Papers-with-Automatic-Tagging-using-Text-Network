// resources/js/Pages/Guest.jsx
import React from 'react';
import GuestLayout from '../Layouts/GuestLayout'; // Adjust the path as necessary
import { Head, router } from '@inertiajs/react';
import '../../../resources/css/Scrollbar.css';
import uploadedImage from '@/Components/uploadedImage.jpg'; // Image placed in Components directory

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget mi mauris mollis
                    iaculis sit amet eu nisl. Fusce sit amet tortor nec neque tincidunt ultricies.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                    Discover new opportunities, expand your knowledge, and achieve academic excellence
                    with our platform.
                </p>
            </div>

            {/* Right Side - Image */}
            <div className="sm:w-1/2">
                <img src={uploadedImage} alt="Landing Page Design" className="rounded-lg shadow-lg" />
            </div>
        </div>
    </section>

    {/* Reintroduced "Lorem Ipsum Dolor" Section */}
    <section className="bg-gray-50 py-12">
        <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-maroon-600 mb-6">Lorem Ipsum Dolor</h2>
            <p className="text-gray-600 mb-8">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget mi at 
                mauris mollis iaculis sit amet eu nisl. Fusce sit amet tortor nec neque 
                tincidunt ultricies."
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Left Side - Image */}
                <div className="sm:w-1/2">
                    <img src={uploadedImage} alt="Group" className="rounded-lg shadow-lg" />
                </div>
                {/* Right Side - Text */}
                <div className="sm:w-1/2 text-left">
                    <h4 className="text-lg font-bold text-maroon-600">Ut enim ad minim veniam quis nostrud</h4>
                    <ul className="list-disc text-gray-600 ml-6 mt-4">
                        <li>Ut enim ad minim veniam, quis nostrud exercitation.</li>
                        <li>Ex ea commodo consequat.</li>
                        <li>Ut enim ad minim veniam, quis nostrud exercitation.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {/* Features Section */}
    <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
            <h3 className="text-2xl font-semibold text-maroon-600 mb-8">Features</h3>
            <div className="flex justify-center gap-8">
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
            <h3 className="text-2xl font-semibold text-maroon-600 mb-6">Lorem Ipsum</h3>
            <div className="flex justify-center items-center gap-6">
                {Array(5).fill().map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="rounded-full bg-gray-200 w-20 h-20 flex items-center justify-center shadow-md">
                            <span className="text-gray-400">Icon</span>
                        </div>
                        <p className="text-gray-600 font-semibold mt-2">UT ENIM</p>
                        <p className="text-gray-500 text-sm">Minim Venium</p>
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
