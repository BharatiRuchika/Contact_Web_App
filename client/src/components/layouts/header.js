import '../../App.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logoutUser } from '../../actions/userActions';
const Header = () => {
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const handleLogin = () => {
        history.push("/login")
    }
    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success("Logged out Successfully...");
    }
    const { isAuthenticated, user, loading, error } = useSelector(state => state.auth);
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);
    return (<>
        <div className='header row'>
            <div className='offset-1 offset-md-1 offset-xl-1 offset-sm-1 offset-lg-1 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                <img src="/images/contact.png" height="70rem" width="70rem"></img>
            </div>
            {isAuthenticated && user ? (
                <div className='offset-5 offset-md-5 offset-sm-5 offset-lg-5 offset-xl-5 col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            <figure className="avatar avatar-nav">
                                <img
                                    src={user.avatar && user.avatar.url}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                />
                            </figure>
                            <span style={{ color: 'black' }}>{user && user.name}</span>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                            <Link to="/contacts" className="dropdown-item">List of Contacts</Link>
                            <Link to="/messages" className="dropdown-item">List of Messages</Link>
                            <Link className="dropdown-item text-danger" onClick={logoutHandler}>
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='offset-4 offset-md-4 offset-sm-4 offset-lg-4 offset-xl-4 col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                    <button onClick={handleLogin} className='authBtn'>Login</button>
                </div>
            )}

        </div>

    </>)
}
export default Header;