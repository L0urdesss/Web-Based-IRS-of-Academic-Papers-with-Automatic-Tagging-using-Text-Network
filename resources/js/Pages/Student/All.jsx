import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StudentTable from '@/Components/StudentTable';
import Toast from '@/Components/Toast';
import Sidebar from '@/Components/Sidebar';

const columns = ['Student ID', 'Email', 'Name', 'Course', 'College', 'Action']; // Updated columns

export default function All({ auth, students }) {
    const [isLoading, setIsLoading] = useState(false);
    const { delete: deletePaper } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [activeCourse, setActiveCourse] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        setIsLoading(false);
    }, [students]);

    const handleDelete = (itemId) => {
        if (confirm(`Are you sure you want to delete "${itemId}"?`)) {
            deletePaper(route('student.destroy', itemId), {
                onSuccess: () => {
                    // Check if there are any students left in the current course
                    const remainingStudents = groupedStudents[activeCourse]?.filter(
                        (student) => student.id !== itemId
                    );

                    if (remainingStudents.length === 0) {
                        closeModal(); // Close modal if no students are left
                    }
                },
            });
        }
    };

    const groupByCourse = () => {
        return students.reduce((acc, student) => {
            if (!acc[student.course]) {
                acc[student.course] = [];
            }
            acc[student.course].push(student);
            return acc;
        }, {});
    };

    const toggleCoursePanel = (course) => {
        setActiveCourse(course);
        setShowModal(true);
        setInputValue('');
        setCurrentPage(1);
    };

    const closeModal = () => {
        setShowModal(false);
        setActiveCourse(null);
    };

    const paginateStudents = (courseStudents) => {
        const indexOfLastStudent = currentPage * itemsPerPage;
        const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
        return courseStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const groupedStudents = groupByCourse();

    const totalPages = activeCourse
        ? Math.ceil(
              groupedStudents[activeCourse]?.filter((student) =>
                  student.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                  student.email.toLowerCase().includes(inputValue.toLowerCase()) ||
                  student.id.toString().toLowerCase().includes(inputValue.toLowerCase())
              ).length / itemsPerPage
          )
        : 1;

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Toast />
            <Head title="Student List" />

            <div className="flex">
                <Sidebar />
                <div className="py-12 w-full max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Students List</h1>
                        <Link
                            href={route('student.add')}
                            className="bg-[#113012] text-white px-4 py-2 rounded-lg hover:bg-[#163f17]"
                        >
                            + Add Student
                        </Link>
                    </div>
                    <div className="py-5">
                        {isLoading ? (
                            'Loading...'
                        ) : (
                            Object.keys(groupedStudents).map((course) => (
                                <div
                                    key={course}
                                    className="w-full h-full border rounded-lg shadow-none mb-5"
                                >
                                    <button
                                        className="w-full text-left py-5 px-4 bg-gray-300 rounded-md"
                                        onClick={() => toggleCoursePanel(course)}
                                    >
                                        {course}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {showModal && activeCourse && groupedStudents[activeCourse]?.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div
                        className="bg-white p-6 rounded-lg"
                        style={{ width: '1100px', minHeight: '500px', maxHeight: '500px' }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{activeCourse}</h2>
                            <input
                                type="text"
                                placeholder="Search Student"
                                className="border px-2 rounded-lg"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>

                        <div
                            className="overflow-auto"
                            style={{ height: '300px', minHeight: '300px', maxHeight: '300px' }}
                        >
                            <StudentTable
                                items={paginateStudents(
                                    groupedStudents[activeCourse]?.filter((student) =>
                                        student.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                                        student.email.toLowerCase().includes(inputValue.toLowerCase()) ||
                                        student.id.toString().toLowerCase().includes(inputValue.toLowerCase())
                                    )
                                )}
                                columns={columns}
                                primary="Student ID"
                                actionUpdate="student.edit"
                                handleDelete={handleDelete}
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-300 rounded-lg ml-2"
                            >
                                Next
                            </button>
                        </div>

                        <button
                            onClick={closeModal}
                            className="mt-4 text-white bg-red-500 px-4 py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
