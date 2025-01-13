import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import RemoveIcon from "@/Components/removeIcon.png";

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
      <div className="flex h-screen bg-gray-50">
        <Sidebar user={auth.user} />
        <div className="flex-1 p-6 shadow rounded-sm">
          {/* Add Button */}
          <div className="mb-4 ml-4">
            <Link href="/assistant-admins/add">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                + Add Assistant Admin
              </button>
            </Link>
          </div>

          {/* Conditional rendering */}
          {admins.length === 0 ? (
            <p className="text-center text-lg font-semibold text-gray-700 mt-20">
              No assistant-admin, please add
            </p>
          ) : (
            // Table container with rounded-sm
            <div className="overflow-x-auto p-4">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-base font-medium bg-red-800 text-white rounded-sm">
                      TUP ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-base font-medium bg-red-800 text-white rounded-sm">
                      Email
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-base font-medium bg-red-800 text-white rounded-sm">
                      Role
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-base font-medium bg-red-800 text-white rounded-sm">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="border border-gray-300 px-4 py-2 text-sm font-normal">
                        {admin.tup_id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm font-normal">
                        {admin.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm font-normal">
                        {admin.role}
                      </td>
                      <td className="border border-gray-300 py-2 text-sm font-normal">
                        {/* Remove Icon as Button */}
                        <button
                          onClick={() => handleRemove(admin.id)}
                          className="p-0 flex justify-center items-center mx-auto" // Removed padding to make the image act as the button
                        >
                          <img
                            src={RemoveIcon}
                            alt="Remove"
                            className="w-full h-7 cursor-pointer position-center" // Adjust size and make it clickable
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
