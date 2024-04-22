import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef ,useState } from 'react';


// Import the request_button.png and pdf_icon.png images
import requestButtonImg from '@/Components/request_button.png';
import pdfIconImg from '@/Components/pdf_icon.png';

export default function PaperDetails({user, paper, className = '' ,success}) {
    const { data, setData, post} = useForm({
        purpose: "" ,
        user_id: user.id,
        paper_id: paper.id,
    });

    const { name, email } = user;
    console.log(user)
    console.log(paper)

    const {title, date_published, author, abstract } = paper;
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
                        {author.join(' - ')}
                    </div>
                </div>
            </div>

            <div className="flex mt-4">
                <div className="w-7/12 pr-2">
                    <div className="bg-white p-4 rounded-md">
                        <div style={{ fontSize: '22px', color: '#831B1C' }}><br />&nbsp;&nbsp;Abstract:</div>
                        <div className="mt-1 block w-full p-2 border border-gray-300 rounded-md border border-white bg-white text-justify" style={{ minHeight: '20px', maxHeight: '300px', overflowY: 'hidden' }}>
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
                        {success &&(
                            <div className="bg-green-400 p-4 rounded-md relative">
                                {success}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md relative">
                        <button className="absolute top-0 right-0 m-2" onClick={handleCloseForm}>
                            {/* You can use any icon or text for the exit button */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Your form components here */}
                        <form onSubmit={submit}>
                            <div>
                                <label htmlFor="email">User ID:</label>
                                <input type="text" id="userid" value={data.user_id} disabled/>
                            </div>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" value={name} disabled/>
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} disabled/>
                            </div>
                            <div>
                                <label htmlFor="email">Paper ID:</label>
                                <input type="text" id="paperid" value={data.paper_id} disabled/>
                            </div>                            
                            <div>
                                <label htmlFor="email">Title:</label>
                                <input type="text" id="title" value={title} disabled/>
                            </div>
                            <div>
                                <label htmlFor="email">Purpose:</label>
                                <input type="text" id="purpose" value={data.purpose} onChange={(e) => setData('purpose', e.target.value)}/>
                            </div>
                            {/* Other form fields */}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
