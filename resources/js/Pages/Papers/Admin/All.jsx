import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Admin from '../../../Components/Admin';

const columns = ['title', 'author', 'date_published'];

export default function All({ auth, papers, searchQuery }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery || ''); // Initialize input value with searchQuery
    const { delete: deletePaper } = useForm();

    useEffect(() => {
        setIsLoading(false); // Reset loading state when component re-renders
        return () => {
            setInputValue(''); // Clear input value on component unmount
        };
    }, []); // Run the cleanup function only on component unmount

    useEffect(() => {
        setIsLoading(false); // Reset loading state when papers data changes
    }, [papers]); 

    const handleSearch = () => {
        setIsLoading(true); // Start loading state
        // Redirect to the current route with the search query as a parameter
        window.location = route('papers.index', { searchQuery: inputValue });
    };

    const handleDelete = (itemId, itemTitle) => {
        if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
            deletePaper(route('papers.destroy', itemId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Papers</h2>}
        >
            <Head title="All Papers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <Link href={route('papers.add')} className="text-green-500 hover:underline"> + Add Paper</Link>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search.."
                                className="border px2 rounded-lg"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button onClick={handleSearch} style={{ backgroundColor: '#af2429' }} className="text-white px-4 py-2 ml-2 rounded-lg">Search</button>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isLoading ? "Loading..." : (
                            <Admin items={papers.data} columns={columns} primary="Paper Number" actionUpdate="papers.edit" handleDelete={handleDelete} />
                        )}
                    </div>
                    <div className="mt-4">
                        {papers.links && (
                            <ul className="flex justify-center">
                                {papers.links.map((link, index) => (
                                    <li key={index} className="mx-2">
                                        <Link
                                            href={(link.url ? link.url + (link.url.includes('?') ? '&' : '?') : '') + 'searchQuery=' + encodeURIComponent(inputValue)}
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
        </AuthenticatedLayout>
    );
}
