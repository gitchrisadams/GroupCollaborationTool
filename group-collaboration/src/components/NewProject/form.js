import React, {useState, useContext} from 'react'
import {FirebaseContext} from '../Firebase'
import {useHistory} from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

export default function() {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)

  const owner = firebase.auth.currentUser.uid
  const [name, setName] = useState("")
  const [type, setType] = useState("Open Source")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const validate = () => {
    return (
      name.length > 0 &&
      type.length > 0 &&
      description.length > 0
    )
  }

  const onSubmit = (event) => {
    event.preventDefault();

    firebase.createProject({owner, name, type, description})
      .then( () => history.push(ROUTES.LANDING) )
      .catch( error => setError(error) )
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="text"
          placeholder="project name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
            <option value="Open Source">Open Source</option>
            <option value="Private">Private</option>
          </select>
        <br/>
        <textarea
          cols="45"
          rows="10"
          placeholder="project description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br/>
        <input type="submit" value="Create" disabled={!validate()} />

        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}
