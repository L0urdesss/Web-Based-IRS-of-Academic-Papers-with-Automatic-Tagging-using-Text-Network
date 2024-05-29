import { useState, useEffect } from 'react';
import { Head, Link ,useForm} from '@inertiajs/react';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RequestFilter from '@/Components/RequestFilter'; // Import the RequestFilter component

const columns = ['Paper ID', 'Paper Title','Purpose','Status'];

export default function View({ auth, requestpapers }) {
    const [isLoading, setIsLoading] = useState(false);
    const {delete: deletePaper} = useForm();
    const [filterOption, setFilterOption] = useState('all'); // State for filter option

    useEffect(() => {
        setIsLoading(false); // Reset loading state when component re-renders
    }, [requestpapers]); // Reset loading state when requestpapers data changes

    const handleDelete = (itemId, itemTitle) => {
        if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
            // deletePaper(route('papers.destroy', itemId));
        }
    };

    // Function to handle filter change
    const handleFilterChange = (option) => {
        setFilterOption(option);
    };

    // Filter data based on the selected option
    const filteredData = requestpapers.data.filter((item) => {
        if (filterOption === 'all') {
            return true; // Show all items
        } else {
            return item.status === filterOption; // Filter by status
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Request Papers</h2>}
        >
            <Head title="User Request Papers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filter dropdown */}
                    <RequestFilter filterOption={filterOption} handleFilterChange={handleFilterChange} />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isLoading ? "Loading..." : (
                           <Table items={filteredData} columns={columns} primary="Request ID" actionUpdate="userpapers.preview" handleDelete={handleDelete} />
                        )}
                    </div>
                    <div className="mt-4">
                        {requestpapers.links && (
                            <ul className="flex justify-center">
                                {requestpapers.links.map((link, index) => (
                                    <li key={index} className="mx-2">
                                        <Link 
                                            href={(link.url ? link.url + (link.url.includes('?') ? '&' : '?') : '') + 'user_id=' + encodeURIComponent(auth.user.id)}
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
