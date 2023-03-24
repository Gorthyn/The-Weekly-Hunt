import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./Character.css"

export const CharacterDetails = () => {
  const [character, setCharacter] = useState([])
  const [moves, setMoves] = useState([])
  const [chosenWeaponDetails, setChosenWeaponDetails] = useState({})
  const [gear, setGear] = useState([])
  const [basicMoves, setBasicMoves] = useState([])
  const [luckSlots, setLuckSlots] = useState([])
  const [harmSlots, setHarmSlots] = useState([])
  const [experienceSlots, setExperienceSlots] = useState([])
  const [luckSpecial, setLuckSpecial] = useState('')
  const [characterHistory, setCharacterHistory] = useState('')
  const [historyDescription, setHistoryDescription] = useState('')
  const [improvements, setImprovements] = useState([])
  const [selectedImprovements, setSelectedImprovements] = useState([])
  const [newWeapon, setNewWeapon] = useState({ name: '', harm: '' })
  const [playbookId, setPlaybookId] = useState(null)
  const [savedImprovements, setSavedImprovements] = useState([])
  const [diceResult, setDiceResult] = useState(null)
  const [pendingChanges, setPendingChanges] = useState({ luck: [], harm: [], experience: [] })
  const [tempRatings, setTempRatings] = useState({
    charm: character?.rating?.charm || 0,
    cool: character?.rating?.cool || 0,
    sharp: character?.rating?.sharp || 0,
    tough: character?.rating?.tough || 0,
    weird: character?.rating?.weird || 0,
  })
  const { characterId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8088/characters?id=${characterId}&_expand=rating&_expand=playbook`)
      .then(response => response.json())
      .then(data => {
        const singleChar = data[0]
        setPlaybookId(singleChar.playbookId)
        setLuckSlots(singleChar.luckSlots || new Array(singleChar.playbook.luck_slots).fill(false))
        setHarmSlots(singleChar.harmSlots || new Array(singleChar.playbook.harm_slots).fill(false))
        setExperienceSlots(singleChar.experienceSlots || new Array(singleChar.playbook.experience_slots).fill(false))
        setLuckSpecial(singleChar.playbook.luck_special)
        setTempRatings({
          charm: singleChar.rating.charm,
          cool: singleChar.rating.cool,
          sharp: singleChar.rating.sharp,
          tough: singleChar.rating.tough,
          weird: singleChar.rating.weird,
        })
        return setCharacter(singleChar)
      })

    fetch(`http://localhost:8088/characterMoves?characterId=${characterId}&_expand=move`)
      .then(response => response.json())
      .then(data => {
        return setMoves(data.map(item => item.move))
      })

      fetch('http://localhost:8088/basicMoves')
      .then(response => response.json())
      .then(data => {
        setBasicMoves(data)
      })

      fetch(`http://localhost:8088/characterGear?characterId=${characterId}`)
      .then(response => response.json())
      .then(characterGearData => {
        const gearPromises = characterGearData.map(item =>
          fetch(`http://localhost:8088/gear/${item.gearId}`).then(response => response.json())
        )

        Promise.all(gearPromises).then(gearData => {
          setGear(gearData)
        })
      })

      fetch(`http://localhost:8088/characterHistory?characterId=${characterId}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setCharacterHistory(data[0])
          fetch(`http://localhost:8088/history/${data[0].historyId}`)
            .then((response) => response.json())
            .then((historyData) => {
              setHistoryDescription(historyData.description)
            })
        } else {
          setCharacterHistory('')
          setHistoryDescription('')
        }
      })
}, [characterId])

useEffect(() => {
  if (!playbookId) return

  fetch(`http://localhost:8088/improvements?playbookId=${playbookId}`)
    .then((response) => response.json())
    .then((improvementsData) => {
      setImprovements(improvementsData)
    })

    fetch(`http://localhost:8088/characterImprovements?characterId=${characterId}&_expand=improvement`)
    .then((response) => response.json())
    .then((data) => {
      setSavedImprovements(data.map((item) => item.improvement))
    })
  
}, [playbookId])


useEffect(() => {
  if (character.playbookId === 3) {
    fetch(`http://localhost:8088/chosenWeapons?characterId=${characterId}`)
      .then((response) => response.json())
      .then((data) => {
      const weapon = data[0]

      Promise.all([
        fetch(`http://localhost:8088/chosenForm?id=${weapon.formId}`).then((response) =>
          response.json(),
        ),
        fetch(`http://localhost:8088/chosenMaterial?id=${weapon.materialId}`).then((response) =>
          response.json(),
        ),
        fetch(`http://localhost:8088/chosenBusinessEnd?id=${weapon.businessEndId1}`).then((response) =>
          response.json(),
        ),
        fetch(`http://localhost:8088/chosenBusinessEnd?id=${weapon.businessEndId2}`).then((response) =>
          response.json(),
        ),
        fetch(`http://localhost:8088/chosenBusinessEnd?id=${weapon.businessEndId3}`)
          .then((response) => response.json(),
        ),
      ]).then(
        ([
          chosenForm,
          chosenMaterial,
          chosenBusinessEnd1,
          chosenBusinessEnd2,
          chosenBusinessEnd3,
        ]) => {
          setChosenWeaponDetails({
            form: chosenForm[0]?.name,
            material: chosenMaterial[0]?.name,
            businessEnd1: chosenBusinessEnd1[0]?.name,
            businessEnd2: chosenBusinessEnd2[0]?.name,
            businessEnd3: chosenBusinessEnd3[0]?.name,
            totalHarm:
              weapon.formHarm +
              weapon.businessEndHarm1 +
              weapon.businessEndHarm2 +
              weapon.businessEndHarm3,
          })
        },
      )
    })
  }
}, [character])

const updateCharacterSlots = async (updatedCharacter) => {
await fetch(`http://localhost:8088/characters/${characterId}`, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(updatedCharacter),
})
}

const handleImprovementChange = (index) => {
  if (savedImprovements.some((imp) => imp.id === improvements[index].id)) {
    return
  }

  const updatedSelectedImprovements = [...selectedImprovements]
  updatedSelectedImprovements[index] = !updatedSelectedImprovements[index]
  setSelectedImprovements(updatedSelectedImprovements)
}


// const handleRatingChange = (event, ratingName) => {
//   const newRatingValue = parseInt(event.target.value, 10)
//   setTempRatings({
//     ...tempRatings,
//     [ratingName]: newRatingValue,
//   })
// }

// const updateCharacterRating = async (characterId, updatedRating) => {
//   try {
//     const response = await fetch(`https://localhost:8088/characters/${characterId}/rating`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedRating),
//     })

//     if (!response.ok) {
//       throw new Error(`Error updating character rating: ${response.statusText}`)
//     }

//     const data = await response.json()
//     console.log("Updated character rating successfully:", data)
//   } catch (error) {
//     console.error("Error updating character rating:", error)
//   }
// }


// const handleRatingSubmit = () => {
//   const updatedRating = {
//     ...character.rating,
//     ...tempRatings,
//   }

//   updateCharacterRating(character.id, updatedRating)

//   setCharacter({
//     ...character,
//     rating: updatedRating,
//   })
// }

const handleAddNewWeapon = async () => {
  const newGear = { ...newWeapon, characterId: parseInt(characterId) }
  await fetch('http://localhost:8088/gear', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGear),
  })
  setGear([...gear, newWeapon])
  setNewWeapon({ name: '', harm: '' })
}

const handleDeleteCharacter = () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this character?"
  )

  if (confirmDelete) {
    fetch(`http://localhost:8088/characters/${characterId}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/")
    })
  }
}


const handleLevelUp = async () => {
  const characterImprovementPromises = improvements
    .filter((_, index) => selectedImprovements[index])
    .map((improvement) => {
      return fetch("http://localhost:8088/characterImprovements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterId: parseInt(characterId),
          improvementId: improvement.id,
        }),
      })
    })

  await Promise.all(characterImprovementPromises)

  fetch(`http://localhost:8088/characterImprovements?characterId=${characterId}&_expand=improvement`)
    .then((response) => response.json())
    .then((data) => {
      setSavedImprovements(data.map((item) => item.improvement))
    })
  setSelectedImprovements([])
}

const handleLuckChange = async (index) => {
  const newLuckSlots = [...luckSlots]
  newLuckSlots[index] = !newLuckSlots[index]
  setLuckSlots(newLuckSlots)
  const updatedCharacter = { ...character, luckSlots: newLuckSlots }
  await updateCharacterSlots(updatedCharacter)
  window.location.reload()
}

const handleHarmChange = async (index) => {
  const newHarmSlots = [...harmSlots]
  newHarmSlots[index] = !newHarmSlots[index]
  setHarmSlots(newHarmSlots)
  const updatedCharacter = { ...character, harmSlots: newHarmSlots }
  await updateCharacterSlots(updatedCharacter)
  window.location.reload()
}

const handleExperienceChange = async (index) => {
  const newExperienceSlots = [...experienceSlots]
  newExperienceSlots[index] = !newExperienceSlots[index]
  setExperienceSlots(newExperienceSlots)
  const updatedCharacter = { ...character, experienceSlots: newExperienceSlots }
  await updateCharacterSlots(updatedCharacter)
  window.location.reload()
}

const handleSlotChange = (index, slotType) => {
  if (slotType === 'luck') {
    handleLuckChange(index)
  } else if (slotType === 'harm') {
    handleHarmChange(index)
  } else if (slotType === 'experience') {
    handleExperienceChange(index)
  }
}

const rollDice = () => {
  const roll1 = Math.floor(Math.random() * 6) + 1
  const roll2 = Math.floor(Math.random() * 6) + 1
  const total = roll1 + roll2
  setDiceResult(total)
}

  return (
    <div className="character__container">
      <div className="character__header">
      <h1>{character?.name}</h1>
      <div className="diceRoller">
        <div className="diceRoller__result">{diceResult && <p>Result: {diceResult}</p>}</div>
        <button onClick={rollDice} className="diceRoller__button">
          Roll Dice
        </button>
      </div>
    </div>
    <h2>Playbook: {character?.playbook?.name}</h2>
      <div className="character__slots-columns">
      <div className="character__slots">
        <h3>Luck:</h3>
        <p>Mark luck to change a roll to 12 or avoid all harm from an injury</p>
        {luckSlots.map((checked, index) => (
          <input
            key={index}
            type="checkbox"
            checked={checked}
            onChange={() => handleSlotChange(index, 'luck')}
          />
        ))}
          <p>Luck Special: {luckSpecial}</p>
      </div>
      <div className="character__slots">
        <h3>Harm:</h3>
        <p>When you reach 4 or more, mark unstable.</p>
        {harmSlots.map((checked, index) => (
          <input
            key={index}
            type="checkbox"
            checked={checked}
            onChange={() => handleSlotChange(index, 'harm')}
          />
        ))}
      </div>
      <div className="character__slots">
        <h3>Experience:</h3>
        <p>Whenever you roll and get a total of 6 or less, or when a move tells you to, mark an experience box.</p>
        {experienceSlots.map((checked, index) => (
          <input
            key={index}
            type="checkbox"
            checked={checked}
            onChange={() => handleSlotChange(index, 'experience')}
          />
        ))}
      </div>
      </div>
      <div className="character__ratings-gear">
        <div>
        <h2>Ratings:</h2>
        <h3>
          Charm: {character?.rating?.charm}{" "}
          {/* <input className="ratings__text"
            type="number"
            name="charm"
            value={tempRatings.charm}
            onChange={(event) => handleRatingChange(event, "charm")}
          /> */}
        </h3>
        <h3>
          Cool: {character?.rating?.cool}{" "}
          {/* <input className="ratings__text"
            type="number"
            name="cool"
            value={tempRatings.cool}
            onChange={(event) => handleRatingChange(event, "cool")}
          /> */}
        </h3>
        <h3>
          Sharp: {character?.rating?.sharp}{" "}
          {/* <input className="ratings__text"
            type="number"
            name="sharp"
            value={tempRatings.sharp}
            onChange={(event) => handleRatingChange(event, "sharp")}
          /> */}
        </h3>
        <h3>
          Tough: {character?.rating?.tough}{" "}
          {/* <input className="ratings__text"
            type="number"
            name="tough"
            value={tempRatings.tough}
            onChange={(event) => handleRatingChange(event, "tough")}
          /> */}
        </h3>
        <h3>
          Weird: {character?.rating?.weird}{" "}
          {/* <input className="ratings__text"
            type="number"
            name="weird"
            value={tempRatings.weird}
            onChange={(event) => handleRatingChange(event, "weird")}
          /> */}
        </h3>
        {/* <button className="ratings__text" onClick={handleRatingSubmit}>Submit Rating Changes</button> */}
        </div>
        <div className="character__basic-moves">
          <h3>Basic Moves:</h3>
            <ul>
              {basicMoves.map((basicMove) => (
                <li key={basicMove.id}>{basicMove.name}</li>
              ))}
            </ul>
        </div>
        {character.playbookId === 3 ? (
          <div>
            <h3>Special Weapon:</h3>
            <p>{chosenWeaponDetails.form} {chosenWeaponDetails.businessEnd1} {chosenWeaponDetails.businessEnd2} {chosenWeaponDetails.businessEnd3} {chosenWeaponDetails.material} - {chosenWeaponDetails.totalHarm} harm</p>
          </div>
        ) : (
          <div>
            <h3>Gear:</h3>
            <ul>
              {gear.map((gear) => (
                <li key={gear?.id}>{gear?.name}: {gear?.harm} Harm</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <h2>Description: {character?.description}</h2>
      <h4>Moves:</h4>
      <ul>
        {moves.map(move => (
          <li key={move.id}>{move.name}<br/>{move.description}</li>
        ))}
      </ul>
      <div>
      {characterHistory && (
        <div>
          <h4>Character History:</h4>
          <p>
            {characterHistory.characterName}: {historyDescription}
          </p>
        </div>
      )}
      </div>
      <div className="character__improvements">
        <h3>Improvements:</h3>
        <ul>
        {improvements.map((improvement, index) => (
  <div key={improvement.id}>
    <input
      type="checkbox"
      checked={
        selectedImprovements[index] ||
        savedImprovements.some((imp) => imp.id === improvement.id)
      }
      onChange={() => handleImprovementChange(index)}
    />
    <span>{improvement.improvement}</span>
  </div>
          ))}
        </ul>
      </div>
      <button className="levelUp__button" onClick={handleLevelUp}>Commit Improvement Choice</button>
      <br/>
      <br/>
      <br/>
      <button className="delete__button" onClick={handleDeleteCharacter}>Delete Character</button>
    </div>
  )}
  
  //Submit Rating Changes not recording properly
  //handleAddNewWeapon needs to be implemented