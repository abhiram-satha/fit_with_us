import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "./Form";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

function App() {
const user_id = localStorage.getItem('user');

  return (
    <div className="App">
      {!user_id ? <Form /> :<BottomNav/>}
      
    </div>
  );
}

export default App;
