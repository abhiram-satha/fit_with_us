import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";


function App() {
  const [recipes, setRecipes] = useState([
    [{recipe: {
      images: {
        THUMBNAIL: {url: null}
      },
      yield: null,
      calories: null,
      label: null,
      ingredients: ["milk"],
      url: null,

    }}]
]);
  const [weight, setWeight] = useState([{date: new Date(), weight: 140}, {date: new Date(), weight: 150}, {date: new Date(), weight: 130}]);
  console.log(weight)
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/"),
      axios.get("http://localhost:8080/api/weights")
    ])
      .then((all) => {
        setWeight(all[1].data["weights"])
        const listOfRecipes = all[0].data["hits"];
        setRecipes([listOfRecipes]);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
  <>
    <TopNav />
    <Homepage userWeight={weight} recipes={recipes}/> 
    <BottomNav />
  </>
  )
}

export default App;
