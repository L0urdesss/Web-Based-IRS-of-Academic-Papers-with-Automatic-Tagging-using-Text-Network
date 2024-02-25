import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Papers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getPapers();
  }, []);

  const onDeleteClick = (paper) => {
    if (!window.confirm("Are you sure you want to delete this paper\nTitle: " + paper.title + "?")) {
      return;
    }
    axiosClient.delete(`/papers/${paper.id}`).then(() => {
      setNotification("User was successfully deleted");
      getPapers();
    });
  };

  const getPapers = (url = "/papers") => {
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setPapers(data.data);
        setNextPageUrl(data.links.next);
        setPrevPageUrl(data.links.prev);
        
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      setLoading(true);
      axiosClient
        .get(nextPageUrl)
        .then(({ data }) => {
          setLoading(false);
          setPapers(data.data);
          setNextPageUrl(data.links.next);
          setPrevPageUrl(data.links.prev);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      setLoading(true);
      axiosClient
        .get(prevPageUrl)
        .then(({ data }) => {
          setLoading(false);
          setPapers(data.data);
          setNextPageUrl(data.links.next);
          setPrevPageUrl(data.links.prev);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div>
        <h1>Papers</h1>
        <Link to="/papers/new">
          Add new
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Abstract</th>
              <th>File</th>
              <th>date</th>
              <th>created_at</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="7">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {papers.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.title}</td>
                  <td>{u.author}</td>
                  <td>{u.abstract}</td>
                  <td>{u.file}</td>
                  <td>{new Date(u.date).getFullYear()}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link to={"/papers/" + u.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button onClick={(ev) => onDeleteClick(u)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div>
        {!loading && prevPageUrl && (
          <button onClick={handlePrevPage}>
            Previous Page
          </button>
        )}
        {!loading && nextPageUrl && (
          <button onClick={handleNextPage}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}
