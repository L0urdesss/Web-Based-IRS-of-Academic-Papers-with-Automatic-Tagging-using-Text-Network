import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

// Import the request_button.png, pdf_icon.png, and x_button.png images
import requestButtonImg from '@/Components/request_button.png';
import pdfIconImg from '@/Components/pdf_icon.png';
import exitButtonImg from '@/Components/x_button.png';

export default function PaperDetails({ user, paper, className = '', success }) {
    const { data, setData, post } = useForm({
        purpose: "",
        user_id: user.id,
        paper_id: paper.id,
    });

    const { name, email } = user;
    console.log(user)
    console.log(paper)

    const { title, date_published, author, abstract } = paper;
    const [showForm, setShowForm] = useState(false);

    const abstractContainerRef = useRef(null);
    const fileContainerRef = useRef(null);

    useEffect(() => {
        if (abstractContainerRef.current) {
            const abstractHeight = abstractContainerRef.current.scrollHeight;
            abstractContainerRef.current.style.height = abstractHeight + 'px';
        }
    }, [abstract]);

    const submit = (e) => {
        setShowForm(false);
        e.preventDefault();
        post(route('userrequest.store'), {
            preserveScroll: true
        });
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleRequestButtonClick = () => {
        setShowForm(true);
        console.log("Shown")
    };

    return (
        <section className={className}>
            <div className="bg-white p-4 rounded-md">
                <div className="mt-1 block w-full border border-white shadow-white" style={{ fontSize: '25px', color: '#AF2429', fontWeight: 'bold' }}>
                    {title}
                </div>
                <div className="mt-1 flex items-center border border-white shadow-white" style={{ fontSize: '14px', minWidth: '200px' }}>
                    {date_published} • College of Science
                </div>
                <div>
                    <p className="ml-3 mt-3" style={{ fontSize: '12px', color: '#352D2D' }}>Author/s</p>
                    <div className="mt-1 block w-full border border-white shadow-white" style={{ color: '#352D2D', fontSize: '14px', fontWeight: 'bold' }}>
                        {author}
                    </div>
                </div>
            </div>

            <div className="flex mt-4">
                <div className="w-7/12 pr-2">
                    <div className="bg-white p-4 rounded-md">
                        <div style={{ fontSize: '22px', color: '#831B1C' }}><br />&nbsp;&nbsp;Abstract:</div>
                        <div className="mt-1 block w-full p-2 border border-gray-300 rounded-md border border-white bg-white text-justify" style={{ minHeight: '20px', maxHeight: 'auto', overflowY: 'hidden' }}>
                            <div style={{ borderTop: '1px solid #B8B8B8', margin: '10px 0' }}></div>
                            <p style={{ fontSize: '13px', lineHeight: '1.8' }}>{abstract}</p>
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
                            {paper.file ? (
                                <a href={paper.file} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={pdfIconImg}
                                        alt="PDF Icon"
                                        className="block mx-auto w-15 h-20 mb-4"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </a>
                            ) : (
                                <p>No file</p>
                            )}

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
                                onClick={handleRequestButtonClick}
                            />
                        </div>
                        {success && (
                            <div className="bg-green-400 p-4 rounded-md relative">
                                {success}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-md relative" style={{ width: '400px', minHeight: '400px', maxHeight: '80vh', overflowY: 'auto', border: '1px solid #c46064' }}>
                <button className="absolute right-0 top-0 p-2" onClick={handleCloseForm}>
    {/* Replace the SVG with the image */}
    <img src={exitButtonImg} alt="Exit Button" className="h-3 w-3" />
</button>
                        <h2 className="text-center text-lg font-semibold mb-4 mt-2" style={{ backgroundColor: '#AF2429', color: 'white', padding: '8px', borderRadius: '5px' }}>Request Form</h2>
                        {/* Your form components here */}
                        <form onSubmit={submit}>
                            <div>
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', fontSize: '10px' }}>
    <label htmlFor="name" style={{ marginRight: '10px' }}>Name:</label>
    <input type="text" id="name" value={name} disabled className="rounded-md border border-gray-300 p-1" style={{ width: '100%', fontSize: '10px' }} />
</div>
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', fontSize: '10px' }}>
    <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
    <input type="email" id="email" value={email} disabled className="rounded-md border border-gray-300 p-1" style={{ width: '100%', fontSize: '10px' }} />
</div>
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', fontSize: '10px' }}>
    <label htmlFor="title" style={{ marginRight: '10px' }}>Title:</label>
    <input type="text" id="title" value={title} disabled className="rounded-md border border-gray-300 p-1" style={{ width: '100%', fontSize: '10px' }} />
</div>


                                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                    <label htmlFor="purpose" style={{ fontSize: '14px' }}>Purpose:<br /></label>
                                    <textarea
                                        id="purpose"
                                        value={data.purpose}
                                        onChange={(e) => setData('purpose', e.target.value)}
                                        className="rounded-md border border-gray-300 p-1 mt-1"
                                        style={{ height: '150px', width: '100%', resize: 'none', fontSize: '12px' }}
                                    />
                                </div>
                                {/* Other form fields */}
                            </div>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#af2429',
                                    color: 'white',
                                    borderRadius: '10px',
                                    padding: '5px 5px',
                                    fontSize: '12px',
                                    marginTop: '10px', // Adjust as needed
                                    width: '15%', // Adjust as needed
                                    float: 'right' // Move the button to the right
                                }}
                                onClick={submit}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
