import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SearchBar from '@/Components/Searchbar';

const columns = ['title', 'author', 'date_published']; // Remove 'status' from columns array

// Function to truncate text to a specified number of words
const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length <= maxWords) {
        return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
};

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
        <AuthenticatedLayout user={auth.user}>
            <Head title="All Papers" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:flex sm:justify-between sm:px-6 lg:px-8">
                    <div className="sm:w-3/4 mb-8 sm:mr-4">
                        <div className="mb-1">
                            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
                        </div>
                        {isLoading ? "Loading..." : (
                            <div>
                                {papers.data.map((paper, index) => (
                                    <div key={index} className="bg-white p-10 border-b border-gray-200 sm:rounded-lg mb-5 mt-10"> {/* Added mb-20 for space */}
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
                                            {truncateText(paper.abstract, 60)} {/* Truncate abstract to 250 words */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                    <div className="sm:w-3/10 bg-none border-white mt-20 ml-5 ">
    <div className="bg-white border-white p-10">
        <div className="mb-4">
            <h2 className="text-lg mb-2">
            <span style={{ color: '#757575', fontSize:'20px' }}>Sorted By</span>
            </h2>
            <div className="mb-2">
                <span style={{ color: '#757575', fontSize:'14px' }}>Course</span>
            </div>
            <select className="border rounded p-1 w-full" style={{ borderColor: '#7B7B7B' }}>
                <option value="">Select</option>
                <option value="bscs">BSCS</option>
                <option value="bsit">BSIT</option>
                <option value="bsis">BSIS</option>
                <option value="baslt">BASLT</option>
                <option value="bses">BSES</option>
            </select>
        </div>
        <div className="mb-4">
            <h2 className="text-lg mb-2">
                <span style={{ color: '#757575', fontSize:'14px' }}>Title</span>
            </h2>
            <select className="border  rounded p-1 w-full" style={{ borderColor: '#7B7B7B' }}>
                <option value="">Select</option>
                <option value="az">Ascending</option>
                <option value="za">Descending</option>
            </select>
        </div>
        <div className="mb-4">
            <h2 className="text-lg mb-2">
                <span style={{ color: '#757575', fontSize:'14px' }}>Author</span>
            </h2>
            <select className="border rounded p-1 w-full" style={{ borderColor: '#7B7B7B' }}>
                <option value="">Select</option>
                <option value="az">Ascending</option>
                <option value="za">Descending</option>
            </select>
        </div>
        <div className="mb-4">
            <h2 className="text-lg  mb-2">
                <span style={{ color: '#757575', fontSize:'14px' }}>Abstract</span>
            </h2>
            <div className="mb-2 flex items-center">
                <input type="checkbox" id="searchWithinAbstracts" name="searchWithinAbstracts" className="mr-2" />
                <label htmlFor="searchWithinAbstracts">Search within abstracts</label>
            </div>
        </div>
        <div className="mb-4">
            <h2 className="text-lg  mb-2">
                <span style={{ color: '#757575', fontSize:'14px' }}>File</span>
            </h2>
            <div className="mb-2 flex items-center">
                <input type="checkbox" id="withFile" name="withFile" className="mr-2" />
                <label htmlFor="withFile">With file</label>
            </div>
            <div className="mb-2 flex items-center">
                <input type="checkbox" id="withoutFile" name="withoutFile" className="mr-2" />
                <label htmlFor="withoutFile">Without file</label>
            </div>
        </div>
        <div>
            <h2 className="text-lg mb-2 ">
                <span style={{ color: '#757575', fontSize:'14px' }}>Publication Date</span>
            </h2>
            <div>
            <ul>
    <li className="cursor-pointer mb-2" style={{ color: '#AF2429', textDecoration: 'none' }}>2024</li>
    <li className="cursor-pointer mb-2" style={{ color: '#AF2429', textDecoration: 'none' }}>2023</li>
    <li className="cursor-pointer mb-2" style={{ color: '#AF2429', textDecoration: 'none' }}>2022</li>
    <li className="cursor-pointer mb-2" style={{ color: '#AF2429', textDecoration: 'none' }}>2021</li>
    <li className="cursor-pointer mb-2" style={{ color: '#AF2429', textDecoration: 'none' }}>2020</li>
</ul>

            </div>
        </div>
    </div>
</div>

                    {/* End of Sort container */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
