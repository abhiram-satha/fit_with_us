import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Homepage from './Homepage';
import Posts from './Posts';
import axios from "axios";
import { useState, useEffect } from "react";

export default function BottomNav() {
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
  const [weight, setWeight] = useState([]);
  // console.log(weight)
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
    BottomNav

    <Router>
      <nav>
        <Link to="/posts">Community</Link>
        <Link to="/homepage">Your Profile</Link>
      </nav>

      <Routes>
        <Route path="/*" element={<Homepage userWeight={weight} recipes={recipes}/>}/>
        <Route path="/posts" element={<Posts />}/>
      </Routes>

    </Router>
    </>
  )


}