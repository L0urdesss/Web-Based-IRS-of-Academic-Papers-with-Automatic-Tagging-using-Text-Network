import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])


  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link> &nbsp;
        <Link to="/users">Users</Link> &nbsp;
        <Link to="/papers">Papers</Link>
      </aside>
      <div>
        <header>

          <div>
          Welcome {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} href="#">Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div>
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
