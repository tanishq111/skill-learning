import {BookOpenCheck} from "lucide-react";
import {Link, NavLink} from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";

const AppLayout = ({ children }) => {
  const { user } = useContext(authContext);
  console.log(user);
 return (
    <>

      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/courses">
            <BookOpenCheck aria-hidden="true" size={24} />
            <span>SkillSpring</span>
          </Link>

          <nav className="primary-nav" aria-label="Primary navigation">
            <span>{user ? `Welcome, ${user}` : ""}</span>  
            <NavLink className="nav-link" to="/courses">
              Courses
            </NavLink>
            {!user ? (
              <>
                <NavLink className="nav-link" to="/login">
                  Sign in
                </NavLink>
                <Link className="button button--small" to="/register">
                  Create account
                </Link>
              </>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="page-main" id="main-content">
        {children}
      </main>
    </>
  );

};

export default AppLayout;