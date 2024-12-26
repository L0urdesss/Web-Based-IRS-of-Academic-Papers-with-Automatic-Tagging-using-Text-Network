import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";

export default function All({ auth, assistantAdmins }) {
  // Use state to store assistant admins
  const [admins, setAdmins] = useState(assistantAdmins);

  const handleRemove = (adminId) => {
    // Send a DELETE request to remove the assistant admin (change their role to "user")
    axios
      .delete(route("assistant-admins.destroy", adminId)) // Use DELETE request
      .then((response) => {
        // On success, remove the admin from the state
        console.log(response.data.message); // Log the success message
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.id !== adminId)
        );
      })
      .catch((error) => {
        // Handle error if any
        console.error(
          "Error removing admin:",
          error.response?.data?.error || error.message
        );
      });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Assistant Admins" />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-white shadow sm:rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Assistant Admins</h1>

          {/* Add Button */}
          <div className="mb-4">
            <Link href="/assistant-admins/add">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Add Assistant Admin
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-collapse border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">TUP ID</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {admin.tup_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {admin.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {admin.role}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemove(admin.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
