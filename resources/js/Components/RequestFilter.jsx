import React from 'react';

const RequestFilter = ({ filterOption, handleFilterChange }) => {
    return (
        <div className="flex justify-end mb-4">
            <div className="flex items-center">
                <label htmlFor="filter" className="mr-2">Filter by:</label>
                <select
                    id="filter"
                    className="p-2 rounded-md border border-solid border-#352D2D bg-white focus:outline-none"
                    value={filterOption}
                    onChange={(e) => handleFilterChange(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
        </div>
    );
};

export default RequestFilter;
