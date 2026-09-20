import {BookOpenCheck} from "lucide-react";
import {Link, NavLink} from "react-router-dom";

const AppLayout = ({ children }) => {
 return (
    <>

      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/courses">
            <BookOpenCheck aria-hidden="true" size={24} />
            <span>SkillSpring</span>
          </Link>

          <nav className="primary-nav" aria-label="Primary navigation">
            <NavLink className="nav-link" to="/courses">
              Courses
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Sign in
            </NavLink>
            <Link className="button button--small" to="/register">
              Create account
            </Link>
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