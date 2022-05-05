import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";


function App() {
  
  return (
  <>
    <TopNav />
    <br/>
    <br />
    <BottomNav />
  </>
  )
}

export default App;
