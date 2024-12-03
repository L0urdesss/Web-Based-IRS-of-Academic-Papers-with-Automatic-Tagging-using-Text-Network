import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

// Import the logo image
import logo from '@/Components/logo2.png';

export default function Guest({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Left side */}
                    <div className="flex items-center">
                        {/* Make the logo clickable */}
                        <Link href="/guest">
                            <img src={logo} alt="Logo" className="block h-10 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-8">
                        <NavLink
                            href={route('guest')}
                            active={route().current('guest')}
                            className="hover:text-[#4F0404]"
                            style={{ color: '#454545' }}
                        >
                            Home
                        </NavLink>
                        <NavLink href={route('login')} style={{ color: '#454545' }}>
                            Log in
                        </NavLink>
                        <NavLink href={route('register')} style={{ color: '#454545' }}>
                            Register
                        </NavLink>
                    </div>

                    {/* Responsive menu button */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <main>{children}</main>
        </div>
    );
}
