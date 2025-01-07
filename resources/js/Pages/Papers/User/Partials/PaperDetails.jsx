import { useState, useEffect, useRef } from "react";
import { useForm } from "@inertiajs/react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import noFile from "@/Components/nofile.png";
import Toast from "@/Components/Toast";

export default function PaperDetails({ user, paper, className = "", success }) {
  const { data, setData, post } = useForm({
    purpose: "",
    user_id: user.id,
    paper_id: paper.id,
  });

  const { title, date_published, author, abstract } = paper;
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [renderedPage, setRenderedPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const abstractContainerRef = useRef(null);

  useEffect(() => {
    if (abstractContainerRef.current) {
      const abstractHeight = abstractContainerRef.current.scrollHeight;
      abstractContainerRef.current.style.height = `${abstractHeight}px`;
    }

    if (paper.file) {
      loadPDF(paper.file);
    } else {
      setIsLoading(false);
    }
  }, [abstract, paper.file]);

  useEffect(() => {
    const handleResize = () => {
      if (pdf) {
        renderPage(pdf, currentPage); // Re-render on resize
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pdf, currentPage]);

  const loadPDF = async (url) => {
    try {
      setIsLoading(true);
      const loadedPdf = await pdfjsLib.getDocument(url).promise;
      setPdf(loadedPdf);
      setNumPages(loadedPdf.numPages);
      renderPage(loadedPdf, 1);
    } catch (error) {
      console.error("Error loading PDF:", error);
      setIsLoading(false);
    }
  };

  const renderPage = async (pdfDoc, pageNumber) => {
    try {
      const page = await pdfDoc.getPage(pageNumber);

      // Get the container width
      const container = document.getElementById("pdf-container");
      const containerWidth = container.offsetWidth;

      // Scale viewport based on container width
      const viewport = page.getViewport({
        scale: containerWidth / page.getViewport({ scale: 1 }).width,
      });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      setRenderedPage(canvas.toDataURL());
      setIsLoading(false);
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      renderPage(pdf, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      renderPage(pdf, prevPage);
    }
  };

  const preventDefaultActions = (e) => {
    e.preventDefault();
  };

  return (
    <section className={`bg-gray-100 min-h-screen ${className}`}>
      <div className="bg-white p-4 rounded-md ml-2 mr-2 mt-2 max-auto">
        <div className="mt-1 block w-11/12 border-none text-xl font-bold text-red-700">
          {title}
        </div>
        <div className="mt-1 flex items-center text-sm min-w-[200px]">
          {date_published} • College of Science
        </div>
        <div>
          <p className="ml-3 mt-3 text-xs text-gray-800">Author/s</p>
          <div
            className="mt-1 block w-full border-none text-sm font-bold text-gray-800"
            onContextMenu={preventDefaultActions} // Disable right-click
            onCopy={preventDefaultActions} // Disable copy
            onPaste={preventDefaultActions} // Disable paste
          >
            {author}
          </div>
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-full pr-2 ml-2">
          <div className="bg-white p-4 rounded-md mx-auto">
            <div className="text-lg text-red-800">
              <br />
              &nbsp;&nbsp;Abstract:
            </div>
            <div
              className="mt-1 block w-full p-2 border-none rounded-md bg-white text-justify"
              style={{ minHeight: "20px" }}
              onContextMenu={preventDefaultActions} // Disable right-click
              onCopy={preventDefaultActions} // Disable copy
              onPaste={preventDefaultActions} // Disable paste
            >
              <div className="border-none my-2"></div>
              <p className="text-sm leading-7">{abstract}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Toast />
        <div id="pdf-container" className="w-full max-w-2xl mx-auto">
          {isLoading ? (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-10"></div>
          ) : renderedPage ? (
            <div>
              <img
                src={renderedPage}
                alt={`Page ${currentPage}`}
                className="w-full mx-auto mb-4 border border-gray-300"
                onContextMenu={preventDefaultActions} // Disable right-click
              />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="btn"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {numPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === numPages}
                  className="btn"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <img
              src={noFile}
              alt="No File Available"
              className="mx-auto w-1/2 h-1/2 mb-4"
            />
          )}
        </div>
      </div>
    </section>
  );
}
