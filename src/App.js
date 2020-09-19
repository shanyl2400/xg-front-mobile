import React, { useState } from 'react';
import Login from './page/Login';
import Main from './page/Main';
import 'fontsource-roboto';
import './App.css';
function App() {
  const [isLogin, setIsLogin] = useState(false);

  let token = sessionStorage.getItem("token");
  let view = <Login login={()=>setIsLogin(true)}/>

  if(isLogin|| token != null) {
    view = <Main />
  }
  return (
    <div className="App">
      {view}
    </div>
  );
}

export default App;
