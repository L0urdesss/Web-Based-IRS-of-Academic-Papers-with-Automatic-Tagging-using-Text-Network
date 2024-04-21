import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';


// Import the request_button.png and pdf_icon.png images
import requestButtonImg from '@/Components/request_button.png';
import pdfIconImg from '@/Components/pdf_icon.png';

export default function PaperDetails({ paper, className = '' }) {
    const { data, setData } = useForm({
        title: paper ? paper.title : "",
        abstract: paper ? paper.abstract : "",
        author: paper ? paper.author : "", 
        date_published: paper ? paper.date_published : "",
        file: paper ? paper.file : "",
    });

    const abstractContainerRef = useRef(null);
    const fileContainerRef = useRef(null);

    useEffect(() => {
        if (abstractContainerRef.current) {
            const abstractHeight = abstractContainerRef.current.scrollHeight;
            abstractContainerRef.current.style.height = abstractHeight + 'px';
        }
    }, [data.abstract]);

    return (
        <section className={className}>
            <div className="bg-white p-4 rounded-md">
                <TextInput
                    className="mt-1 block w-full border border-white shadow-white"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    disabled
                    style={{ fontSize: '25px', color: '#AF2429', fontWeight: 'bold' }} // Apply bold font weight here
                />

<TextInput
    className="mt-1 flex items-center border border-white shadow-white"
    value={data.date_published + ' • College of Science'}
    onChange={(e) => setData('author', e.target.value)} // Assuming you want to update the author field
    disabled
    style={{ fontSize: '14px', minWidth: '200px' }} // Adjust the width as needed
/>        
<div>
    <p className="ml-3 mt-3" style={{ fontSize: '12px', color: '#352D2D' }}>Author/s</p>
    <TextInput
        className="mt-1 block w-full border border-white shadow-white"
        value={data.author}
        onChange={(e) => setData('author', e.target.value)}
        disabled
        style={{ color: '#352D2D', fontSize:'14px', fontWeight:'bold' }} // Apply text color here
    />
</div>



            </div>

            <div className="flex mt-4">
                <div className="w-7/12 pr-2">
                    <div className="bg-white p-4 rounded-md">
                        <InputLabel htmlFor="abstract" value={<span style={{ fontSize: '22px', color: '#831B1C' }}><br />&nbsp;&nbsp;Abstract:</span>} />
                        <div 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md border border-white bg-white text-justify" 
                            ref={abstractContainerRef}
                            style={{ minHeight: '20px', maxHeight: '300px', overflowY: 'hidden' }}
                        >
                            {/* Add the line here */}
                            <div style={{ borderTop: '1px solid #B8B8B8', margin: '10px 0' }}></div>
                            <p style={{ fontSize: '13px', lineHeight: '1.8' }}>{data.abstract}</p>
                        </div>
                    </div>
                </div>

                <div className="w-5/12 pl-2 mt-4 ml-6">
                    <div className="bg-white p-4 rounded-md">
                        <div 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md border border-white bg-white text-center" 
                            ref={fileContainerRef}
                            style={{ minHeight: '200px', maxHeight: '300px', overflowY: 'hidden' }}
                        >
                            {/* Image before the text */}
                            <img 
                                src={pdfIconImg} 
                                alt="PDF Icon" 
                                className="block mx-auto w-15 h-20 mb-4" 
                                style={{ pointerEvents: 'none' }} 
                            />

                            {/* Text describing the file */}
                            <p className="text-sm mt-2 mb-4" style={{ fontSize: '10px', lineHeight: '1.4' }}>
                                To read the full-text of this research,<br></br>
                                you can request a copy directly<br></br> from the authors.
                            </p>

                            {/* Replace the PDF icon with the request_button.png image */}
                            <img 
                                src={requestButtonImg} 
                                alt="Request Button" 
                                className="block mx-auto w-15 h-10" 
                                style={{ pointerEvents: 'none' }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
