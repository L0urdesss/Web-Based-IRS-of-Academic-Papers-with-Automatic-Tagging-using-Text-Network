import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import Sidebar from '@/Components/Sidebar'; // Importing the Sidebar component

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard({ auth }) {
    // Data for Pie Charts
    const pieData1 = {
        labels: ['Category A', 'Category B', 'Category C'],
        datasets: [
            {
                data: [30, 50, 20],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const pieData2 = {
        labels: ['Segment 1', 'Segment 2', 'Segment 3'],
        datasets: [
            {
                data: [40, 30, 30],
                backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF'],
                hoverBackgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF'],
            },
        ],
    };

    const pieData3 = {
        labels: ['Group X', 'Group Y', 'Group Z'],
        datasets: [
            {
                data: [25, 25, 50],
                backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
            },
        ],
    };

    // Data for Horizontal Bar Graph
    const horizontalBarData = {
        labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        datasets: [
            {
                label: 'Votes',
                data: [12, 19, 7, 5],
                backgroundColor: '#36A2EB',
                borderColor: '#1F77B4',
                borderWidth: 1,
            },
        ],
    };

    const horizontalBarOptions = {
        indexAxis: 'y', // Horizontal bar graph
        responsive: true,
        plugins: {
            legend: { display: false }, // Hide legend
        },
        scales: {
            x: {
                grid: { display: false }, // Remove gridlines
                ticks: { display: false }, // Optionally hide ticks
            },
            y: {
                grid: { display: false }, // Remove gridlines
            },
        },
    };

    // Data for Vertical Bar Graph
    const verticalBarData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Sales',
                data: [11, 20, 35, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderWidth: 1,
            },
        ],
    };

    const verticalBarOptions = {
        responsive: true,
        plugins: {
            legend: { display: false }, // Hide legend
        },
        scales: {
            x: {
                grid: { display: false }, // Remove gridlines
                ticks: { display: false }, // Optionally hide ticks
            },
            y: {
                grid: { display: false }, // Remove gridlines
                ticks: { beginAtZero: true }, // Keep ticks on Y-axis
            },
        },
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="w-full h-auto p-4 bg-gray-100">
                    {/* Top Panels */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {/* Panel 1 */}
                        <div className="bg-blue-500 text-white shadow-md p-4 rounded-lg">
                            <h3 className="text-lg font-bold">Panel 1</h3>
                            <p className="text-sm">Details or stats here</p>
                        </div>
                        {/* Panel 2 */}
                        <div className="bg-green-500 text-white shadow-md p-4 rounded-lg">
                            <h3 className="text-lg font-bold">Panel 2</h3>
                            <p className="text-sm">Details or stats here</p>
                        </div>
                        {/* Panel 3 */}
                        <div className="bg-yellow-500 text-white shadow-md p-4 rounded-lg">
                            <h3 className="text-lg font-bold">Panel 3</h3>
                            <p className="text-sm">Details or stats here</p>
                        </div>
                        {/* Panel 4 */}
                        <div className="bg-red-500 text-white shadow-md p-4 rounded-lg">
                            <h3 className="text-lg font-bold">Panel 4</h3>
                            <p className="text-sm">Details or stats here</p>
                        </div>
                    </div>

                    {/* Graphs Section */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Vertical Bar Graph */}
                        <div className="bg-white shadow-md p-4">
                            <h2 className="text-lg font-bold">Vertical Bar Graph</h2>
                            <div style={{ width: '100%', height: '200px' }}>
                                <Bar data={verticalBarData} options={verticalBarOptions} />
                            </div>
                        </div>

                        {/* Horizontal Bar Graph */}
                        <div className="bg-white shadow-md p-4">
                            <h2 className="text-lg font-bold">Horizontal Bar Graph</h2>
                            <div style={{ width: '100%', height: '200px' }}>
                                <Bar data={horizontalBarData} options={horizontalBarOptions} />
                            </div>
                        </div>

                        {/* Pie Charts */}
                        <div className="bg-white shadow-md p-4 col-span-2">
                            <h2 className="text-lg font-bold">Pie Charts</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Pie data={pieData1} />
                                </div>
                                <div>
                                    <Pie data={pieData2} />
                                </div>
                                <div>
                                    <Pie data={pieData3} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
