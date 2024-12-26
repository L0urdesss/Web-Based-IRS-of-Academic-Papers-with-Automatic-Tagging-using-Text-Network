import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StudentTable from "@/Components/StudentTable";
import Toast from "@/Components/Toast";
import Sidebar from "@/Components/Sidebar";

const columns = ["Student ID", "Email", "Name", "Course", "College", "Action"];

export default function All({ auth, students }) {
  const [isLoading, setIsLoading] = useState(false);
  const { delete: deletePaper } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [visibleStudents, setVisibleStudents] = useState([]);

  useEffect(() => {
    if (activeCourse && groupedStudents[activeCourse]) {
      const studentsToShow = groupedStudents[activeCourse].slice(
        0,
        currentPage * itemsPerPage
      );
      setVisibleStudents(studentsToShow);
    }
  }, [currentPage, activeCourse]);

  useEffect(() => {
    setIsLoading(false);
  }, [students]);

  const handleDelete = (itemId) => {
    if (confirm(`Are you sure you want to delete "${itemId}"?`)) {
      deletePaper(route("student.destroy", itemId), {
        onSuccess: () => {
          const remainingStudents = groupedStudents[activeCourse]?.filter(
            (student) => student.id !== itemId
          );

          if (remainingStudents.length === 0) {
            closeModal();
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
    setInputValue("");
    setCurrentPage(1);
    setVisibleStudents(groupedStudents[course]?.slice(0, itemsPerPage) || []);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveCourse(null);
    setVisibleStudents([]);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      if (currentPage * itemsPerPage < groupedStudents[activeCourse]?.length) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const groupedStudents = groupByCourse();

  return (
    <AuthenticatedLayout user={auth.user} header={null}>
      <Toast />
      <Head title="Student List" />

      <div className="flex h-screen">
        <Sidebar />
        <div className="py-12 w-full max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-700">Students List</h1>
            <Link
              href={route("student.add")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              + Add Student
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              Object.keys(groupedStudents).map((course) => (
                <div
                  key={course}
                  className="border border-gray-300 rounded-lg shadow-md p-6 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => toggleCoursePanel(course)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course}
                  </h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showModal && activeCourse && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl overflow-hidden"
            style={{ minHeight: "500px", maxHeight: "500px" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-700">
                {activeCourse}
              </h2>
              <input
                type="text"
                placeholder="Search Student"
                className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div
              className="overflow-auto border border-gray-300 rounded-lg"
              style={{
                height: "300px",
                minHeight: "300px",
                maxHeight: "300px",
              }}
              onScroll={handleScroll}
            >
              <StudentTable
                items={visibleStudents.filter(
                  (student) =>
                    student.name
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    student.email
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    student.id
                      .toString()
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                )}
                columns={columns}
                primary="Student ID"
                actionUpdate="student.edit"
                handleDelete={handleDelete}
              />
            </div>

            <button
              onClick={closeModal}
              className="mt-4 text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
