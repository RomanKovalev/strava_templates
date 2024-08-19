import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Activities from './Activities';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound.jsx';
import PrivateRoute from './PrivateRoute';
import Header from './Header.jsx';
import WebSiteFooter from './WebSiteFooter.jsx';
import { useSelector } from 'react-redux';
import StravaLogin from "./StravaLogin.jsx";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow p-4">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/activities" element={<PrivateRoute><Activities/></PrivateRoute>}/>
              {/*<Route path="/activities" element={<Activities/>}/>*/}
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/strava/login" element={<StravaLogin/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </main>
        <WebSiteFooter/>
      </div>
  )
}

export default App;
