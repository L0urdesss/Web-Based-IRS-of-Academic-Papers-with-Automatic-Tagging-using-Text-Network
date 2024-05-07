import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import SearchBar from '@/Components/Searchbar';
import Toggle from '@/Components/Toggle'; 

// Import the icon image
import filtersIcon from '@/Components/filters-icon.png';


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
    const [selectedCourse, setSelectedCourse] = useState(''); // State for selected course
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
    const [appliedFilters, setAppliedFilters] = useState([]); // State for applied filters

    useEffect(() => {
        setIsLoading(false);
    }, [papers]);

    const handleSearch = (searchTerm) => {
        setIsLoading(true);
        window.location = route('userpapers.view', {
            searchQuery: searchTerm
        });
    };

    const handleFilterClick = (filterType) => {
        let filterText = filterType;
        if (filterType === 'Title') {
            filterText = 'Title';
        } else if (filterType === 'Author') {
            filterText = 'Author';
        } else if (filterType === 'Abstract') {
            filterText = 'Abstract';
        }

        if (!appliedFilters.includes(filterText)) {
            setAppliedFilters([...appliedFilters, filterText]);
        }
    };

    const handleRemoveFilter = (filter) => {
        const updatedFilters = appliedFilters.filter((item) => item !== filter);
        setAppliedFilters(updatedFilters);
    };

    const handleClearFilters = () => {
        setAppliedFilters([]);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="All Papers" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:flex sm:justify-between sm:px-6 lg:px-8">
                    <div className="sm:w-1/5 bg-none border-white mr-5 mt-20">
                        <div className="bg-white p-5" style={{ border: '2px solid #F0F0F0' }}>
                            <div className="mb-4 flex justify-between items-center">
                                <p className="font-semibold" style={{ fontSize: '16px', color: '#352D2D' }}>
                                    <img src={filtersIcon} alt="Filters Icon" className="inline-block w-6 h-6 mr-1 mb-1" />
                                    Filters
                                </p>
                            </div>
                            <hr style={{ border: 'none', borderBottom: '2px solid #F0F0F0', margin: '1rem 0' }} />
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold" style={{ fontSize: '12px', color: '#352D2D' }}>Applied Filters</p>
                                    {appliedFilters.length > 0 && (
                                        <button onClick={handleClearFilters} className="text-blue-500 underline" style={{ fontSize: '11px', color: '#352D2D' }}>
                                            Clear All
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center flex-wrap mb-2">
                                    {appliedFilters.map((filter, index) => (
                                        <button key={index} onClick={() => handleRemoveFilter(filter)} className="text-white rounded-md px-4 py-2 mr-2 mb-2" style={{ fontSize: '11px', backgroundColor: '#CC0000' }}>
                                            {filter} <span className="ml-1">X</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                            <select id="course" className="form-select mt-1 block w-full border border-gray-300  py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} style={{ fontSize: '10px', borderColor: '#7B7B7B', width: '150px' }}>
    <option value="" disabled>Select Course</option>
    <option value="BSCS">BSCS</option>
    <option value="BSIS">BSIS</option>
    <option value="BSES">BSES</option>
    <option value="BASLT">BASLT</option>
    <option value="BSIT">BSIT</option>
</select>

                            </div>
                            <div className="mb-4">
                                <select id="sort" className="form-select mt-1 block w-full border border-gray-300  py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ fontSize: '10px', borderColor: '#7B7B7B', width: '150px' }}>
                                    <option value="asc">Sort Ascending</option>
                                    <option value="desc">Sort Descending</option>
                                </select>
                            </div>
                            <hr style={{ border: 'none', borderBottom: '1px solid #F0F0F0', margin: '1rem 0' }} />
                            <div className="mt-4 flex flex-col">
                                <p className="font-semibold mb-2" style={{ fontSize: '12px', color: '#352D2D' }}>Filter Types</p>
                                <div className="flex flex-wrap">
                                    <button onClick={() => handleFilterClick('Title')} className="text-blue-500 border border-gray-500 rounded-md px-4 py-2 mr-2 mb-2 " style={{ fontSize: '11px', color: '#352D2D' }}>Title</button>
                                    <button onClick={() => handleFilterClick('Author')} className="text-blue-500 border border-gray-500 rounded-md px-4 py-2 mb-2 " style={{ fontSize: '11px', color: '#352D2D' }}>Author</button>
                                    <button onClick={() => handleFilterClick('Abstract')} className="text-blue-500 border border-gray-500 rounded-md px-4 py-2 w-1/2 mb-5" style={{ fontSize: '11px', color: '#352D2D' }}>Abstract</button>
                                </div>
                            </div>
                            <hr style={{ border: 'none', borderBottom: '1px solid #F0F0F0', margin: '1rem 0' }} />
                            <Toggle />
                            <hr style={{ border: 'none', borderBottom: '1px solid #F0F0F0', margin: '1rem 0' }} />
                            <div className="mt-4">
                                <p className="font-semibold" style={{ fontSize: '12px', color: '#352D2D' }}>Publication Date</p>
                                <ul className="list-none">
                                    <li>
                                        <button className="text-blue-500 hover:underline" style={{ fontSize: '11px', color: '#AF2429' }}>Last 12 Months</button>
                                    </li>
                                    <li>
                                        <button className="text-blue-500 hover:underline" style={{ fontSize: '11px', color: '#AF2429' }}>Last 2 Years</button>
                                    </li>
                                    <li>
                                        <button className="text-blue-500 hover:underline" style={{ fontSize: '11px', color: '#AF2429' }}>Last 5 Years</button>
                                    </li>
                                    <li>
                                        <button className="text-blue-500 hover:underline" style={{ fontSize: '11px', color: '#AF2429' }}>Custom Date</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-3/4">
                        <div className="mb-1">
                            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
                        </div>
                        {isLoading ? "Loading..." : (
                            <div>
                                {papers.data.map((paper, index) => (
                                    <div key={index} className="bg-white p-10 border-b border-gray-200 mb-5 mt-10" style={{ border: '2px solid #F0F0F0' }}>
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
                                            {truncateText(paper.abstract, 60)}
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
