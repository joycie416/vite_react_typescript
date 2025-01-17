import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <header className="w-full flex justify-between p-5 sticky top-0 left-0 right-0 bg-white">
      <Link to="/"className="text-black hover:text-black">Home</Link>
      <ul>
        <li>
          <Link to="/sign-in" className="text-black hover:text-black">로그인</Link>
        </li>
      </ul>
    </header>
  )
}

export default NavBar