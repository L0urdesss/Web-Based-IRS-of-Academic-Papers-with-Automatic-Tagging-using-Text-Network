import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RequestTableAdmin from '@/Components/RequestTableAdmin';
import RequestForm from '@/Components/RequestForm';
import { router } from '@inertiajs/react';
import RequestFilter from '@/Components/RequestFilter'; // Import the RequestFilter component
import Toast from '@/Components/Toast';

const columns = ['Paper ID', 'Student Email', 'Paper Title', 'Status', 'Action'];

export default function AdminView({ auth, requestpapers , status}) {
    const [isLoading, setIsLoading] = useState(false);
    const { delete: deletePaper } = useForm();
    const [showForm, setShowForm] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [filterOption, setFilterOption] = useState(status || 'all'); // Set filterOption based on 'status' prop

    useEffect(() => {
        setIsLoading(false);
        setSuccessMessage(null);
    }, [requestpapers]);

    console.log(requestpapers)
    const handleDelete = (itemId, itemTitle) => {
        if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
            // deletePaper(route('papers.destroy', itemId));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleActionUpdate = (rowData) => {
        setRowData(rowData);
        setShowForm(true);
    };

    const handleFilterChange = (option) => {
        setIsLoading(true); // Start loading state
        setFilterOption(option);
        setIsLoading(true); // Start loading state
        window.location = route('userrequest.index', { status: option }); 
    };

    const handleSubmit = (action) => {
        router.put('/request-papers-all', {
            id: rowData.id,
            action: action,
        });
        setShowForm(false);
        setIsLoading(true);

        if (action === 'approve') {
            setSuccessMessage('Approve Successfully');
        } else {
            setSuccessMessage('Reject Successfully');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Request Papers</h2>}
        >
            <Toast/>
            <Head title="All Request Papers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex">
                    
                    {/* Filter dropdown container */}
                    <div className="w-1/5 ml-auto">
                        <RequestFilter filterOption={filterOption} handleFilterChange={handleFilterChange} />
                    </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isLoading ? (
                            "Loading..."
                        ) : (
                            <RequestTableAdmin
                                items={requestpapers.data}
                                columns={columns}
                                primary="Request ID"
                                actionUpdate={handleActionUpdate}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                    <div className="mt-4">
                        {requestpapers.links && (
                            <ul className="flex justify-center">
                                {requestpapers.links.map((link, index) => (
                                    <li key={index} className="mx-2">
                                        <Link
                                            href={(link.url ? link.url + (link.url.includes('?') ? '&' : '?') : '') + 'status=' + encodeURIComponent(filterOption)}
                                            className={`px-4 py-2 ${
                                                link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
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
            {showForm && (
                <RequestForm
                    user={auth.user}
                    data={rowData}
                    handleCloseForm={handleCloseForm}
                    submit={handleSubmit}
                    title={rowData.paper.title}
                />
            )}
        </AuthenticatedLayout>
    );
}
