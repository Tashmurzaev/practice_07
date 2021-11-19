import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addData, setAddData] = useState([]);

  useEffect(() => {
    const storeUserLogged =
      JSON.parse(localStorage.getItem('isLoggedIn')) || [];
    if (localStorage.length !== 0) {
      setIsLoggedIn(true)
      setAddData(prevValue => { 
        return JSON.parse(localStorage.getItem('isLoggedIn')) || []
    })
    }
  }, []);

  const loginHandler = (name, email, password) => {
    setAddData((prevValue) => {
      let sliced = password.split('').reverse();
      sliced = [...sliced, ...password.slice(0, 2).split('')];

      let data = [...prevValue];
      data.unshift({
        userName: name,
        email: email,
        password: sliced.join(''),
      });
      localStorage.setItem('isLoggedIn', JSON.stringify(data));
      return data;
    });

    setIsLoggedIn(true);
  };
  console.log(addData);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setAddData([])
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home bigData={addData} onLogout={logoutHandler} />}
    </div>
  );
}

export default App;
