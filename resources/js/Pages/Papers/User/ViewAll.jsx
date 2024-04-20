import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Table from '@/Components/Table';
import SearchBar from '@/Components/Searchbar';

const columns = ['title', 'author', 'date_published']; // Remove 'status' from columns array

export default function ViewAll({ auth, papers, searchQuery }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery || '');
    const [sortBy, setSortBy] = useState('relevance'); // State for sorting

    useEffect(() => {
        setIsLoading(false);
    }, [papers]);

    const handleSearch = (searchTerm, filters) => {
        setIsLoading(true);
        window.location = route('userpapers.view', {
            searchQuery: searchTerm,
            filters: filters
        });
    };

    // Function to handle sorting
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        // Perform sorting logic here and update papers accordingly
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="All Papers" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8"> {/* Removed flex container */}
                    <div> {/* Papers table */}
                        <div className="mb-4">
                            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            {isLoading ? "Loading..." : (
                                <div>
                                    {papers.data.map((paper, index) => (
                                        <div key={index} className="p-10 border-b border-gray-200">
                                            <div className="mb-2">
                                                <Link
                                                    href={route('userpapers.preview', { paper: paper.id })}
                                                    className="font-bold text-blue-500 hover:underline"
                                                    style={{ textDecoration: 'underline', color: '#AF2429', fontWeight: 'bold', fontSize: '20px' }}
                                                >
                                                    {paper.title}
                                                </Link>
                                            </div>
                                            <div className="mb-2" style={{ fontSize: '10px', color: '#352D2D' }}>
                                                {paper.date_published} &bull; <span style={{ fontSize: '10px', color: '#352D2D' }}>{paper.author}</span>
                                            </div>
                                            <div className="mb-2" style={{ fontSize: '13px', color: '#352D2D', textAlign: 'justify' }}>
                                                {paper.abstract}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            {papers.links && (
                                <ul className="flex justify-center">
                                    {papers.links.map((link, index) => (
                                        <li key={index} className="mx-2">
                                            <Link
                                                href={(link.url ? link.url + (link.url.includes('?') ? '&' : '') : '') + 'searchQuery=' + encodeURIComponent(inputValue)}
                                                className={`px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-300 rounded-lg`}
                                                style={{ backgroundColor: link.active ? '#831b1c' : '' }}
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
            </div>
        </AuthenticatedLayout>
    );
}
