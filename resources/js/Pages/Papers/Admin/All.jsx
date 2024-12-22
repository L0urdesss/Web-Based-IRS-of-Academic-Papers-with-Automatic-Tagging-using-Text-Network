import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import Toast from '@/Components/Toast';

export default function All({ auth, papers, searchQuery }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery || '');
    const { delete: deletePaper } = useForm();

    useEffect(() => {
        setIsLoading(false);
        return () => {
            setInputValue('');
        };
    }, []);

    useEffect(() => {
        setIsLoading(false);
    }, [papers]);

    const handleSearch = () => {
        setIsLoading(true);
        window.location = route('papers.index', { searchQuery: inputValue });
    };

    const handleDelete = (itemId, itemTitle) => {
        if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
            deletePaper(route('papers.destroy', itemId));
        }
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Toast />
            <Head title="All Papers" />

            <div className="flex">
                {/* Sidebar Component */}
                <Sidebar />

                {/* Main Content */}
                <div className="py-12 w-full bg-[white]">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <Link href={route('papers.add')} className="text-green-500 hover:underline">
                                    + Add Paper
                                </Link>
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Search.."
                                    className="border px-2 rounded-lg"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button
                                    onClick={handleSearch}
                                    style={{ backgroundColor: '#af2429' }}
                                    className="text-white px-4 py-2 ml-2 rounded-lg"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="overflow-hidden shadow-sm sm:rounded-lg p-4">
                            {isLoading ? (
                                "Loading..."
                            ) : (
                                <div className="grid grid-cols-3 gap-4">
                                    {papers.data.map((paper, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg"
                                        >
                                            <h3 className="text-base font-medium text-[#454545] mb-2 underline hover:underline-offset-4">
                                                {paper.title}
                                            </h3>
                                            <p className="text-xs text-[#5D5959] mb-1 font-thin">
                                                <strong>Author:</strong> {paper.author}
                                            </p>
                                            <p className="text-xs text-[#5D5959] mb-1 font-thin">
                                                <strong>Date:</strong> {paper.date_published}
                                            </p>
                                            <p className="text-xs text-[#5D5959] mb-1 font-thin">
                                                <strong>Abstract:</strong> {truncateText(paper.abstract, 20)}
                                            </p>
                                            <div className="flex justify-end mt-4">
                                                <Link
                                                    href={route('papers.edit', paper.id)}
                                                    className="text-blue-400 hover:underline mr-4"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(paper.id, paper.title)}
                                                    className="text-red-400 hover:underline"
                                                >
                                                    Delete
                                                </button>
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
                                                href={(link.url ? link.url + (link.url.includes('?') ? '&' : '?') : '') + 'searchQuery=' + encodeURIComponent(inputValue)}
                                                className={`px-4 py-2 ${
                                                    link.active
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-200 text-gray-700'
                                                } hover:bg-red-300 rounded-lg`}
                                                style={{ backgroundColor: link.active ? '#831b1c' : '' }}
                                            >
                                                {link.label === '&laquo; Previous'
                                                    ? 'Previous'
                                                    : link.label === 'Next &raquo;'
                                                    ? 'Next'
                                                    : link.label}
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
