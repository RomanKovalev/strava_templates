import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Activities from './Activities';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound.jsx';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
    <nav>
        <ul>
            { isAuthenticated ? <li>Authenticated as {user} </li> : null}

            <li>
                <Link to="/">Dashboard</Link>
            </li>
            <li>
                <Link to="/activities">Activities</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/logout">Logout</Link>
            </li>
        </ul>
    </nav>

        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        <Route path="/activities" element={<PrivateRoute><Activities /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
}

export default App;
