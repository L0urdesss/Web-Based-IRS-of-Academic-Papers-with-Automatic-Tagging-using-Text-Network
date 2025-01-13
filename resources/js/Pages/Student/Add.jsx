import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StudentForm from "./Partials/StudentForm";

export default function AddStudent({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-bold text-2xl text-gray-700 leading-tight">
          Add Student
        </h2>
      }
    >
      <Head title="Add Student" />

      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
            {/* Header Section */}
            <div className="bg-red-900 text-white py-4 px-6 rounded-t-lg">
              <h3 className="text-lg font-medium">Student Information</h3>
              <p className="text-sm text-gray-200">
                Please fill out the form below to add a new student.
              </p>
            </div>

            {/* Form Section */}
            <div className="p-6 space-y-6">
              {/* Start of Form */}
              <form className="space-y-6">
                {/* Full-width fields */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                </div>

                {/* Two fields side by side */}
                {/* Two fields side by side */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <label
                      htmlFor="course"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Course Selection
                    </label>
                    <select
                      id="course"
                      name="course"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-800 focus:border-gray-800"
                    >
                      <option value="BASLT">BASLT</option>
                      <option value="BSCS">BSCS</option>
                      <option value="BSIT">BSIT</option>
                      <option value="BSES">BSES</option>
                      <option value="BSIS">BSIS</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="college"
                      className="block text-sm font-medium text-gray-700"
                    >
                      College
                    </label>
                    <input
                      type="text"
                      id="college"
                      name="college"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-gray-800 focus:border-gray-800"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-6 py-4 text-right rounded-b-lg">
              <button
                type="button"
                className="bg-red-900 hover:bg-gray-900 text-white font-medium py-2 px-5 rounded-md shadow transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
