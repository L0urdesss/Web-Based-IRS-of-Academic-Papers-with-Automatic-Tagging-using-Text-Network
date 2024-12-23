import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

// Import the logo image
import logo from '@/Components/logo.png';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const userRole = user?.role || 'guest';
    const userName = user?.student?.name || 'Guest';
    const userEmail = user?.email || '';

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100" style={{ backgroundColor: '#800020' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                {/* Logo with link to dashboard */}
                                <Link href="/dashboard">
                                    <img src={logo} alt="Logo" className="block h-7 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} style={{ color: '#ffffff' }}>
                                    Home
                                </NavLink>
                                <NavLink href={route('userpapers.view')} active={route().current('userpapers*')} style={{ color: '#ffffff' }}>
                                    Search
                                </NavLink>
                                {userRole === 'admin' && (
                                    <NavLink href={route('admindashboard')} active={route().current('admindashboard')} style={{ color: '#ffffff' }}>
                                        Admin Panel
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="flex items-center space-x-8">
                            <div className="ms-3 relative" style={{ display: 'flex', alignItems: 'center' }}>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                style={{ color: '#ffffff', backgroundColor: '#800020' }}
                                            >
                                                {userName} {/* Display user's name */}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Hamburger Menu */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prevState) => !prevState)}
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

                {/* Mobile Navigation Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1 ">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('userpapers.view')} active={route().current('userpapers*')}>
                            Search
                        </ResponsiveNavLink>
                        {userRole === 'admin' && (
                            <ResponsiveNavLink href={route('admindashboard')} active={route().current('admindashboard')}>
                                Admin Panel
                            </ResponsiveNavLink>
                        )}
                    </div>

                    {/* Mobile User Info */}
                    <div className="pt-4 pb-1 border-t border-gray-200" style={{ color: '#ffffff', backgroundColor: '#af2429' }}>
                        <div className="px-4">
                            <div className="font-medium text-base">{userName}</div>
                            <div className="font-medium text-sm">{userEmail}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} style={{ color: '#af2429' }}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" style={{ color: '#af2429' }}>
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
