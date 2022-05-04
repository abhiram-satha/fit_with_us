import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";


function App() {
  const [recipes, setRecipes] = useState();
  const [weight, setWeight] = useState([{date: new Date(), weight: 140}, {date: new Date(), weight: 150}, {date: new Date(), weight: 130}]);

  // useEffect(() => {
  //   Promise.all([axios.get("http://localhost:8080/")])
  //     .then((all) => {
  //       const calories = all[0].data["hits"][0]["recipe"];
  //       setRecipes([calories]);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  return (
  <>
    <TopNav />
    <Homepage userWeight={weight}/>
    <div className="App">Calories: {recipes}</div>
    <BottomNav />
  </>
  )
}

export default App;
