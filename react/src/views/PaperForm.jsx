import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function PaperForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [paper, setPaper] = useState({
    id: null,
    title: '',
    author: '',
    abstract: '',
    file: '',
    date: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/papers/${id}`)
        .then(({data}) => {
          setLoading(false)
          setPaper(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (paper.id) {
      axiosClient.put(`/papers/${paper.id}`, paper)
        .then(() => {
          setNotification('Paper was successfully updated')
          navigate('/papers')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/papers', paper)
        .then(() => {
          setNotification('Paper was successfully created')
          navigate('/papers')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {paper.id && <h1>Update Paper: {paper.title}</h1>}
      {!paper.id && <h1>New Paper</h1>}
      <div>
        {loading && (
          <div>
            Loading...
          </div>
        )}
        {errors &&
          <div>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={paper.title} onChange={ev => setPaper({...paper, title: ev.target.value})} placeholder="Title"/>
            <input value={paper.author} onChange={ev => setPaper({...paper, author: ev.target.value})} placeholder="Author"/>
            <input value={paper.abstract} onChange={ev => setPaper({...paper, abstract: ev.target.value})} placeholder="Abstract"/>
            <input value={paper.file} onChange={ev => setPaper({...paper, file: ev.target.value})} placeholder="File"/>
            <input type="date" value={paper.date} onChange={ev => setPaper({...paper, date: ev.target.value})} placeholder="Date"/>

            <button>Save</button>
          </form>
        )}
      </div>
    </>
  )
}
