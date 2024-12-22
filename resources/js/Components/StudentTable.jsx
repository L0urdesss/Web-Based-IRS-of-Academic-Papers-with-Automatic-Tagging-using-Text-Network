import { Link } from '@inertiajs/react';

export default function StudentTable({ items, columns, primary, actionUpdate, handleDelete }) {

    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">{primary}</th>
                        {columns.map((column) =>
                            <th key={column} scope="col" className="px-6 py-3">{column}</th>
                        )}
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) =>
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                #{item.id}
                            </th>

                            <td className="px-8 py-4">{item.email}</td>
                            <td className="px-8 py-4">{item.name}</td>
                            <td className="px-8 py-4">{item.course}</td>
                            <td className="px-8 py-4">{item.college}</td>
                            <td className="px-8 py-4">
                                <Link href={route(actionUpdate, item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</Link>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleDelete(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete Item</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
