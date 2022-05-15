import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Posts from "./Posts";
import axios from "axios";
import RecipeDetails from "./RecipeDetails";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

export default function BottomNav({
  userID,
  users,
  updateWeight,
  weight,
  recipes,
  posts,
  comments,
  newPost,
  newComment,
}) {
  const [youToggle, setYouToggle] = useState(["is-active"]);
  const [usToggle, setUsToggle] = useState([]);

  const toggleYou = () => {
    setUsToggle([]);
    setYouToggle("is-active");
  };

  const toggleUs = () => {
    setYouToggle([]);
    setUsToggle("is-active");
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path={`/homepage`}
            element={
              <Homepage
                userID={userID}
                users={users}
                userWeight={weight}
                updateWeight={updateWeight}
                recipes={recipes}
              />
            }
          />
          <Route
            path="/posts"
            element={
              posts.length === 0 ? (
                <progress class="progress is-small is-primary" max="100">
                  15%
                </progress>
              ) : (
                <Posts
                  posts={posts}
                  users={users}
                  comments={comments}
                  newPost={newPost}
                  newComment={newComment}
                />
                // <Posts posts={posts} comments={comments} onClick={createPost}/>
              )
            }
          />
          <Route
            path="recipe-details"
            element={
              <RecipeDetails
                ingredients={recipes[0][0].recipe.ingredients}
                calories={recipes[0][0].recipe.calories}
                url={recipes[0][0].recipe.url}
                servings={recipes[0][0].recipe.yield}
              />
            }
          />
        </Routes>
        <div class="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
          <ul>
            <li onClick={toggleYou} class={youToggle} id="you">
              <Link to="/homepage">You</Link>
            </li>
            <li onClick={toggleUs} class={usToggle} id="us">
              <Link to="/posts">Us</Link>
            </li>
          </ul>
        </div>
      </Router>
    </>
  );
}
