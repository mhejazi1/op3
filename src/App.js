import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Auth } from './Pages/Website/Auth';
import { WebsiteRoutes } from './Pages/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route component={Dashboard} path="/dashboard" exact />
          <Route component={Auth} path="/login" exact />
          <Route component={WebsiteRoutes} path="/" exact />
          <Route component={WebsiteRoutes} path="/:id" exact />
          <Route component={WebsiteRoutes} path="/property/:id" exact />
        </Switch>
      </Router>
      <ToastContainer />

    </>
  );
}

export default App;
