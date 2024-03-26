import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import { Head, Link ,useForm} from '@inertiajs/react';
import Table from '@/Components/Table';

const columns = ['title', 'author', 'date_published'];

export default function ViewAll ({auth ,papers, searchQuery}) {
const [isLoading, setIsLoading] = useState(false);
const [inputValue, setInputValue] = useState(searchQuery || ''); // Initialize input value with searchQuery

useEffect(() => {
    setIsLoading(false); // Reset loading state when component re-renders
}, [papers]); // Reset loading state when papers data changes

const handleSearch = () => {
    setIsLoading(true); // Start loading state
    // Redirect to the current route with the search query as a parameter
    window.location = route('papers.index', { searchQuery: inputValue });
};
    return (
        
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All dPapers</h2>}
        >
            <Head title="All Papers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search.."
                            className="border px2 rounded-lg"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg">Search</button>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isLoading ? "Loading..." : (
                        <Table items={papers.data} columns={columns} primary="Paper Number" actionUpdate="papers.edit" />
                        )}
                    </div>
                    <div className="mt-4">
                        {papers.links && (
                            <ul className="flex justify-center">
                                {papers.links.map((link, index) => (
                                    <li key={index} className="mx-2">
                                        <Link 
                                            href={(link.url ? link.url + (link.url.includes('?') ? '&' : '?') : '') + 'searchQuery=' + encodeURIComponent(inputValue)}
                                            className={`px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 rounded-lg`}
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