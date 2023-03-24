import { useState } from "react"
import "./LandingPage.css"
import { useNavigate } from "react-router-dom"

export const NavigationButtons = () => {
    const navigate = useNavigate()

    const handleFormClick = (event) => {
        event.preventDefault()
        navigate("/PlaybookForm")
    }

    const handleLibraryClick = (event) => {
        event.preventDefault()
        navigate("/characterLibrary")
    }

    
    return <>
        <div className="home__container">
        <h1>The Weekly Hunt</h1>
        <h2>Who will you be when the monsters come knocking?</h2>

        <div className="button">
          <button className="create__button" onClick={(event) => {
              handleFormClick(event)
          }}>Create a Hunter</button>
          <button className="character__button" onClick={(event) => {
              handleLibraryClick(event)
          }}>My Hunters</button>
        </div>
        <div className="intro">
        <h3>Most people don't believe in monsters, but they're real. When someone finds out that monsters are real, it's usually just before they get eaten.<br/>
            But some people are mean enough, smart enough, crazy enough, or hurt enough, that they live.<br/>
            And some of those survivors go on a crusade against the monsters.<br/>
            That's you.<br/>
            It could be that you make a stand and defend your hometown from everything evil that comes there.<br/>
            It could be that you take to the road and go hunt them down, wherever you can find them.<br/>
            It could be that you have magic powers to put you on an even footing, or that your name came up in prophecies thousands of years ago.<br/>
            The one sure thing is that you aren't gonna go back to your old safe life.
        </h3>
        </div>
        </div>
      </>
  }