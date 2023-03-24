import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    // reset the page to default here
  };

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <button
          className="navbar__link"
          onClick={() => handleClick("/")}
        >
          The Weekly Hunt
        </button>
      </li>
      <li className="navbar__item active">
        <button
          className="navbar__link"
          onClick={() => handleClick("/About")}
        >
          About the Game
        </button>
      </li>
      <li className="navbar__item active">
        <button
          className="navbar__link"
          onClick={() => handleClick("/HunterRefSheet")}
        >
          Hunter Reference Sheet
        </button>
      </li>
      <li className="navbar__item navbar__logout">
        <button
          className="navbar__link"
          onClick={() => {
            localStorage.removeItem("hunt_user");
            navigate("/", { replace: true });
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};
