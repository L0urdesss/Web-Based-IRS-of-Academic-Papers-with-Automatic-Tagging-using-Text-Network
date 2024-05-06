import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RequestTableAdmin from '@/Components/RequestTableAdmin';
import RequestForm from '@/Components/RequestForm';
import { router } from '@inertiajs/react';

const columns = ['Paper ID', 'Student Email', 'Paper Title', 'Status', 'Action'];

export default function AdminView({ auth, requestpapers }) {
    const [isLoading, setIsLoading] = useState(false);
    const { delete: deletePaper } = useForm();
    const [showForm, setShowForm] = useState(false);
    const [rowData, setRowData] = useState(null); // State to hold data of clicked row
    const [successMessage, setSuccessMessage] = useState(null); // State to hold success message

    useEffect(() => {
        setIsLoading(false); // Reset loading state when component re-renders
    }, [requestpapers]); // Reset loading state when requestpapers data changes

    const handleDelete = (itemId, itemTitle) => {
        if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
            // deletePaper(route('papers.destroy', itemId));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleActionUpdate = (rowData) => {
        setRowData(rowData); // Set the clicked row data
        setShowForm(true); // Show the form
        console.log(rowData);
    };

    const handleSubmit = (action) => {
        if (action === 'approve') {
            setSuccessMessage('Approve Successfully');
        } else {
            setSuccessMessage('Reject Successfully');
        }
        console.log(rowData);
        router.put('/request-papers-all', {
            id: rowData.id,
            action: action,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Request Papers</h2>}
        >
            <Head title="All Request Papers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {successMessage && (
    <div className="rounded-md p-4 mb-1 text-white" style={{backgroundColor: successMessage === 'Approve Successfully' ? '#3C6441' : '#831B1C'}}>
        {successMessage}
    </div>
)}
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
                                            href={(link.url ? link.url + (link.url.includes('?') ? '&' : '?') : '')}
                                            className={`px-4 py-2 ${
                                                link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                            } hover:bg-blue-400 rounded-lg`}
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
                    title="Your Form Title"
                    submit={handleSubmit} // Pass the submit function as a prop
                />
            )}
        </AuthenticatedLayout>
    );
}
