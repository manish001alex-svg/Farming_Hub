import { NavLink } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Profile from "./Profile";

const Nav = () => {

  const {user} = useAuth();

  console.log(user);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Crops", path: "/crops" },
    { name: "Saved", path: "/saved" },
  ];

  return (
    <header className="w-full h-[72px] bg-[#263d20] border-b border-[#ffffff12]">
      <div className="max-w-7xl h-full mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            Farmin
          </span>
          <span className="text-2xl font-bold text-[#79c753]">
            Hub
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#ffffff12] text-[#9bdd72]"
                    : "text-gray-200 hover:bg-[#ffffff0d] hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}


          {/* Show Profile */}
        {user && <div className="flex items-center gap-3">
          <Profile />
        </div>}


        {/* Authentication */}
        {!user && <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className="px-5 py-2 rounded-lg bg-[#79c753] text-[#193015] text-sm font-semibold hover:bg-[#8bd866] transition-all duration-200"
          >
            Login
          </NavLink>
        </div>}
        </nav>


      </div>
    </header>
  );
};

export default Nav;
