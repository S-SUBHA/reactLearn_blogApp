import { useSelector } from "react-redux";
import { Button, Logo, LogoutBtn } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [sidebarActive, setSidebarActive] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: "/home",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Create Post",
      url: "/create-post",
      active: authStatus,
    },
    {
      name: "My Posts",
      url: "/my-posts",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="w-full fixed top-0 bg-[#ffffff70] px-6 h-[80px] flex items-center">
        <div className="mr-auto">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div
          className={`${sidebarActive && "hidden"} sm:hidden`}
          onClick={() => setSidebarActive((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#0000ff80"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>

        <div
          className={`${
            !sidebarActive && "hidden"
          } sm:hidden h-[100vh] w-full fixed top-0 left-0 bg-transparent z-[9]`}
          onClick={() => setSidebarActive((prev) => !prev)}
        />
        <nav className="">
          <ul
            className={`${
              !sidebarActive ? "-right-full" : "right-0"
            } sm:right-auto transition-all ease-out duration-[0.75s] flex items-start sm:items-center flex-col sm:flex-row fixed h-[100vh] sm:h-auto sm:relative top-0 z-10 w-[320px] sm:w-auto bg-[#ffffff90] sm:bg-transparent`}
          >
            <div
              className={`mx-4 px-2 pt-8 pb-10 sm:hidden`}
              onClick={() => setSidebarActive((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                fill="#0000ff80"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>

            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Button
                    onClick={() => {
                      setSidebarActive(prev => !prev);
                      navigate(item.url);
                    }}
                    bgColor="bg-transparent"
                    textColor="text-black hover:text-[#00000070]"
                    className="mx-4 text-xl px-2 sm:px-0 py-3 sm:py-0"
                  >
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <div className="flex items-center" onClick={() => setSidebarActive(prev => !prev)}>
                  <LogoutBtn className="mx-4 text-xl text-red-600 hover:text-[#ff000070] px-2 sm:px-0 py-3 sm:py-0" />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
