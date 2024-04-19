import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Table from '@/Components/Table';
import SearchBar from '@/Components/Searchbar';

const columns = ['title', 'author', 'date_published', 'status']; // Add 'status' to columns array

export default function ViewAll({ auth, papers, searchQuery }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery || '');

    useEffect(() => {
        setIsLoading(false);
    }, [papers]);


    const handleSearch = (searchTerm, filters) => {
        setIsLoading(true);
        window.location = route('userpapers.view', {
            searchQuery: searchTerm ,
            filters: filters
        });
      };

    // Function to generate random status
    const getRandomStatus = () => {
        const statuses = ['pending', 'approved', 'rejected'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    // Render papers with randomly assigned status and appropriate class names
    const papersWithStatus = papers.data.map(paper => ({
        ...paper,
        status: getRandomStatus(),
    }));

    // Function to get class name based on status
    const getStatusClassName = (status) => {
        return 'bg-gray-500 text-white'; // Default color
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request Research Papers</h2>}
        >
            <Head title="All Papers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col"> {/* Wrap search bar and table in a flex column container */}
                        <div className="mb-4"> {/* Add margin bottom to create space */}
                            <SearchBar onSearch={handleSearch} />

                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            {isLoading ? "Loading..." : (
                                <Table items={papersWithStatus} columns={columns} primary="Paper Number" actionUpdate="papers.edit" />
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
        </AuthenticatedLayout>
    );
}
