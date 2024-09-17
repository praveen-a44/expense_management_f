  import './App.css';
  import Navbar from './components/navbar';
  import React, { useState } from "react";
  import AuthContext from "./components/AuthContext";
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
  } from "react-router-dom";
  import Login from './components/Login';
  import Signup from './components/Signup';
  import Dashboard from './components/Dashboard';
  import Income from './components/Income';
  import Expense from './components/Expense';
  import Transactions from './components/Transactions';
  import ExpenseState from './context/exp/ExpState';

  function App() {
    const [mode, setMode] = useState('light');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({});

    const login = (credentials) => {
      setIsLoggedIn(true);
      setCredentials(credentials);
    };

    const logout = () => {
      setIsLoggedIn(false);
      setCredentials({});
    };

    const toggleMode = () => {
      if (mode === 'light') {
        setMode("dark");
        document.body.style.backgroundColor = "#343a40";
        document.title = "Expense-DarkMode";
      } else {
        setMode("light");
        document.body.style.backgroundColor = "white";
        document.title = "Expense-LightMode";
      }
    };

    // Custom component to manage conditional rendering of the Navbar
    const AppWithNavbar = () => {
      const location = useLocation();
      const showNavbar = !['/', '/signup'].includes(location.pathname);

      return (
        <>
          {showNavbar && <Navbar title="Expense_Mgmt" toggleMode={toggleMode} mode={mode} credentials={credentials} />}
          <div className="container5">
            <Routes>
              <Route exact path="/" element={<Login mode={mode} />} />
              <Route exact path="/signup" element={<Signup mode={mode} />} />
              <Route exact path="/dashboard" element={<Dashboard mode={mode} />} />
              <Route exact path='/income' element={<Income mode={mode} />} />
              <Route exact path='/expense' element={<Expense mode={mode} />} />
              <Route exact path='/transactions' element={<Transactions mode={mode} />} />
            </Routes>
          </div>
        </>
      );
    };

    return (
      <>
        <ExpenseState>
          <Router>
            <AuthContext.Provider
              value={{
                isLoggedIn,
                credentials,
                login,
                logout,
              }}
            >
              <AppWithNavbar />
            </AuthContext.Provider>
          </Router>
        </ExpenseState>
      </>
    );
  }

  export default App;
