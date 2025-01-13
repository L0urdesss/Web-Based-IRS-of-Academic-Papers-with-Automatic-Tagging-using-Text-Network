import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import SearchBar from "@/Components/Searchbar";
import Toggle from "@/Components/Toggle";
import NotFound from "@/Components/notfound.png";
import CiteIcon from "@/Components/citeIcon.png";

// Import the icon image
import filtersIcon from "@/Components/filters-icon.png";

const truncateText = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + "...";
};

export default function ViewAll({
  auth,
  papers,
  searchQuery,
  filters,
  sortCourse,
  sortOrders,
  paperFile,
  paperDate,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery || "");
  const [selectedCourse, setSelectedCourse] = useState(sortCourse || ""); // State for selected course
  const [sortOrder, setSortOrder] = useState(sortOrders || "asc"); // State for sorting order
  const [appliedFilters, setAppliedFilters] = useState(filters || []); // State for applied filters
  const [triggerSearch, setTriggerSearch] = useState(false); // State to trigger search
  const [withFile, setWithFile] = useState(paperFile || false);
  const [selectedRange, setSelectedRange] = useState(paperDate || null);
  const [customDate, setCustomDate] = useState({ start: "", end: "" });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const buildArrayParams = (key, array) => {
    return array
      .map((item, index) => `${key}[${index}]=${encodeURIComponent(item)}`)
      .join("&");
  };
  const openModal = (paper) => {
    setSelectedPaper(paper); // Selects the paper to show in the modal
    setIsModalOpen(true); // Opens the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Closes the modal
    setSelectedPaper(null); // Clears the selected paper
  };

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    console.log("test");
    setIsLoading(false);
  }, [papers]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    // Cleanup to reset scroll behavior if the component is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    console.log("test2");

    setInputValue(searchQuery);
  }, [searchQuery]);

  console.log(inputValue);
  const handleSearch = (searchTerm) => {
    setIsLoading(false);
    const url = route("userpapers.view");

    const data = {
      searchQuery: searchTerm,
      filters: appliedFilters,
      sortCourse: selectedCourse,
      sortOrders: sortOrder,
      paperFile: withFile,
      paperDate: selectedRange,
    };

    const option = {
      preserveScroll: true,
    };

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
    console.log(appliedFilters);
    let filterText = filterType;
    if (filterType === "Title") {
      filterText = "Title";
    } else if (filterType === "Author") {
      filterText = "Author";
    } else if (filterType === "Abstract") {
      filterText = "Abstract";
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
    console.log("Toggle changed after:", checked);
    setTriggerSearch(true);
  };

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
    if (range === "custom") {
      setShowCustomInput(true);
    } else if (range === 0) {
      setSelectedRange(null);
      setShowCustomInput(false);
    } else {
      setSelectedRange(range);
      setShowCustomInput(false);
    }
    if (range != "custom") {
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
            <div className="bg-white p-5 border-2 border-[#F0F0F0]">
              <div className="mb-4 flex justify-between items-center">
                <p className="font-semibold text-[16px] text-[#352D2D]">
                  <img
                    src={filtersIcon}
                    alt="Filters Icon"
                    className="inline-block w-6 h-6 mr-1 mb-1"
                  />
                  Filters
                </p>
              </div>
              <hr className="border-t-0 border-r-0 border-l-0 border-b-2 border-[#F0F0F0] my-4" />
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-[#352D2D] text-xs">
                    Applied Filters
                  </p>

                  {appliedFilters.length > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-[#352D2D] text-xs underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="flex items-center flex-wrap mb-2">
                  {appliedFilters.map((filter, index) => (
                    <button
                      key={index}
                      onClick={() => handleRemoveFilter(filter)}
                      className="text-white rounded-md px-4 py-2 mr-2 mb-2 text-[11px] bg-[#CC0000]"
                    >
                      {filter} <span className="ml-1">X</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <select
                  id="course"
                  className="mt-1 block w-full border border-[#7B7B7B] py-1 px-3  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs text-[10px]"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  <option value="">ALL</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSIS">BSIS</option>
                  <option value="BSES">BSES</option>
                  <option value="BASLT">BASLT</option>
                  <option value="BSIT">BSIT</option>
                </select>
              </div>
              <div className="mb-4">
                <select
                  id="sort"
                  className="mt-1 block w-full w-1/2 border border-[#7B7B7B] py-1 px-3 text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
                  value={sortOrder}
                  onChange={handleSortCourseChange}
                >
                  <option value="asc">Sort Ascending</option>
                  <option value="desc">Sort Descending</option>
                </select>
              </div>
              <hr className="border-b-1 border-[#F0F0F0] my-4" />
              <div className="mt-4 flex flex-col">
                <p className="font-semibold mb-2 text-[#352D2D] text-[12px]">
                  Filter Types
                </p>

                <div className="flex">
                  <button
                    onClick={() => handleFilterClick("Title")}
                    className="text-[#352D2D] text-[10px] border border-gray-500 rounded-md px-4 py-2 mr-1 w-1/2"
                  >
                    Title
                  </button>
                  <button
                    onClick={() => handleFilterClick("Author")}
                    className="text-[#352D2D] text-[10px] border border-gray-500 rounded-md px-4 py-2 w-1/2"
                  >
                    Author
                  </button>
                </div>

                <button
                  onClick={() => handleFilterClick("Abstract")}
                  className="text-[#352D2D] text-[10px] border border-gray-500 rounded-md px-4 py-2 mt-3"
                >
                  Abstract
                </button>
              </div>
              <hr className="border-b-1 border-[#F0F0F0] my-4" />
              <Toggle checked={withFile} onChange={handleToggleChange} />
              <hr className="border-b-1 border-[#F0F0F0] my-4" />
              <div className="mt-4">
                <p className="font-semibold text-[#352D2D] text-[12px]">
                  Publication Date
                </p>
                <div>
                  <ul className="list-none">
                    <li>
                      <button
                        className="text-[#AF2429] text-[11px] hover:underline"
                        onClick={() => handleButtonClick(0)}
                      >
                        Clear
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-[#AF2429] text-[11px] hover:underline"
                        onClick={() => handleButtonClick(1)}
                      >
                        Last 1 Year
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-[#AF2429] text-[11px] hover:underline"
                        onClick={() => handleButtonClick(3)}
                      >
                        Last 3 Years
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-[#AF2429] text-[11px] hover:underline"
                        onClick={() => handleButtonClick("custom")}
                      >
                        Custom Date
                      </button>
                    </li>
                  </ul>
                  {showCustomInput && (
                    <div>
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Start Year"
                          value={customDate.start}
                          onChange={(e) =>
                            setCustomDate({
                              ...customDate,
                              start: e.target.value,
                            })
                          }
                          className="w-1/2 mr-1 text-[10px] h-[20px] bg-[#F0F0F0] border-0 border-b border-[#626262]"
                        />
                        <span className="mr-1 text-[#626262]">-</span>
                        <input
                          type="text"
                          placeholder="End Year"
                          value={customDate.end}
                          onChange={(e) =>
                            setCustomDate({
                              ...customDate,
                              end: e.target.value,
                            })
                          }
                          className="w-1/2 mr-1 text-[10px] h-[20px] bg-[#F0F0F0] border-0 border-b border-[#626262]"
                        />
                      </div>
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={handleCustomDateSubmit}
                          className="text-[8px] bg-[#B8B8B8] text-white rounded-[10px] py-[5px] px-[20px] border-0 cursor-pointer w-full"
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#626262")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#B8B8B8")
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                  {selectedRange && (
                    <div>
                      <p className="text-[14px] text-[#626262]">
                        Selected Date Range: {`${selectedRange}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-3/4">
            <div className="mb-1">
              <SearchBar
                onSearch={handleSearch}
                searchQuery={inputValue}
                onChange={setInput}
              />
            </div>
            {isLoading ? (
              "Loading..."
            ) : (
              <div>
                {papers.data.length === 0 ? (
                  <div className="flex flex-col items-center mt-4">
                    <img
                      src={NotFound}
                      alt="No results found"
                      className="w-3/4 h-auto mb-4"
                    />
                    <p className="text-gray-500 text-center mb-4">
                      No papers found. Please try a different search or adjust
                      your filters.
                    </p>
                  </div>
                ) : (
                  papers.data.map((paper, index) => (
                    <div
                      key={index}
                      className="bg-white p-10 border-2 border-[#F0F0F0] mb-5 mt-10"
                    >
                      <div className="mb-2">
                        <Link
                          href={route("userpapers.preview", {
                            paper: paper.id,
                          })}
                          className="font-bold text-[#595858] underline text-[20px]"
                        >
                          {paper.title}
                        </Link>
                      </div>
                      <div className="mb-2 text-[10px] text-[#352D2D]">
                        {paper.course} &bull; {paper.date_published} &bull;{" "}
                        <span className="text-[10px] text-[#352D2D]">
                          {paper.author}
                        </span>
                      </div>
                      <div className="mb-2 text-[13px] text-[#352D2D] text-justify">
                        {truncateText(paper.abstract, 60)}
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        {paper.key_terms &&
                          paper.key_terms.split(",").map((term, index) => (
                            <span
                              key={index}
                              className="inline-block bg-[#AF2429] text-white text-sm font-normal me-2 px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300 mt-1"
                            >
                              {term.trim()}
                            </span>
                          ))}
                      </p>
                      <div className="flex justify-end">
                        <button
                          className="text-sm text-red-800 underline flex items-center mt-2"
                          onClick={() => openModal(paper)}
                        >
                          <img
                            src={CiteIcon}
                            alt="Cite Icon"
                            className="mr-1 w-2"
                          />{" "}
                          {/* Display the PNG image */}
                          Cite
                        </button>
                      </div>
                    </div>
                  ))
                )}
                {isModalOpen && selectedPaper && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white rounded-lg max-w-md mx-auto">
                      <h2 className="text-lg font-semibold bg-red-800 text-white p-2 rounded-t-lg text-center">
                        Cite
                      </h2>
                      <div className="p-2 flex flex-col items-center">
                        <div className="flex items-start p-4">
                          <div className="w-1/4 font-semibold text-gray-500">
                            APA
                          </div>
                          <div className="w-full text-xs text-gray-500">
                            {`${selectedPaper.author} (${selectedPaper.date_published}). `}
                            <span className="italic">
                              {selectedPaper.title}
                            </span>
                            {`. ${selectedPaper.course}. Retrieved from http://localhost:8000/papers/${selectedPaper.id}`}
                          </div>
                        </div>
                        <button
                          className="text-sm bg-gray-700 text-white px-4 py-2 rounded-full w-3/4 mt-2 mb-2 mx-auto"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4">
              {papers.links && (
                <ul className="flex justify-center">
                  {papers.links.map((link, index) => (
                    <li key={index} className="mx-2">
                      <Link
                        href={
                          (link.url
                            ? link.url + (link.url.includes("?") ? "&" : "")
                            : "") +
                          "searchQuery=" +
                          (inputValue ? encodeURIComponent(inputValue) : "") +
                          "&" +
                          buildArrayParams("filters", appliedFilters) +
                          "&sortOrders=" +
                          encodeURIComponent(sortOrder) +
                          "&sortCourse=" +
                          encodeURIComponent(selectedCourse) +
                          "&paperFile=" +
                          encodeURIComponent(withFile) +
                          "&paperDate=" +
                          encodeURIComponent(selectedRange)
                        }
                        className={`px-4 py-2 ${
                          link.active
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } hover:bg-gray-300 rounded-lg`}
                        style={{
                          backgroundColor: link.active ? "#831b1c" : "",
                        }}
                      >
                        {link.label === "&laquo; Previous"
                          ? "Previous"
                          : link.label === "Next &raquo;"
                          ? "Next"
                          : link.label}
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
