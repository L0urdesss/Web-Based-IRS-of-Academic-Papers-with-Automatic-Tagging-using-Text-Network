import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user \nTitle: " + user.name + "?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification("User was successfully deleted");
      getUsers();
    });
  };

  const getUsers = (url = "/users") => {
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
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
          setUsers(data.data);
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
          setUsers(data.data);
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
        <h1>Users</h1>
        <Link to="/users/new">
          Add new
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link to={"/users/" + u.id}>
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
