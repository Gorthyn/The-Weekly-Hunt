import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Character.css"

export const CharacterLibrary = ({ userId }) => {
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8088/characters?_expand=playbook&_expand=user`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data)
      })
  }, [userId])

  const localHuntUser = localStorage.getItem("hunt_user")
  const huntUserObject = JSON.parse(localHuntUser)

  return (
    <div className="character__grid">
      <h1>My Hunters</h1>
      {characters.map((character) =>
        huntUserObject.id === character.userId ? (
          <button
          key={character.id}
          onClick={() => navigate(`/characterlibrary/${character.id}`)}
          className="characteSelect__button"
        >
          <div className="character__card">
            <h2>{character.name}</h2>
            <h3>{character?.playbook?.name}</h3>
          </div>
        </button>
        ) : (
          ""
        )
      )}
    </div>
  )
}
