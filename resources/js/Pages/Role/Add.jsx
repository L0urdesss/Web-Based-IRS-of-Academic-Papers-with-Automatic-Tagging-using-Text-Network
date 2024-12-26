import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";

export default function Add({ auth, users }) {
  // Filter users with the role "user"
  const filteredUsers = users.filter((user) => user.role === "user");

  // State to manage users and their updated roles
  const [updatedUsers, setUpdatedUsers] = useState(filteredUsers);

  const handleRoleChange = (userId, newRole) => {
    setUpdatedUsers((prevUsers) =>
      prevUsers
        .map((user) => (user.id === userId ? { ...user, role: newRole } : user))
        // Filter out users who are now assistant-admin
        .filter((user) => user.role !== "assistant-admin")
    );

    // Trigger the form submission after the role change
    handleSubmit(userId, newRole);
  };

  const handleSubmit = (userId, newRole) => {
    // Assuming `data` includes the userId and the new role
    const data = {
      id: userId, // This should be 'id' as per the backend validation
      role: newRole,
    };

    // Use PATCH request to update the user role
    axios
      .patch(route("assistant-admins.update", userId), data)
      .then((response) => {
        // Handle success response if necessary
        console.log("Role updated successfully:", response);
      })
      .catch((error) => {
        // Handle error response if necessary
        console.error("Error updating role:", error);
      });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 p-6 bg-white shadow sm:rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Users with Role: "User"</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300">ID</th>
                  <th className="px-4 py-2 border border-gray-300">TUP ID</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Role</th>
                </tr>
              </thead>
              <tbody>
                {updatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }
                  >
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      {user.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      {user.tup_id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="border border-gray-300 p-2 rounded"
                      >
                        <option value="user">User</option>
                        <option value="assistant-admin">Assistant Admin</option>
                      </select>
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
