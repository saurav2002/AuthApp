// import SignIn from "./SignIn/SignIn";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  const data = useSelector((state) => state.user.currentUser);
  return (
    <div className="bg-slate-300 ">
      <div className="flex items-center justify-between max-w-6xl m-auto p-3">
        <h1 className="font-bold text-3xl">Auth App</h1>
        <ul className="flex justify-center items-center gap-5">
          <Link to="/">
            <li>Home</li>
          </Link>
          {data ? (
            <Link to="/profile">
              <img
                src={
                  data.photo ||
                  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                }
                alt="User"
                className="h-9 w-9 rounded-full object-cover"
              />
            </Link>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <li>Log In </li>
              </Link>

              <Link to="/signup">
                <li>Sign Up</li>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Nav;
