import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import './index.css';
import { WeeklyHunt } from './Components/WeeklyHunt';

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <WeeklyHunt />
  </BrowserRouter>
);

