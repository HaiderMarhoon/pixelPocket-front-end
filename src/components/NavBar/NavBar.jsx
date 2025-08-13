import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (

    <>
      <div id="topDiv">
        <div id="title">👾Pixel Pocket</div>
        <div id="RightItemHome">
          {props.user ? (
            <>
              <span>Welcome {props.user.username}</span>
              <Link to="/" onClick={props.handleSignOut}>Sign Out</Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">SIGN IN</Link>
              <Link to="/sign-up">SIGN UP</Link>
            </>
          )}
        </div>
      </div>

      <nav id="navbarItem">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/games">Browser</Link></li>
          {props.user && (
            <>
              <li><Link to={`/user/${props.user.id}/favorite`}>Favourite</Link></li>
              <li><Link to="/games/new">Create</Link></li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default NavBar
