import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./NavBar/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./WeeklyHunt.css"
import { Authorized } from "./views/Authorized"

export const WeeklyHunt = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            </Authorized>
        } />
    </Routes>
}