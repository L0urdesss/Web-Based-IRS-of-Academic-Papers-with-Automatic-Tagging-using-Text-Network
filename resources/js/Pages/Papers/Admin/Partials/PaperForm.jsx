import React, { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage, router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import axios from "axios";

// Import the images using @/ alias
import uploadBoxImage from "@/Components/uploadbox.png"; // Import the upload box image
import browseButtonImage from "@/Components/browse_button.png"; // Import the browse button image
import CourseDropdown from "@/Components/CourseDropdown";
import Toast from "@/Components/Toast";

export default function PaperForm({ auth, paper, className = "" }) {
  console.log(paper);
  const { data, setData, processing, recentlySuccessful } = useForm({
    title: paper ? paper.title : "",
    abstract: paper ? paper.abstract : "",
    author: paper ? paper.author : "",
    course: paper ? paper.course : "",
    date_published: paper ? paper.date_published : "",
    file: paper ? paper.file : null,
    main_topic: paper ? paper.main_topic : "",
    subtopic: paper ? paper.subtopic : "",
    key_terms: paper ? paper.key_terms : "",
  });
  const { errors } = usePage().props;
  const initialAuthors =
    paper && paper.author
      ? paper.author.split(",").map((author) => author.trim())
      : [""];
  const [authors, setAuthors] = useState(initialAuthors);

  const initialTerms =
    paper && paper.key_terms
      ? paper.key_terms.split(",").map((term) => term.trim())
      : [""];

  const [keyTerms, setKeyTerms] = useState(initialTerms);

  // Initialize authorInputs array based on the number of authors
  const [authorInputs, setAuthorInputs] = useState(
    initialAuthors.map(() => "")
  );

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = value;
    setAuthors(updatedAuthors);
  };

  const addAuthorInput = () => {
    setAuthorInputs([...authorInputs, ""]);
  };

  const removeAuthorInput = (index) => {
    const updatedAuthorInputs = [...authorInputs];
    updatedAuthorInputs.splice(index, 1);
    setAuthorInputs(updatedAuthorInputs);

    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  useEffect(() => {
    const combinedAuthors = authors
      .filter((author) => author.trim() !== "")
      .join(", "); // Combine authors into a single string separated by commas
    setData("author", combinedAuthors);
  }, [authors]);

  useEffect(() => {
    if (!data.file) return;

    console.log(data);
    handleUpload();
  }, [data.file]);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const [selectedCourse, setSelectedCourse] = useState(
    paper ? paper.course : "BASLT"
  );

  useEffect(() => {
    setData("course", selectedCourse);
  }, [selectedCourse]);

  const [isDragging, setIsDragging] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    console.log(paper);
    if (paper) {
      router.post(`/papers-admin/${paper.id}`, {
        ...data,
        _method: "patch",
        preserveScroll: true,
      });
    } else {
      router.post("/add-admin", {
        ...data,
        preserveScroll: true,
      });
    }
  };

  const handleUpload = async () => {
    if (!data.file) {
      console.error("No file to upload");
      return;
    }
    if (typeof data.file === "string") {
      return;
    }
    const formData = new FormData();
    formData.append("file", data.file);

    try {
      const response = await axios.post("/papers-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.data;
      console.log("responseData: ", responseData);

      setData({
        ...data,
        title: responseData.title,
        abstract: responseData.abstract,
        author: responseData.author,
        course: responseData.course,
        date_published: responseData.date_published,
        main_topic: responseData.main_topic,
        subtopic: responseData.subtopic,
        key_terms: responseData.key_terms,
      });
      const formattedAuthors =
        responseData && responseData.author
          ? responseData.author.split(",").map((author) => author.trim())
          : [""];

      const formattedTerms =
        responseData && responseData.key_terms
          ? responseData.key_terms.split(",").map((term) => term.trim())
          : [""];
      setKeyTerms(formattedTerms);
      setAuthors(formattedAuthors);
      setAuthorInputs(formattedAuthors.map(() => ""));
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const handleClick = () => {
    setData({ ...data, file: null });
    console.log(data);
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-between mx-4 md:mx-20 space-y-4  md:space-x-10">
      <Toast />
      <section className={`bg-white ${className} w-full`}>
        <header>
          <h2 className="text-2xl font-bold text-gray-700 mt-5">
            Research Paper Information
          </h2>
        </header>
        <form onSubmit={submit} className="mt-6 space-y-6">
          <div>
            <InputLabel
              htmlFor="title"
              value="Title"
              className="text-md mt-10"
            />
            <TextInput
              id="title"
              className="mt-2 block w-full text-xs border border-gray-300 rounded-lg"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
            />
            <InputError className="mt-2" message={errors.title} />
          </div>
          <div>
            <InputLabel
              htmlFor="course"
              value="Course Selection"
              className="text-md"
            />
            <CourseDropdown onChange={handleCourseChange} value={data.course} />
          </div>

          <div>
            <InputLabel
              htmlFor="author"
              value="Author(s)"
              className="text-md "
            />
            {authorInputs.map((input, index) => (
              <div key={index} className="flex items-center space-x-2">
                <TextInput
                  className="mt-1 block w-full text-[10px] border border-gray-300"
                  value={authors[index]}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                />
                {index === authorInputs.length - 1 && (
                  <button
                    type="button"
                    onClick={addAuthorInput}
                    className="mt-5 p-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    +
                  </button>
                )}
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeAuthorInput(index)}
                    className="p-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <InputError className="mt-2" message={errors.author} />
          </div>
          <div>
            <InputLabel
              htmlFor="date_published"
              value="Date Published"
              className="text-md"
            />
            <TextInput
              id="date_published"
              className="mt-1 block w-full text-[10px] border border-gray-300"
              value={data.date_published}
              onChange={(e) => setData("date_published", e.target.value)}
            />
            <InputError className="mt-2" message={errors.date_published} />
          </div>
          <div>
            <InputLabel
              htmlFor="abstract"
              value="Abstract"
              style={{ fontSize: "12px" }}
            />
            <TextInput
              id="abstract"
              type="textarea"
              className="mt-1 block w-full h-56 p-2 border border-gray-300 rounded-md overflow-y-auto"
              value={data.abstract}
              onChange={(e) => setData({ ...data, abstract: e.target.value })}
              style={{
                fontSize: "10px",
                border: "1px solidrgb(236, 235, 235)",
                resize: "none", // Prevent resizing
              }}
            />

            <InputError className="mt-2" message={errors.abstract} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <PrimaryButton
              className="bg-[#831B1C] text-xs text-white capitalize disabled:bg-gray-400 w-full mt-4 mb-20" // Tailwind classes for button styling
              disabled={processing}
            >
              Save Changes
            </PrimaryButton>
          </div>
        </form>
      </section>
      <div
        className="relative bg-white p-4 md:p-6 mt-5 mr-10"
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "400px",
          backgroundColor: "#831B1C",
          marginTop: "13%",
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) setData("file", file);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
      >
        <div
          className={`rounded-lg shadow flex items-center justify-center flex-col ${
            isDragging ? "border-blue-500" : "border-white"
          }`}
          style={{
            backgroundColor: "transparent",
            borderColor: "white",
            borderWidth: "2px",
            borderStyle: "dashed",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Upload box */}
          <img
            src={uploadBoxImage}
            alt="Upload Box"
            style={{ maxWidth: "250px", height: "auto" }}
          />
          {/* Browse button */}
          <div className="mt-2">
            <InputLabel htmlFor="file" value="" style={{ fontSize: "10px" }} />
            <label htmlFor="file" className="cursor-pointer">
              <img
                src={browseButtonImage}
                alt="Browse Button"
                style={{ maxWidth: "150px", height: "auto" }}
              />
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setData("file", e.target.files[0]);
                }}
              />
            </label>
          </div>
          {/* View File link */}
          {data.file && (
            <>
              <a
                href={data.file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
                style={{
                  color: "white",
                  textDecoration: "underline",
                  fontWeight: "normal",
                }}
              >
                View File
              </a>
            </>
          )}
        </div>

        {/* Floating PDF Preview */}
        {data.file && data.file.type === "application/pdf" && (
          <div
            className="absolute"
            style={{
              top: "10px",
              left: "10px",
              width: "calc(100% - 20px)",
              height: "calc(100% - 20px)",
              zIndex: 50,
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <embed
              src={URL.createObjectURL(data.file)}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          </div>
        )}
        <div className="form-container">
          {/* Clear File Button */}
          <button
            className="mt-7 p-4 md:p-2 w-full"
            onClick={handleClick}
            style={{
              backgroundColor: "#831b1c",
              color: "white",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            Clear File
          </button>

          {/* Error Message */}
          {errors.file && <InputError className="mt-2" message={errors.file} />}

          {/* Main Topic */}
          <div className="mt-8">
            <InputLabel
              htmlFor="main_topic"
              value="Main Topic"
              style={{ fontSize: "12px" }}
            />
            <div
              id="main_topic"
              className="mt-1 block w-full h-10 p-2 border rounded-md overflow-y-auto"
              style={{ fontSize: "10px", border: "1px solid #7B7B7B" }}
            >
              {data.main_topic || "N/A"}
            </div>
          </div>

          {/* Subtopic */}
          <div className="mt-4">
            <InputLabel
              htmlFor="subtopic"
              value="Subtopic"
              style={{ fontSize: "12px" }}
            />
            <div
              id="subtopic"
              className="mt-1 block w-full h-10 p-2 border rounded-md overflow-y-auto"
              style={{ fontSize: "10px", border: "1px solid #7B7B7B" }}
            >
              {data.subtopic || "N/A"}
            </div>
          </div>

          {/* Key Terms */}
          <div className="mt-4">
            <div className="block w-full h-auto p-2 rounded-md">
              <div style={{ fontSize: "12px", marginBottom: "8px" }}>
                Key Terms
              </div>
              {keyTerms && keyTerms.length > 0
                ? keyTerms.map((term, index) => (
                    <span
                      key={index}
                      className="inline-block bg-[#af2429] text-white px-2 py-1 text-xs rounded-md mr-1 mb-1"
                      style={{ fontSize: "10px" }}
                    >
                      {term}
                    </span>
                  ))
                : "No key terms available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
