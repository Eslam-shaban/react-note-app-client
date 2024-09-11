import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import { CgNotes } from "react-icons/cg";

const Navbar = () => {
    const { user, logoutUser } = useAuth();

    return (
        <>
            {user ? (
                <nav className='bg-white text-black flex justify-between items-center p-4'>
                    <Link className='flex items-center gap-1' to='/notes'>
                        <CgNotes size={25} />
                        <p className='font-bold'>Notes</p>
                    </Link>
                    <Link className='font-bold text-xl text-teal-800' to='/'>Home</Link>
                    <button className='bg-red-600 p-2 rounded text-white' onClick={logoutUser}>Logout</button>
                </nav>
            ) : (
                <nav className='bg-white text-black flex justify-between items-center p-4'>
                    <div className="flex-1 flex justify-center">
                        <Link className='font-bold text-xl text-teal-800' to='/'>Home</Link>
                    </div>
                    <div className="flex gap-4">
                        <Link className='bg-green-600 p-2 rounded text-white' to='/login'>Login</Link>
                        <Link className='bg-blue-600 p-2 rounded text-white' to='/register'>Register</Link>
                    </div>
                </nav>
            )}
        </>
    )
}

export default Navbar
