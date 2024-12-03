import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RequestTableAdmin from '@/Components/RequestTableAdmin';
import RequestForm from '@/Components/RequestForm';
import { router } from '@inertiajs/react';
import RequestFilter from '@/Components/RequestFilter'; // Import the RequestFilter component
import StudentTable from '@/Components/StudentTable';
import Toast from '@/Components/Toast';

const columns = [ 'Email', 'Name', 'Course', 'College', 'Action'];

export default function All({ auth, students, searchQuery }) {
    const [isLoading, setIsLoading] = useState(false);
    const { delete: deletePaper } = useForm();
    const [showForm, setShowForm] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [inputValue, setInputValue] = useState(searchQuery || ''); // Initialize input value with searchQuery

    const [successMessage, setSuccessMessage] = useState(null);
    useEffect(() => {
        setIsLoading(false);
        setSuccessMessage(null);
    }, [students]);

    const handleDelete = (itemId) => {
        if (confirm(`Are you sure you want to delete "${itemId}"?`)) {
             deletePaper(route('student.destroy', itemId));
        }
    };


     const handleSearch = () => {
        setIsLoading(true);
        
        const url = route('student.view');
        const data = {
            searchQuery: inputValue,
        };

        router.get(url, data, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student List</h2>}
        >
            <Toast/>
            <Head title="Student List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex">
                    {/* Message container */}
                    <div className="w-full">
                        {successMessage && (
                        <div className="rounded-md p-4 mb-1 text-white h-15" style={{ backgroundColor: successMessage === 'Approve Successfully' ? '#3C6441' : '#831B1C' }}>
                            {"Student ID #" + rowData.id + " " + successMessage}
                        </div>
                        )}
                    </div>
                    
                    {/* Filter dropdown container */}
                    {/* <div className="w-1/5">
                        <RequestFilter filterOption={filterOption} handleFilterChange={handleFilterChange} />
                    </div> */}
                    </div>
                    <div className="flex justify-between">
                        <Link href={route('student.add')} className="text-green-500 hover:underline"> + Add Student</Link>
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
                        {isLoading ? (
                            "Loading..."
                        ) : (
                            <StudentTable
                                items={students.data}
                                columns={columns}
                                primary="Student ID"
                                actionUpdate="student.edit"
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                    <div className="mt-4">
                        {students.links && (
                            <ul className="flex justify-center">
                                {students.links.map((link, index) => (
                                    <li key={index} className="mx-2">
                                        <Link
                                            href={(link.url ? link.url + (link.url.includes('?') ? '&' : '?') : '') +
                                            'searchQuery=' + (inputValue ? encodeURIComponent(inputValue) : '') 

                                            }
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
                    title="Your Form Title"
                    submit={handleSubmit}
                />
            )}
        </AuthenticatedLayout>
    );
}
