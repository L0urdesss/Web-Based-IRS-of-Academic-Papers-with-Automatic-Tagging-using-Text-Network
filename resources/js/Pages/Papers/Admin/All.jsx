import { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import Toast from "@/Components/Toast";
import deleteButton from "@/Components/deleteIcon.png";
import editButton from "@/Components/editIcon.png";

export default function All({ auth, papers, searchQuery }) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery || "");
  const { delete: deletePaper } = useForm();

  useEffect(() => {
    setIsLoading(false);
    return () => {
      setInputValue("");
    };
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [papers]);

  const handleSearch = () => {
    setIsLoading(true);
    window.location = route("papers.index", { searchQuery: inputValue });
  };

  const handleDelete = (itemId, itemTitle) => {
    if (confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
      deletePaper(route("papers.destroy", itemId));
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Toast />
      <Head title="All Papers" />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Component */}

        <Sidebar user={auth.user} />

        {/* Main Content */}
        <div className="py-6 w-full bg-[#fffdfc] h-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 animate-[fade-in_0.8s_ease-in-out]">
              <Link
                href={route("papers.add")}
                className="ml-5 bg-green-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
              >
                + Add Paper
              </Link>
              <div className="flex w-full md:w-auto gap-2 mr-5">
                <input
                  type="text"
                  placeholder="Search.."
                  className="border border-gray-300 px-4 py-2 rounded-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#800020] text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-800 transition-transform transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 bg-gray-50">
              {isLoading ? (
                <p className="text-center text-gray-500 animate-pulse">
                  Loading...
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {papers.data.map((paper, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-300 rounded-lg p-5 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 animate-[fade-in_0.8s_ease-in-out]"
                    >
                      <div className="mb-2">
                        <Link
                          href={route("userpapers.preview", {
                            paper: paper.id,
                          })}
                        >
                          <h3 className="text-base font-semibold text-gray-700 mb-2 underline">
                            {paper.title}
                          </h3>
                        </Link>
                      </div>
                      <p className="text-xs text-gray-600 mb-1.5">
                        <strong>Author:</strong> {paper.author}
                      </p>
                      <p className="text-xs text-gray-600 mb-1.5">
                        <strong>Date:</strong> {paper.date_published}
                      </p>
                      <p className="text-xs text-gray-600 mb-1 text-justify">
                        <strong>Abstract:</strong>{" "}
                        {truncateText(paper.abstract, 30)}
                      </p>
                      <p className="text-sm text-gray-600 mt-3">
                        {paper.key_terms &&
                          paper.key_terms.split(",").map((term, index) => (
                            <span
                              key={index}
                              className="inline-block bg-[#666666] text-gray-50 text-xs font-medium me-2 px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 mt-1"
                            >
                              {term.trim()}
                            </span>
                          ))}
                      </p>

                      <div className="flex justify-end  gap-2">
                        <Link href={route("papers.edit", paper.id)}>
                          <img
                            src={editButton}
                            alt="Edit"
                            className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                          />
                        </Link>
                        <button
                          onClick={() => handleDelete(paper.id, paper.title)}
                        >
                          <img
                            src={deleteButton}
                            alt="Delete"
                            className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6">
              {papers.links && (
                <ul className="flex justify-center flex-wrap gap-2">
                  {papers.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={
                          (link.url
                            ? link.url + (link.url.includes("?") ? "&" : "?")
                            : "") +
                          "searchQuery=" +
                          encodeURIComponent(inputValue)
                        }
                        className={`px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200 ${
                          link.active
                            ? "bg-[#b2022f] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
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
