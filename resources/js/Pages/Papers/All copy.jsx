import { useState, useRef, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const columns = ['title', 'author', 'date_published'];

export default function All({ auth, papers }) {
    const { delete: deletePaper, get: getPaper} = useForm();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading,setisLoarding] = useState(false);

    const handleDelete = (itemId, itemTitle) => {
        if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
            deletePaper(route('papers.destroy', itemId));
        }
    };

    const handleSearch = () => {
        getData();
    };

    const getData = () => {
        setisLoarding(true);
        getPaper(
            route('paper.index'),
            {
                searchQuery
            },
            {
                preserveScroll : true,
                preserveState: true,
                onFinish: () => setisLoarding(false),
            }
        );
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
                        <Link href={route('papers.add')} className="text-green-500 hover:underline">Add Paper</Link>
                        <div className="flex">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search.."
                                    className="border px2 rounded-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isLoading ? "Loading..." : (
                        <Table items={papers.data} columns={columns} primary="Paper Number" actionUpdate="papers.edit" handleDelete={handleDelete} />
                        )}
                    </div>
                    <div className="mt-4">
                        {papers.links && (
                            <ul className="flex justify-center">
                                {papers.links.map((link, index) => (
                                    <li key={index} className="mx-2">
                                        <Link href={link.url} className={`px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 rounded-lg`}>
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
