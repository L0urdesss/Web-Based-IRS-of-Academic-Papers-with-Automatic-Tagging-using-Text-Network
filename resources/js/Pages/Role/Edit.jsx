import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar"; // Import Sidebar

export default function Edit({ auth, assistantAdmin }) {
  const { data, setData, put, processing, errors } = useForm({
    name: assistantAdmin.name, // Pre-fill with the current name (and other fields if needed)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("assistant-admins.update", assistantAdmin.id), {
      data: data,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user} header={null}>
      <Head title="Edit Assistant Admin" />
      <div className="flex h-screen">
        {/* Sidebar component */}
        <Sidebar />

        <div className="w-full max-w-lg p-4">
          <div className="w-96 p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Assistant Admin</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Add other fields if needed */}

              <div className="mb-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full p-2 bg-blue-500 text-white rounded-lg"
                >
                  {processing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

            <Link
              href={route("assistant-admins.view")}
              className="text-blue-500"
            >
              Back to Assistant Admins
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
