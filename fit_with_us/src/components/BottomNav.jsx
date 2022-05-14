import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Posts from "./Posts";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'

export default function BottomNav({users, updateWeight, weight, recipes, posts, comments, newPost, newComment}) {

 
  return (
    <>
      <Router>
        

        <Routes>
          <Route
            path={`/homepage`}
            element={
              <Homepage
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
                ""
              ) : (
                <Posts posts={posts} users={users} comments={comments} newPost={newPost} newComment={newComment}/>
              )
            }
          />
        </Routes>

        <nav>
          <Link to='/posts/'>Community</Link>
          <Link to="/homepage">Your Profile</Link>
        </nav>
      </Router>
    </>
  );
}
