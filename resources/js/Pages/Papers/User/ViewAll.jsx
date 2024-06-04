import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import SearchBar from '@/Components/Searchbar';
import Toggle from '@/Components/Toggle'; 

// Import the icon image
import filtersIcon from '@/Components/filters-icon.png';


const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length <= maxWords) {
        return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
};

export default function ViewAll({ auth, papers, searchQuery, filters, sortCourse, sortOrders, paperFile ,paperDate }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery || '');
    const [selectedCourse, setSelectedCourse] = useState(sortCourse || ''); // State for selected course
    const [sortOrder, setSortOrder] = useState(sortOrders || 'asc'); // State for sorting order
    const [appliedFilters, setAppliedFilters] = useState(filters || []); // State for applied filters
    const [triggerSearch, setTriggerSearch] = useState(false); // State to trigger search
    const [withFile, setWithFile] = useState(paperFile || false);
    const [selectedRange, setSelectedRange] = useState(paperDate || null);
    const [customDate, setCustomDate] = useState({ start: '', end: '' });
    const [showCustomInput, setShowCustomInput] = useState(false);

    const buildArrayParams = (key, array) => {
        return array.map((item, index) => `${key}[${index}]=${encodeURIComponent(item)}`).join('&');
      };

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        console.log("test")
        setIsLoading(false);
    }, [papers]);

    useEffect(()=> {
        console.log("test2")

        setInputValue(searchQuery);
    },[searchQuery]);

    console.log(inputValue)
    const handleSearch = (searchTerm) => {
        setIsLoading(true);
        const url = route('userpapers.view');
        
        const data = {
            searchQuery: searchTerm,
            filters: appliedFilters,
            sortCourse: selectedCourse,
            sortOrders: sortOrder,
            paperFile: withFile,
            paperDate: selectedRange
        };

        const option = {
            preserveScroll: true
        }

        router.get(url, data, option);
    };

    // const handleOnClickSearch = (searchTerm,course) => {
    //     setIsLoading(true);
    //     console.log(course)
    //     window.location = route('userpapers.view', {
    //         searchQuery: searchTerm,
    //         filters: appliedFilters,
    //         sortCourse: course,
    //         sortOrders: sortOrder,
    //     });
    // };

    const handleFilterClick = (filterType) => {
        console.log(appliedFilters)
        let filterText = filterType;
        if (filterType === 'Title') {
            filterText = 'Title';
        } else if (filterType === 'Author') {
            filterText = 'Author';
        } else if (filterType === 'Abstract') {
            filterText = 'Abstract';
        }
        const lowercaseFilter = filterType.toLowerCase(); 
        if (!appliedFilters.includes(lowercaseFilter)) {
            setAppliedFilters([...appliedFilters, lowercaseFilter]);
            setTriggerSearch(true);

        }

    };
    
    const handleRemoveFilter = (filter) => {
        const updatedFilters = appliedFilters.filter((item) => item !== filter);
        setAppliedFilters(updatedFilters);
        setTriggerSearch(true);

    };

    const handleClearFilters = () => {
        setTriggerSearch(true);
        setAppliedFilters([]);
    };

    const handleToggleChange = (event) => {
        const checked = event.target.checked;
        console.log("Toggle changed:", checked);
        setWithFile(checked);
        setTriggerSearch(true);
      };
    
    useEffect(() => {
    console.log("withFile state changed:", withFile);
    }, [withFile]);


    const handleCourseChange = (e) => {
        const newCourse = e.target.value;
        setSelectedCourse(newCourse);
        console.log(newCourse);
        setTriggerSearch(true);
    };

    const handleSortCourseChange = (e) => {
        const newSort = e.target.value;
        setSortOrder(newSort);
        console.log(newSort);
        setTriggerSearch(true);
    };

    useEffect(() => {
        if (triggerSearch) {
            handleSearch(inputValue);
            setTriggerSearch(false); // Reset triggerSearch to prevent infinite loop
        }
        
    }, [triggerSearch, inputValue]); // Trigger effect only when triggerSearch or inputValue changes
    
    const setInput = (searchQuery) => {
        setInputValue(searchQuery);
    };
    const handleButtonClick = (range) => {
        if (range === 'custom') {
            setShowCustomInput(true);
        } else if(range === 0){
            setSelectedRange(null);
            setShowCustomInput(false);
        }
        else {
            setSelectedRange(range);
            setShowCustomInput(false);
        }
        if (range != 'custom'){
            setTriggerSearch(true);
        }
    };

    const handleCustomDateSubmit = () => {
        let { start, end } = customDate;
        start = parseInt(start);
        end = parseInt(end);

        if (start > end) {
            [start, end] = [end, start];
        }

        if (start > currentYear) start = currentYear;
        if (end > currentYear) end = currentYear;
        
        setSelectedRange([start, end]);
        setShowCustomInput(false);
        setTriggerSearch(true);
    };



    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="All Papers" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto sm:flex sm:justify-between sm:px-6 lg:px-8">
                    <div className="sm:w-1/5 bg-none border-white mr-5 mt-20">
                        <div className="bg-white p-5" style={{ border: '2px solid #F0F0F0' }}>
                            <div className="mb-4 flex justify-between items-center">
                                <p className="font-semibold" style={{ fontSize: '16px', color: '#352D2D' }}>
                                    <img src={filtersIcon} alt="Filters Icon" className="inline-block w-6 h-6 mr-1 mb-1" />
                                    Filters
                                </p>
                            </div>
                            <hr style={{ border: 'none', borderBottom: '2px solid #F0F0F0', margin: '1rem 0' }} />
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold" style={{ fontSize: '12px', color: '#352D2D' }}>Applied Filters</p>
                                    {appliedFilters.length > 0 && (
                                        <button onClick={handleClearFilters} className="text-blue-500 underline" style={{ fontSize: '11px', color: '#352D2D' }}>
                                            Clear All
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center flex-wrap mb-2">
                                    {appliedFilters.map((filter, index) => (
                                        <button key={index} onClick={() => handleRemoveFilter(filter)} className="text-white rounded-md px-4 py-2 mr-2 mb-2" style={{ fontSize: '11px', backgroundColor: '#CC0000' }}>
                                            {filter} <span className="ml-1">X</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                            <select id="course" 
                                className="form-select mt-1 block w-full border border-gray-300  py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                value={selectedCourse} 
                                onChange={handleCourseChange}
                                style={{ fontSize: '10px', borderColor: '#7B7B7B', width: '150px' }}>
                                    <option value="" disabled>Select Course</option>
                                    <option value="">ALL</option>
                                    <option value="BSCS">BSCS</option>
                                    <option value="BSIS">BSIS</option>
                                    <option value="BSES">BSES</option>
                                    <option value="BASLT">BASLT</option>
                                    <option value="BSIT">BSIT</option>
                            </select>

                            </div>
                            <div className="mb-4">
                                <select id="sort" className="form-select mt-1 block w-full border border-gray-300  py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                value={sortOrder} 
                                onChange={handleSortCourseChange} style={{ fontSize: '10px', borderColor: '#7B7B7B', width: '150px' }}>
                                    <option value="asc">Sort Ascending</option>
                                    <option value="desc">Sort Descending</option>
                                </select>
                            </div>
                            <hr style={{ border: 'none', borderBottom: '1px solid #F0F0F0', margin: '1rem 0' }} />
                            <div className="mt-4 flex flex-col">
                                <p className="font-semibold mb-2" style={{ fontSize: '12px', color: '#352D2D' }}>Filter Types</p>
                                <div className="flex flex-wrap">
                                    <button onClick={() => handleFilterClick('Title')} className="text-blue-500 border border-gray-500 rounded-md px-4 py-2 mr-2 mb-2 " style={{ fontSize: '11px', color: '#352D2D' }}>Title</button>
                                    <button onClick={() => handleFilterClick('Author')} className="text-blue-500 border border-gray-500 rounded-md px-4 py-2 mb-2 " style={{ fontSize: '11px', color: '#352D2D' }}>Author</button>
                                    <button onClick={() => handleFilterClick('Abstract')} className="text-blue-500 border border-gray-500 rounded-md px-4 py-2 w-1/2 mb-5" style={{ fontSize: '11px', color: '#352D2D' }}>Abstract</button>
                                </div>
                            </div>
                            <hr style={{ border: 'none', borderBottom: '1px solid #F0F0F0', margin: '1rem 0' }} />
                            <Toggle checked={withFile} onChange={handleToggleChange} disabled={isLoading} />
                            <hr style={{ border: 'none', borderBottom: '1px solid #F0F0F0', margin: '1rem 0' }} />
                            <div className="mt-4">
                                <p className="font-semibold" style={{ fontSize: '12px', color: '#352D2D' }}>Publication Date</p>
                            <div>
                                <ul className="list-none">
                                    <li>
                                        <button
                                            className="text-blue-500 hover:underline"
                                            style={{ fontSize: '11px', color: '#AF2429' }}
                                            onClick={() => handleButtonClick(0)}
                                        >
                                            Clear
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="text-blue-500 hover:underline"
                                            style={{ fontSize: '11px', color: '#AF2429' }}
                                            onClick={() => handleButtonClick(1)}
                                        >
                                            Last 1 Year
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="text-blue-500 hover:underline"
                                            style={{ fontSize: '11px', color: '#AF2429' }}
                                            onClick={() => handleButtonClick(3)}
                                        >
                                            Last 3 Years
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="text-blue-500 hover:underline"
                                            style={{ fontSize: '11px', color: '#AF2429' }}
                                            onClick={() => handleButtonClick('custom')}
                                        >
                                            Custom Date
                                        </button>
                                    </li>
                                </ul>

                                {showCustomInput && (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Start Year"
                                            value={customDate.start}
                                            onChange={(e) => setCustomDate({ ...customDate, start: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="End Year"
                                            value={customDate.end}
                                            onChange={(e) => setCustomDate({ ...customDate, end: e.target.value })}
                                        />
                                        <button onClick={handleCustomDateSubmit}>Submit</button>
                                    </div>
                                )}

                                {selectedRange && (
                                    <div>
                                        <p>Selected Date Range: {`${selectedRange}`}</p>
                                    </div>
                                )}
                            </div>

                            </div>
                        </div>
                    </div>
                    <div className="sm:w-3/4">
                        <div className="mb-1">
                            <SearchBar onSearch={handleSearch} searchQuery={inputValue} onChange={setInput}/>
                        </div>
                        {isLoading ? "Loading..." : (
                            <div>
                                {papers.data.map((paper, index) => (
                                    <div key={index} className="bg-white p-10 border-b border-gray-200 mb-5 mt-10" style={{ border: '2px solid #F0F0F0' }}>
                                        <div className="mb-2">
                                            <Link
                                                href={route('userpapers.preview', { paper: paper.id })}
                                                className="font-bold text-blue-500 hover:underline"
                                                style={{ textDecoration: 'underline', color: '#AF2429', fontWeight: 'bold', fontSize: '20px' }}
                                            >
                                                {paper.title}
                                            </Link>
                                        </div>
                                        <div className="mb-2" style={{ fontSize: '10px', color: '#352D2D' }}>
                                            {paper.date_published} &bull; <span style={{ fontSize: '10px', color: '#352D2D' }}>{paper.author}</span>
                                        </div>
                                        <div className="mb-2" style={{ fontSize: '13px', color: '#352D2D', textAlign: 'justify' }}>
                                            {truncateText(paper.abstract, 60)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            {papers.links && (
                                <ul className="flex justify-center">
                                    {papers.links.map((link, index) => (
                                        <li key={index} className="mx-2">
                                            <Link
                                                href={(link.url ? link.url + (link.url.includes('?') ? '&' : '') : '') + 
                                                'searchQuery=' + (inputValue ? encodeURIComponent(inputValue) : '') +
                                                '&' + buildArrayParams('filters', appliedFilters) +
                                                '&sortOrders=' + encodeURIComponent(sortOrder) + 
                                                '&sortCourse=' + encodeURIComponent(selectedCourse) +
                                                '&paperFile=' + encodeURIComponent(withFile)+
                                                '&paperDate=' + encodeURIComponent(selectedRange)

                                            }
                                              className={`px-4 py-2 ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-300 rounded-lg`}
                                                style={{ backgroundColor: link.active ? '#831b1c' : '' }}
                                            >
                                                {link.label === '&laquo; Previous' ? 'Previous' : link.label === 'Next &raquo;' ? 'Next' : link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
