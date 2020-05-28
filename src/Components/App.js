import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PopulateContacts from "./PopulateContacts"


function App() {
  return (
    <div className="App">
        <PopulateContacts />     
    </div>
  );
}

export default App;
