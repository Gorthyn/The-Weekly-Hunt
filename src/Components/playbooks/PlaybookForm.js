import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./form.css"

const localHuntUser = localStorage.getItem("hunt_user")
const huntUserObject = JSON.parse(localHuntUser)

export const PlaybookForm = () => {
  const [playbooks, setPlaybook] = useState([])
  const [gear, setGear] = useState([])
  const [selectedGear, setSelectedGear] = useState([])
  const [selectedPlaybook, setSelectedPlaybook] = useState(null)
  const [name, setName] = useState("")
  const [selectedRating, setSelectedRating] = useState(null)
  const [selectedMoves, setSelectedMoves] = useState([])
  const [description, setDescription] = useState("")
  const [chosenForm, setChosenForm] = useState([])
  const [chosenBusinessEnd, setChosenBusinessEnd] = useState([])
  const [chosenMaterial, setChosenMaterial] = useState([])
  const [selectedSpecialWeapon, setSelectedSpecialWeapon] = useState({ form: null, businessEnd: [], material: null })
  const [characterHistory, setCharacterHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8088/playbooks?_sort=name&_embed=moves&_embed=ratings&_embed=history`)
        .then((res) => res.json()),
      fetch(`http://localhost:8088/gear`)
        .then((res) => res.json()),
      fetch(`http://localhost:8088/chosenForm`)
        .then((res) => res.json()),
      fetch(`http://localhost:8088/chosenBusinessEnd`)
        .then((res) => res.json()),
      fetch(`http://localhost:8088/chosenMaterial`)
        .then((res) => res.json()),
    ])
      .then(([playbookArray, gearArray, chosenFormArray, chosenBusinessEndArray, chosenMaterialArray]) => {
        setPlaybook(playbookArray)
        setGear(gearArray)
        setChosenForm(chosenFormArray)
        setChosenBusinessEnd(chosenBusinessEndArray)
        setChosenMaterial(chosenMaterialArray)
      })
  }, [])

  const handlePlaybookClick = (id) => {
    const selectedPlaybook = playbooks.find((playbook) => playbook.id === id)
    setSelectedPlaybook(selectedPlaybook)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleRatingClick = (rating) => {
    setSelectedRating(rating)
  }

  const handleMoveChange = (move) => {
    if (selectedMoves.includes(move)) {
      setSelectedMoves(selectedMoves.filter((m) => m !== move))
    } else {
      setSelectedMoves([...selectedMoves, move])
    }
  }

  const handleGearChange = (gearItem) => {
    if (selectedGear.includes(gearItem)) {
      setSelectedGear(selectedGear.filter((g) => g !== gearItem))
    } else {
      if (selectedGear.length < selectedPlaybook.gear_slots) {
        setSelectedGear([...selectedGear, gearItem])
      } else {
        alert(`You can only select ${selectedPlaybook.gear_slots} pieces of gear.`)
      }
    }
  }
  
  const handleFormChange = (form) => {
    setSelectedSpecialWeapon({ ...selectedSpecialWeapon, form })
  }
  
  const handleBusinessEndChange = (businessEnd) => {
    if (selectedSpecialWeapon.businessEnd.includes(businessEnd)) {
      setSelectedSpecialWeapon({
        ...selectedSpecialWeapon,
        businessEnd: selectedSpecialWeapon.businessEnd.filter((be) => be !== businessEnd),
      })
    } else {
      if (selectedSpecialWeapon.businessEnd.length < 3) {
        setSelectedSpecialWeapon({
          ...selectedSpecialWeapon,
          businessEnd: [...selectedSpecialWeapon.businessEnd, businessEnd],
        })
      } else {
        alert("You can only select 3 business ends.")
      }
    }
  }
  
  const handleMaterialChange = (material) => {
    setSelectedSpecialWeapon({ ...selectedSpecialWeapon, material })
  }  

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleHistoryInputChange = (historyId, event) => {
    const historyInputValue = event.target.value;
    setCharacterHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((h) => h.historyId !== historyId);
      updatedHistory.push({ historyId, characterName: historyInputValue });
      return updatedHistory;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
  
    const requiredMoves = selectedPlaybook.moves.filter((move) => move.isRequired)
    const hasAllRequiredMoves = requiredMoves.every((move) => selectedMoves.includes(move))
  
    if (!hasAllRequiredMoves) {
      alert("You must choose all required moves.")
      return
    }
  
    const characterData = {
      userId: huntUserObject.id,
      name,
      playbookId: selectedPlaybook.id,
      ratingId: selectedRating.id,
      description,
    }
  
    fetch("http://localhost:8088/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create character")
        }
        return response.json()
      })
      .then((createdCharacter) => {
        const characterMovesPromises = selectedMoves.map((move) => {
          return fetch("http://localhost:8088/characterMoves", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              characterId: createdCharacter.id,
              moveId: move.id,
            }),
          })
        })
  
        const characterGearPromises = selectedGear.map((gearItem) => {
          return fetch("http://localhost:8088/characterGear", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              characterId: createdCharacter.id,
              gearId: gearItem.id,
            }),
          })
        })
  
        return Promise.all([...characterMovesPromises, ...characterGearPromises])
        .then(() => {
          const characterHistoryPromises = characterHistory.map((historyItem) => {
            return fetch("http://localhost:8088/characterHistory", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                characterId: createdCharacter.id,
                historyId: historyItem.historyId,
                characterName: historyItem.characterName,
              }),
            });
          });
          return Promise.all(characterHistoryPromises);
        })
        .then(() => {
          if (selectedPlaybook.id === 3) { // Check if the character is a Chosen
            const specialWeaponData = {
              characterId: createdCharacter.id,
              formId: selectedSpecialWeapon.form.id,
              formHarm: selectedSpecialWeapon.form.harm,
              materialId: selectedSpecialWeapon.material.id,
              materialHarm: selectedSpecialWeapon.material.harm,
            };
            
            selectedSpecialWeapon.businessEnd.forEach((businessEnd, index) => {
              specialWeaponData[`businessEndId${index + 1}`] = businessEnd.id;
              specialWeaponData[`businessEndHarm${index + 1}`] = businessEnd.harm;
            });
            
            return fetch("http://localhost:8088/chosenWeapons", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(specialWeaponData),
            })
          }
        })
        
      })
      .then(() => {
        alert("Character created successfully!")
        navigate("/characterLibrary")
      })
  }
  

  return (
    <form className="form__container">
      {!selectedPlaybook && (
        <>
          <h2>Select a playbook:</h2>
          <div className="playbook-container">
            {playbooks.map((playbook) => (
              <div className="playbook__card" key={playbook.id}>
                <input
                  type="radio"
                  id={`playbook-${playbook.id}`}
                  name="playbook"
                  value={playbook.id}
                  onChange={() => handlePlaybookClick(playbook.id)}
                  style={{ display: 'none' }}
                />
                <label htmlFor={`playbook-${playbook.id}`}>
                <span className="playbook-name">{playbook.name}</span>
                </label>
                <p>{playbook.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {selectedPlaybook && (
        <>
          <h2>Create {selectedPlaybook.name} character:</h2>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <div className="columns">
            <div className="column">
              <h3>Ratings:</h3>
              {selectedPlaybook.ratings.map((rating) => (
                <div key={`rating-${rating.id}`}>
                  <input
                    type="radio"
                    id={`rating-${rating.id}`}
                    name="rating"
                    value={rating.id}
                    onChange={() => handleRatingClick(rating)}
                  />
                  <label htmlFor={`rating-${rating.id}`}>
                    Charm: {rating.charm}, Cool: {rating.cool}, Sharp: {rating.sharp}, Tough: {rating.tough}, Weird: {rating.weird}
                  </label>
                </div>
              ))}
            </div>
            {selectedPlaybook && gear.some((gearItem) => gearItem.playbookId === selectedPlaybook.id) && (
                  <div className="column">
                    <h3>
                      Choose {selectedPlaybook.gear_slots} piece(s) of gear:
                    </h3>
                    {gear
                      .filter((gearItem) => gearItem.playbookId === selectedPlaybook.id)
                      .map((gearItem) => (
                        <div key={`gear-${gearItem.id}`}>
                          <input
                            type="checkbox"
                            id={`gear-${gearItem.id}`}
                            onChange={() => handleGearChange(gearItem)}
                          />
                          <label htmlFor={`gear-${gearItem.id}`}>
                            {gearItem.name}: ({gearItem.harm} Harm)
                          </label>
                        </div>
                      ))}
                  </div>
                )}
                {selectedPlaybook && selectedPlaybook.id === 3 && (
                  <div className="column">
                    <h3>Design your weapon by choosing a form, three business-end options, and a material.</h3>
                      <div className="special-weapon-container">
                        <div className="special-weapon-section">
                    <h4>Form:</h4>
                    {chosenForm.map((form) => (
                      <div key={`form-${form.id}`}>
                        <input
                          type="radio"
                          id={`form-${form.id}`}
                          name="form"
                          value={form.id}
                          onChange={() => handleFormChange(form)}
                        />
                        <label htmlFor={`form-${form.id}`}>
                          {form.name} ({form.harm} Harm)
                        </label>
                      </div>
                    ))}
                    </div>
                    <div className="special-weapon-section">
                    <h4>Business End:</h4>
                    {chosenBusinessEnd.map((businessEnd) => (
                      <div key={`businessEnd-${businessEnd.id}`}>
                        <input
                          type="checkbox"
                          id={`businessEnd-${businessEnd.id}`}
                          name="businessEnd"
                          value={businessEnd.id}
                          onChange={() => handleBusinessEndChange(businessEnd)}
                        />
                        <label htmlFor={`businessEnd-${businessEnd.id}`}>
                          {businessEnd.name} ({businessEnd.harm} Harm)
                        </label>
                      </div>
                    ))}
                    </div>
                    <div className="special-weapon-section">
                    <h4>Material:</h4>
                    {chosenMaterial.map((material) => (
                      <div key={`material-${material.id}`}>
                        <input
                          type="radio"
                          id={`material-${material.id}`}
                          name="material"
                          value={material.id}
                          onChange={() => handleMaterialChange(material)}
                        />
                        <label htmlFor={`material-${material.id}`}>
                          {material.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  </div>
                  </div>
                )}
            </div>
          <br />
          <h3>Moves:</h3>
          {selectedPlaybook.required_move_slots > 0 && (
            <>
              <p>
                You get all the basic moves and {selectedPlaybook.total_move_slots}{" "}
                {selectedPlaybook.name} moves. As {selectedPlaybook.name}, you must take the
                following move(s):
              </p>
              {selectedPlaybook.moves
                .filter((move) => move.isRequired)
                .map((move) => (
                  <div key={`move-${move.id}`}>
                    <input
                      type="checkbox"
                      id={`move-${move.id}`}
                      onChange={() => handleMoveChange(move)}
                      checked={selectedMoves.includes(move)}
                    />
                    <label htmlFor={`move-${move.id}`}>
                      {move.name}: {move.description}
                    </label>
                  </div>
                ))}
            </>
          )}
          <h3>
            Choose {selectedPlaybook.optional_move_slots} move(s) from the list below:
          </h3>
          {selectedPlaybook.moves
            .filter((move) => !move.isRequired)
            .map((move) => (
              <div key={`move-${move.id}`}>
                <input
                  type="checkbox"
                  id={`move-${move.id}`}
                  onChange={() => handleMoveChange(move)}
                />
                <label htmlFor={`move-${move.id}`}>
                  {move.name}: {move.description}
                </label>
              </div>
            ))}
          <br />
          <h3>Describe what your hunter looks like.</h3>
          <label>
            Description:
            <textarea type="text" value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          <>
            {selectedPlaybook && (
              <div className="history">
                <h3>History - pick one for each of the other hunters:</h3>
                {selectedPlaybook?.history?.map((historyItem) => (
                  <div key={`history-${historyItem.id}`}>
                    <input
                      type="text"
                      placeholder="Hunter Name"
                      id={`history-${historyItem.id}`}
                      onChange={(event) => handleHistoryInputChange(historyItem.id, event)}
                    />
                    <label htmlFor={`history-${historyItem.id}`}>{historyItem.description}</label>
                  </div>
                ))}
              </div>
            )}
          </>
          <button type="button" className="submit__button" onClick={handleSubmit}>Create Character</button>        
          </>
      )}
    </form>
  )
}