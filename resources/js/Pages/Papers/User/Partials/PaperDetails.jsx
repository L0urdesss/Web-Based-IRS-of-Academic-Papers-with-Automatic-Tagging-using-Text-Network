import { useState, useEffect, useRef } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import RequestForm from '@/Components/RequestForm'; // Adjust the path as needed
// Import the request_button.png, pdf_icon.png, and x_button.png images
import requestButtonImg from '@/Components/request_button.png';
import pdfIconImg from '@/Components/view file.png';
import exitButtonImg from '@/Components/x_button.png';
import noFile from '@/Components/nofile.png'; // Import the logo image
import pendingFile from '@/Components/pending file.png'; 
import Toast from '@/Components/Toast';

export default function PaperDetails({ user, paper, className = '', success , status}) {
    const { data, setData, post } = useForm({
        user:user,
        purpose: "",
        user_id: user.id,
        paper_id: paper.id,
    });
    console.log(user);
    console.log(paper);

    console.log(status);


    const { name, email } = user;
    const { title, date_published, author, abstract, course } = paper;
    const [showForm, setShowForm] = useState(false);

    const abstractContainerRef = useRef(null);

    useEffect(() => {
        if (abstractContainerRef.current) {
            const abstractHeight = abstractContainerRef.current.scrollHeight;
            abstractContainerRef.current.style.height = abstractHeight + 'px';
        }
    }, [abstract]);

    // useEffect(() => {
    //     router.get('/papers/{paper}', {
    //         user_id: user.id,
    //         paper_id: paper.id,
    //       },{            
    //         onSuccess: (data) => {
    //         setStatus(data);
    //         console.log(status);
    //     }})}, 
    // []);

    const handleSubmit = (action) => {
        if (action === 'upload') {
            setShowForm(false);
            post(route('userrequest.store'), {
                preserveScroll: true
            });
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleRequestButtonClick = () => {
        setShowForm(true);
    };

    return (
        <section className={className}>
            <Toast/>
            <div className="bg-white p-4 rounded-md">
                <div className="mt-1 block w-full border border-white shadow-white" style={{ fontSize: '25px', color: '#AF2429', fontWeight: 'bold' }}>
                    {title}
                </div>
                <div className="mt-1 ml-1 flex items-center border border-white shadow-white" style={{ fontSize: '14px', minWidth: '200px' }}>
                    {date_published} • College of Science • {course}
                </div>
                <div>
                    <p className="ml-1 mt-3" style={{ fontSize: '12px', color: '#352D2D' }}>Author/s</p>
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
                        {paper.file ? (
                            <div>
                                {status === 'approve' ? (
                                    <div>
                                        <a href={paper.file} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={pdfIconImg}
                                                alt="PDF Icon"
                                                className=" mx-auto w-1/2 h-1/2 mb-4"
                                                style={{ pointerEvents: 'none' }}
                                            />
                                        </a>
                                    </div>
                                ) : (
                                    <div>

                                    <img
                                        src={pendingFile}
                                        alt="Request Button"
                                        className="mx-auto w-1/2 h-1/2"
                                        onClick={handleRequestButtonClick}
                                    />
                                    </div>
                                )}


                            </div>
                        ) : (
                            <img
                            src={noFile}
                            alt="PDF Icon"
                            className="mx-auto w-1/2 h-1/2 mb-4"
                            style={{ pointerEvents: 'none' }}
                        />
                        )}
                    </div>
                </div>
            </div>
            {showForm && (
                <RequestForm
                    user={user}
                    data={data}
                    setData={setData}
                    submit={handleSubmit}
                    handleCloseForm={handleCloseForm}
                    title={title}
                />
            )}
        </section>
    );
}