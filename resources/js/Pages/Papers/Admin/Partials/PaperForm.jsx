import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

// Import the images using @/ alias
import uploadBoxImage from '@/Components/uploadbox.png'; // Import the upload box image
import browseButtonImage from '@/Components/browse_button.png'; // Import the browse button image

export default function PaperForm({ paper, className = '' }) {
    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
        title: paper ? paper.title : "",
        abstract: paper ? paper.abstract : "",
        author: paper ? paper.author : "", 
        date_published: paper ? paper.date_published : "",
        file: paper ? paper.file : null,
    });

    const [isDragging, setIsDragging] = useState(false); // State to track dragging status

    const submit = (e) => {
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
                        <InputLabel htmlFor="author" value="Author" style={{ fontSize: '12px' }} />
                        <TextInput
                            id="author"
                            className="mt-1 block w-full"
                            value={data.author}
                            onChange={(e) => setData('author', e.target.value)}
                            style={{ fontSize: '10px', border: '1px solid #7B7B7B' }} // Added border rule
                        />
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
