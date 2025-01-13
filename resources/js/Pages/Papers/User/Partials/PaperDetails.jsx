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

  const {
    title,
    date_published,
    author,
    abstract,
    course,
    main_topic,
    subtopic,
  } = paper;
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

    const handleKeyDown = (e) => {
      // Block copy-paste keyboard shortcuts
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "v")) ||
        e.key === "Control"
      ) {
        e.preventDefault();
      }

      if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
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

      const container = document.getElementById("pdf-container");
      const containerWidth = container.offsetWidth;

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
      {/* Panel 1 */}
      <div className="bg-white p-10 rounded-md mx-auto mt-6 max-w-4xl">
        <div className="mt-1 block w-full border-none text-3xl font-bold text-red-700">
          {title}
        </div>
        <div className="mt-2 flex items-center text-sm">
          {course} • {date_published}
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-800">Author/s</p>
          <div
            className="mt-1 block w-full border-none text-sm font-bold text-gray-800"
            onContextMenu={preventDefaultActions}
            onCopy={preventDefaultActions}
            onPaste={preventDefaultActions}
            style={{ userSelect: "none" }} // Prevent text selection
          >
            {author}
          </div>
        </div>
        <div className="mt-4 text-sm">
          <div>
            <strong>Main Topic:</strong> {main_topic || "No main topic"}
          </div>
          <div>
            <strong>Subtopic:</strong> {subtopic || "No subtopic"}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4 italic">
          {paper.key_terms && (
            <span>
              <strong>Key Terms:</strong>{" "}
              {paper.key_terms
                .split(",")
                .map((term) => term.trim())
                .join(", ")}
            </span>
          )}
        </p>
      </div>

      {/* Abstract Panel */}
      <div className="bg-white p-10 rounded-md mx-auto mt-6 max-w-4xl">
        <div className="text-3xl font-bold text-red-700 mb-4">Abstract:</div>
        <div
          className="block w-full p-4 border-none rounded-md bg-white text-justify"
          style={{ minHeight: "200px", userSelect: "none" }} // Disable text selection in abstract
          onContextMenu={preventDefaultActions}
          onCopy={preventDefaultActions}
          onPaste={preventDefaultActions}
        >
          <p className="text-sm leading-7">{abstract}</p>
        </div>
      </div>

      <div className="mt-6">
        <Toast />
        <div id="pdf-container" className="w-full max-w-4xl mx-auto">
          {isLoading ? (
            <div className="absolute top-0 left-0 w-full h-full bg-white z-10"></div>
          ) : renderedPage ? (
            <div>
              <img
                src={renderedPage}
                alt={`Page ${currentPage}`}
                className="w-full mx-auto mb-4 border border-gray-300"
                onContextMenu={preventDefaultActions}
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
