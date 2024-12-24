import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "@/Components/Sidebar";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard({
  totalPapers,
  totalStudents,
  papersByCourse,
  papersByYear,
  studentsPerCourse,
  auth,
}) {
  // Prepare Data for "Papers per Course" Chart
  const courseLabels = papersByCourse.map((entry) => entry.course); // Course names
  const courseData = papersByCourse.map((entry) => entry.count); // Paper count per course

  const courseBarData = {
    labels: courseLabels,
    datasets: [
      {
        label: "Papers",
        data: courseData,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderWidth: 1,
      },
    ],
  };

  const courseBarOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    indexAxis: "y", // This makes the chart horizontal
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Papers", // Optional title for the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Courses", // Optional title for the y-axis
        },
      },
    },
  };

  // Prepare Data for "Papers Published per Year" Chart
  const yearLabels = papersByYear.map((entry) => entry.year); // Should be actual years like 2020, 2021
  const yearData = papersByYear.map((entry) => entry.count); // Count for each year

  const yearBarData = {
    labels: yearLabels,
    datasets: [
      {
        label: "Papers Published",
        data: yearData,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  const yearBarOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const year = tooltipItem.label;
            const count = tooltipItem.raw;
            return `Year: ${year}, Papers: ${count}`;
          },
        },
      },
    },
    indexAxis: "y", // Make the chart horizontal
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Papers", // Title for the x-axis (which will represent the count of papers)
        },
      },
      y: {
        title: {
          display: true,
          text: "Year Published", // Title for the y-axis (which will represent the years)
        },
      },
    },
  };

  const studentBarData = {
    labels: Object.keys(studentsPerCourse), // Course names
    datasets: [
      {
        data: Object.values(studentsPerCourse), // Number of students for each course
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderWidth: 1,
      },
    ],
  };

  const studentBarOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to stretch to the container's size
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: "Number of Students" },
      },
      y: {
        title: { display: true, text: "Courses" },
      },
    },
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full h-auto p-4 bg-gray-100">
          {/* Top Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-500 text-white shadow-md p-4 rounded-lg">
              <h3 className="text-lg font-bold">Total Students</h3>
              <p className="text-3xl font-bold">{totalStudents}</p>
            </div>
            <div className="bg-green-500 text-white shadow-md p-4 rounded-lg">
              <h3 className="text-lg font-bold">Total Papers</h3>
              <p className="text-3xl font-bold">{totalPapers}</p>
            </div>
          </div>

          {/* Charts in Two Vertical Panels */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Panel: Students per Course */}
            <div className="flex-1 bg-white shadow-md p-4">
              <h2 className="text-lg font-bold">Students per Course</h2>
              <div className="w-full h-96">
                <Bar data={studentBarData} options={studentBarOptions} />
              </div>
            </div>

            {/* Right Panel: Papers per Course and Papers Published per Year */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Papers per Course */}
              <div className="bg-white shadow-md p-4">
                <h2 className="text-lg font-bold">Papers per Course</h2>
                <div className="w-full h-48">
                  <Bar data={courseBarData} options={courseBarOptions} />
                </div>
              </div>

              {/* Papers Published per Year */}
              <div className="bg-white shadow-md p-4">
                <h2 className="text-lg font-bold">Papers Published per Year</h2>
                <div className="w-full h-48">
                  <Bar data={yearBarData} options={yearBarOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
