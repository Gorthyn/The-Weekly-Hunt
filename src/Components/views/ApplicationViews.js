import { Outlet, Route, Routes } from "react-router-dom"
import { PlaybookForm } from "../playbooks/PlaybookForm"
import { CharacterLibrary } from "../character/CharacterLibrary"
import { NavigationButtons } from "../home/LandingPage"
import { CharacterDetails } from "../character/CharacterDetails"
import { About } from "../about/about"
import { HunterRefSheet } from "../about/referencesheet"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path ="/" element={
                <NavigationButtons />
            }>
            </Route>

            <Route path="/" element={
                <>
                
                    <Outlet />
                </>
            }>

                <Route path="PlaybookForm" element={<PlaybookForm /> } />
                <Route path="characterLibrary" element={<CharacterLibrary /> } />
                <Route path="characterLibrary/:characterId" element={<CharacterDetails /> } />
                <Route path="About" element={<About />} />
                <Route path="HunterRefSheet" element={<HunterRefSheet /> } />
                </Route>
        </Routes>
    )
}