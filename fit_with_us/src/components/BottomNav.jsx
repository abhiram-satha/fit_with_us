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
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  // console.log(weight)
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/"),
      axios.get("http://localhost:8080/api/weights"),
      axios.get("http://localhost:8080/api/posts"),
      axios.get("http://localhost:8080/api/comments")
    ])
      .then((all) => {
        setRecipes([all[0].data["hits"]]);
        setWeight(all[1].data["weights"])
        setPosts(all[2].data)
        setComments(all[3].data.posts)
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
        <Route path="/posts" element={posts.length === 0 ? "Loading" : <Posts posts={posts} comments={comments}/>}/>
      </Routes>

    </Router>
    </>
  )


}