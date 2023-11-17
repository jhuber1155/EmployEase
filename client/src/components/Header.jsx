import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className='flex justify-between bg-slate-100'>
      <div className='mt-3 ml-2 font-semibold'>
        <Link to="/">
          <h1 className='text-2xl'>Employ<span className='text-green-400'>Ease</span></h1>
        </Link>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
            <button className='bg-green-400 btn btn-lg text-white m-2 rounded-md hover:bg-green-700'>
              <Link to="/addJob">+ Add New Job</Link>
            </button>
            <button className="btn btn-lg btn-dark m-2" onClick={logout}>
              <div className='flex justify-between'>
                Logout
                <IoIosLogOut className='ml-2 my-1' />
              </div>
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-lg bg-green-400 m-2 hover:bg-green-700 text-white" to="/login">
              <div className='flex'>
              Login
                <IoIosLogIn className='ml-1 mt-1'/>
              </div>
            </Link>
            <Link className="btn btn-lg btn-light m-2 animate-pulse" to="/signup">
                Signup
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;