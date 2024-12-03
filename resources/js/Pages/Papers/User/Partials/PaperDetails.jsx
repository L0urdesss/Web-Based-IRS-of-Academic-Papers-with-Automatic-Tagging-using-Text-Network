import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import RequestForm from '@/Components/RequestForm'; // Adjust the path as needed
import noFile from '@/Components/nofile.png';
import Toast from '@/Components/Toast';

export default function PaperDetails({ user, paper, className = '' }) {
    const [showForm, setShowForm] = useState(false);
    const [pdfPages, setPdfPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // To track if the PDF is still loading

    useEffect(() => {
        if (paper.file) {
            renderPDF(paper.file);
        } else {
            setPdfPages([]); // Clear pdfPages if there's no file
            setIsLoading(false); // No file, stop loading state
        }

        // Add the contextmenu event listener
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);

        // Reset body overflow and remove contextmenu listener on unmount
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [paper.file]);

    const renderPDF = async (url) => {
        try {
            setIsLoading(true); // Start loading the PDF
            const pdf = await pdfjsLib.getDocument(url).promise;
            const pages = [];
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale: 4 });
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
            setPdfPages([]);
            setIsLoading(false); // In case of error, stop loading state
        }
    };

    return (
        <section
            className={`bg-[#f9f9f9] min-h-screen w-full ${className}`}
            style={{ overflow: 'hidden' }} // Ensure the full viewport is covered
        >
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
                    pdfPages.map((page, index) => (
                        <img
                            key={index}
                            src={page}
                            alt={`Page ${index + 1}`}
                            className="w-3/4 mx-auto mb-4" // Set width to 3/4 and center the image
                            style={{ border: '1px solid #ccc' }}
                        />
                    ))
                ) : (
                    <img
                        src={noFile}
                        alt="No File Available"
                        className="mx-auto w-1/2 h-1/2 mb-4"
                        style={{ pointerEvents: 'none' }}
                    />
                ))}
            </div>
            {showForm && (
                <RequestForm
                    user={user}
                    submit={() => setShowForm(false)}
                    handleCloseForm={() => setShowForm(false)}
                />
            )}
        </section>
    );
}
