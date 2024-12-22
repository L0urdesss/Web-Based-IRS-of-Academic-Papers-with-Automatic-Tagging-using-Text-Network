import { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import noFile from '@/Components/nofile.png';
import Toast from '@/Components/Toast';
import ImageZoom from 'react-image-zoom';

export default function PaperDetails({ user, paper, className = '', success }) {
    const { data, setData, post } = useForm({
        purpose: "",
        user_id: user.id,
        paper_id: paper.id,
    });

    const { name, email } = user;
    const [course, setCourse] = useState('');
    const { title, date_published, author, abstract } = paper;
    const [pdfPages, setPdfPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // To track if the PDF is still loading

    const abstractContainerRef = useRef(null);

    useEffect(() => {
        if (abstractContainerRef.current) {
            const abstractHeight = abstractContainerRef.current.scrollHeight;
            abstractContainerRef.current.style.height = abstractHeight + 'px';
        }

        // Render PDF if there's a file
        if (paper.file) {
            renderPDF(paper.file);
        } else {
            setPdfPages([]); // Clear pdfPages if there's no file
            setIsLoading(false); // No file, stop loading state
        }
    }, [abstract, paper.file]);

    const renderPDF = async (url) => {
        try {
            setIsLoading(true); // Start loading the PDF
            const pdf = await pdfjsLib.getDocument(url).promise;
            const pages = [];
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: context, viewport }).promise;
                pages.push(canvas.toDataURL());
            }
            setPdfPages(pages);
            setIsLoading(false); // PDF rendered, stop loading state
        } catch (error) {
            console.error('Error rendering PDF:', error);
            setPdfPages([]); // In case of error, clear pages
            setIsLoading(false); // Stop loading state
        }
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
                <div className="w-full pr-2">
                    <div className="bg-white p-4 rounded-md">
                        <div style={{ fontSize: '22px', color: '#831B1C' }}><br />&nbsp;&nbsp;Abstract:</div>
                        <div className="mt-1 block w-full p-2 border border-gray-300 rounded-md border border-white bg-white text-justify" style={{ minHeight: '20px', maxHeight: 'auto', overflowY: 'hidden' }}>
                            <div style={{ borderTop: '1px solid #B8B8B8', margin: '10px 0' }}></div>
                            <p style={{ fontSize: '13px', lineHeight: '1.8' }}>{abstract}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Viewer below the abstract */}
            <div className="mt-6">
                <Toast />
                <div className="w-full h-auto relative mt-10">
                    {/* Full screen white background loading overlay without text */}
                    {isLoading && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'white',
                                zIndex: 10, // Ensure it covers everything
                            }}
                        />
                    )}

                    {/* Only show PDF or No File if not loading */}
                    {!isLoading && (pdfPages.length > 0 ? (
                        <>
                            {pdfPages.map((page, index) => (
                                <img
                                    key={index}
                                    src={page}
                                    alt={`Page ${index + 1}`}
                                    className="w-3/4 mx-auto mb-4"
                                    style={{
                                        border: '1px solid #ccc',
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                    }}
                                />
                            ))}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(255,255,255,0)',
                                    zIndex: 20,
                                }}
                            />
                        </>
                    ) : (
                        <img
                            src={noFile}
                            alt="No File Available"
                            className="mx-auto w-1/2 h-1/2 mb-4"
                            style={{ pointerEvents: 'none' }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
