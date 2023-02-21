import { Link } from 'react-router-dom';
import { auth } from "../config/firebase"; // This is the firebase auth object
import { useAuthState } from "react-firebase-hooks/auth"; // This is a hook that we can use to get the current user
import { signOut } from 'firebase/auth';


export const Navbar = () => {
    const [user] = useAuthState(auth);
    // The user object is null if the user is not logged in
    const signUserOut = async () => {
        await signOut(auth);
    }
    return (
        <div className='navbar'>
            <div className="links">
                <Link to="/">Home</Link>
                {!user ? <Link to="/login">Login</Link> : <Link to="/createpost">Create</Link>}
            </div>
            <div className='user'>
                {user &&
                    <>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || ""} width="20" height="20" alt="" />
                        <button onClick={signUserOut}>Log Out</button>
                    </>
                }
            </div>
        </div>
    );
};