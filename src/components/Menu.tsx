import { NavLink } from "react-router-dom";

const Menu = () => {
  const navLinkBaseStyle = "py-1 text-center text-xs hover:text-neutral-300";

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex space-x-4 rounded text-neutral-600">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? `${navLinkBaseStyle} text-neutral-400` : navLinkBaseStyle
          }
        >
          Search
        </NavLink>
        <span>/</span>
        <NavLink
          to={"/user/bookmarks"}
          className={({ isActive }) =>
            isActive ? `${navLinkBaseStyle} text-neutral-400` : navLinkBaseStyle
          }
        >
          Bookmarks
        </NavLink>
        <span>/</span>
        <button
          className={navLinkBaseStyle}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default Menu;
