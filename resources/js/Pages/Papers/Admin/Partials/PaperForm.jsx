import React, { useState, useEffect} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

// Import the images using @/ alias
import uploadBoxImage from '@/Components/uploadbox.png'; // Import the upload box image
import browseButtonImage from '@/Components/browse_button.png'; // Import the browse button image
import CourseDropdown from '@/Components/CourseDropdown';

export default function PaperForm({ paper, className = '' }) {
    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
        title: paper ? paper.title : "",
        abstract: paper ? paper.abstract : "",
        author: paper ? paper.author : "", 
        course: paper ? paper.course : "",
        date_published: paper ? paper.date_published : "",
        file: paper ? paper.file : null,
    });
    
    const initialAuthors = paper && paper.author ? paper.author.split(',').map(author => author.trim()) : [''];
    const [authors, setAuthors] = useState(initialAuthors);

    // Initialize authorInputs array based on the number of authors
    const [authorInputs, setAuthorInputs] = useState(initialAuthors.map(() => ''));

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
      };

    const handleAuthorChange = (index, value) => {
        const updatedAuthors = [...authors];
        updatedAuthors[index] = value;
        setAuthors(updatedAuthors);
    };

    const addAuthorInput = () => {
        setAuthorInputs([...authorInputs, '']);
    };

    const removeAuthorInput = (index) => {
        const updatedAuthorInputs = [...authorInputs];
        updatedAuthorInputs.splice(index, 1);
        setAuthorInputs(updatedAuthorInputs);

        const updatedAuthors = [...authors];
        updatedAuthors.splice(index, 1);
        setAuthors(updatedAuthors);
    };

    useEffect(()=>{
        const combinedAuthors = authors.filter(author => author.trim() !== '').join(', '); // Combine authors into a single string separated by commas
        setData('author', combinedAuthors);
    },[authors]);


    const [selectedCourse, setSelectedCourse] = useState(paper ? paper.course : 'BASLT'); // Set initial value to paper.course
    useEffect(() => {   
        // Update paper.course when selectedCourse changes
        setData('course', selectedCourse);
    }, [selectedCourse]);

    const [isDragging, setIsDragging] = useState(false); // State to track dragging status


    const submit = async (e) => {
        e.preventDefault();
        
        if (paper) {
            patch(route('papers.update', paper.id), {
                preserveScroll: true
            });
        } else {
            post(route('papers.store'), {
                preserveScroll: true
            });
        }
    };
    
    return (
        <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-20 space-y-4 md:space-y-0 md:space-x-10">
            <section className={`bg-white p-4 md:p-10 ${className}`} style={{ width: "100%" }}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900" style={{ fontSize: '20px', fontWeight:'bolder' }}>Research Paper Information</h2>
                    <p className="mt-1 text-sm text-gray-600" style={{ fontSize: '10px', }}>Update Research Paper here!</p>
                </header>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value="Title" style={{ fontSize: '12px' }} />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            style={{ fontSize: '10px', border: '1px solid #7B7B7B' }} // Added border rule
                        />
                    </div>
                    <div>
                        <h1>Course Selection</h1>
                        <CourseDropdown onChange={handleCourseChange} value={data.course} />
                    </div>


                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                            Author(s)
                        </label>
                        {authorInputs.map((input, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <TextInput
                                    className="mt-1 block w-full"
                                    value={authors[index]}
                                    onChange={(e) => handleAuthorChange(index, e.target.value)}
                                    style={{ fontSize: '10px', border: '1px solid #7B7B7B' }}
                                />
                                {index === authorInputs.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={addAuthorInput}
                                        className="p-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                    </div>


                    <div>
                        <InputLabel htmlFor="date_published" value="Date Published" style={{ fontSize: '12px' }} />
                        <TextInput
                            id="date_published"
                            className="mt-1 block w-full"
                            value={data.date_published}
                            onChange={(e) => setData('date_published', e.target.value)}
                            style={{ fontSize: '10px', border: '1px solid #7B7B7B' }} // Added border rule
                        />
                        <InputError className="mt-2" message={errors.date_published} />
                    </div>
                    <div>
                        <InputLabel htmlFor="abstract" value="Abstract" style={{ fontSize: '12px' }} />
                        <TextInput
                            id="abstract"
                            type="textarea" 
                            className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md overflow-y-auto"
                            value={data.abstract} 
                            onChange={(e) => setData({ ...data, abstract: e.target.value })}
                            style={{ fontSize: '10px', border: '1px solid #7B7B7B', resize: 'none' }} // Removed resizing
                        />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton style={{ backgroundColor: '#831B1C', fontSize: '10px', textTransform: 'capitalize' }} disabled={processing}>Save Changes</PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </section>
            <div 
                className="bg-white p-4 md:p-6 mt-5" 
                style={{ width: "100%", maxWidth: "500px", height: "400px", backgroundColor: '#831B1C' ,marginTop:"50px" }}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) setData('file', file);
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
                <div className={`rounded-lg shadow flex items-center justify-center flex-col ${isDragging ? 'border-blue-500' : 'border-white'}`} style={{ backgroundColor: 'transparent', borderColor: 'white', borderWidth: '2px', borderStyle: 'dashed', width: "100%", height: "100%" }}>
                    {/* Upload box */}
                    <img src={uploadBoxImage} alt="Upload Box" style={{ maxWidth: '250px', height: 'auto' }} />
                    {/* Browse button */}
                    <div className="mt-2">
                        <InputLabel htmlFor="file" value="" style={{ fontSize: '10px' }} />
                        <label htmlFor="file" className="cursor-pointer">
                            <img src={browseButtonImage} alt="Browse Button" style={{ maxWidth: '150px', height: 'auto'}} />
                            <input
                                id="file"
                                type="file"
                                className="hidden"
                                onChange={(e) => setData('file', e.target.files[0])}
                            />
                        </label>
                    </div>
                    {/* View File link */}
                    {data.file && (
                        <a href={data.file} target="_blank" rel="noopener noreferrer" className="mt-2">View File</a>
                    )}
                </div>
            </div>
        </div>
    );
}
