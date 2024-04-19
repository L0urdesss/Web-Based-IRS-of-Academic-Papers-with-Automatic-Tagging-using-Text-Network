import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Table from '@/Components/Table';
import SearchBar from '@/Components/Searchbar';
import '@/Pages/animation.css'; // Import CSS file for animations

const columns = ['title', 'author', 'date_published']; // Remove 'status' from columns array

export default function ViewAll({ auth, papers, searchQuery }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery || '');
    const [showFilters, setShowFilters] = useState(true); // State to manage the visibility of the filter drawer


    useEffect(() => {
        setIsLoading(false);
    }, [papers]);

    // Effect to run when showFilters state changes
    useEffect(() => {
        if (showFilters) {
            // Add any code you want to execute when the drawer is shown
            console.log("Drawer is shown");
        } else {
            // Add any code you want to execute when the drawer is hidden
            console.log("Drawer is hidden");
        }
    }, [showFilters]);

    const handleSearch = (searchTerm, filters) => {
        setIsLoading(true);
        window.location = route('userpapers.view', {
            searchQuery: searchTerm,
            filters: filters
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Research Papers</h2>}
        >
            <Head title="All Papers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col"> {/* Wrap search bar and table in a flex column container */}
                        <div className="mb-4"> {/* Add margin bottom to create space */}
                            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
                        </div>
                        {/* Render filter button below the search bar */}
                        <div className="mb-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)} // Toggle visibility of the filter drawer
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                {showFilters ? 'Show Filters' : 'Hide Filters'}
                            </button>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            {isLoading ? "Loading..." : (
                                <div>
                                    {papers.data.map((paper, index) => (
                                        <div key={index} className="p-4 border-b border-gray-200">
                                            <div className="mb-2">
                                                <Link
                                                    href={route('papers.edit', { paper: paper.id })}
                                                    className="font-bold text-blue-500 hover:underline"
                                                >
                                                    {paper.title}
                                                </Link>
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-bold">AUTHOR:</span> {paper.author}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-bold">DATE PUBLISHED:</span> {paper.date_published}
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-bold">ABSTRACT:</span> {paper.abstract}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        {papers.links && (
                            <ul className="flex justify-center">
                                {papers.links.map((link, index) => (
                                    <li key={index} className="mx-2">
                                        <Link
                                            href={(link.url ? link.url + (link.url.includes('?') ? '&' : '') : '') + 'searchQuery=' + encodeURIComponent(inputValue)}
                                            className={`px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-300 rounded-lg`}
                                            style={{ backgroundColor: link.active ? '#831b1c' : '' }} // Add inline style to change background color
                                        >
                                            {link.label === '&laquo; Previous' ? 'Previous' : link.label === 'Next &raquo;' ? 'Next' : link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            {/* Render filter drawer with sliding animation */}
            <div className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg ${showFilters ? 'filter-drawer-enter' : 'filter-drawer-exit'}`}>
                {/* Add filter components here */}
                <p>Filters</p>
            </div>
        </AuthenticatedLayout>
    );
}
