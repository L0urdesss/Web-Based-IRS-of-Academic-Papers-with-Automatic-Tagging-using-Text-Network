import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import { Head, Link } from "@inertiajs/react"; // Import Link from Inertia

export default function Add({ auth, users }) {
  const filteredUsers = users.filter((user) => user.role === "user");
  const [updatedUsers, setUpdatedUsers] = useState(filteredUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [searchInput, setSearchInput] = useState(""); // State for search input

  const handleRoleChange = (userId, newRole) => {
    setUpdatedUsers((prevUsers) =>
      prevUsers
        .map((user) => (user.id === userId ? { ...user, role: newRole } : user))
        .filter((user) => user.role !== "assistant-admin")
    );
    handleSubmit(userId, newRole);
  };

  const handleSubmit = (userId, newRole) => {
    const data = {
      tup_id: userId, // This should be 'id' as per the backend validation
      role: newRole,
    };

    // Use PATCH request to update the user role
    axios
      .patch(route("assistant-admins.update", userId), data)
      .then((response) => {
        console.log("Role updated successfully:", response);
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });
  };

  const filteredUsersList = updatedUsers.filter(
    (user) =>
      user.tup_id.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.id.toString().toLowerCase().includes(searchInput.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsersList.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredUsersList.length / usersPerPage);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Add Assistant Admin" />
      <div className="flex h-screen">
        <Sidebar user={auth.user} className="hidden md:block" />
        <div className="flex-1 p-6 bg-white shadow sm:rounded-lg relative">
          {/* Back Button and Search Bar Panel */}
          <div className="px-10 mb-6 flex justify-between items-center gap-4 animate-[fade-in_0.8s_ease-in-out]">
            {/* Back Button */}
            <Link href="/assistant-admins">
              <button className="bg-gray-200 text-black px-10 py-2 rounded-3xl shadow-md hover:bg-gray-300 transition-transform transform hover:scale-105">
                Back
              </button>
            </Link>

            {/* Search Bar */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search by TUP ID, Email, or ID"
                className="border border-gray-300 px-4 py-2 rounded-full w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                onClick={() => setCurrentPage(1)}
                className="bg-[#800020] text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-800 transition-transform transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-2 flex justify-center w-full mb-10">
            <div className="w-11/12">
              <table className="table-auto w-full border-collapse border border-gray-200 bg-white shadow">
                <thead className="bg-red-800">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-white">
                      ID
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-white">
                      TUP ID
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-white">
                      Email
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-white">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="bg-white hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {user.id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {user.tup_id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {user.email}
                      </td>
                      <td className="py-2 border border-gray-300 text-center">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                          className="border border-gray-300 rounded"
                        >
                          <option value="user">User</option>
                          <option value="assistant-admin">
                            Assistant Admin
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
