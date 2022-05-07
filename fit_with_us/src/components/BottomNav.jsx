import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Posts from "./Posts";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'

export default function BottomNav() {

  localStorage.setItem('user', 1)
  let userID = localStorage.getItem('user')
  const [recipes, setRecipes] = useState([
    [
      {
        recipe: {
          images: {
            THUMBNAIL: { url: null },
          },
          yield: null,
          calories: null,
          label: null,
          ingredients: ["milk"],
          url: null,
        },
      },
    ],
  ]);

  const alert = useAlert()
  const [weight, setWeight] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8080/"),
      axios.get(`http://localhost:8080/api/weights/${userID}`),
      axios.get(`http://localhost:8080/api/posts/`),
      axios.get("http://localhost:8080/api/comments"),
    ])
      .then((all) => {
        // console.log([all[0].data["hits"]]);
        setRecipes([all[0].data["hits"]]);
        setWeight(all[1].data["weights"]);
        setPosts(all[2].data);
        setComments(all[3].data.posts);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const newPost = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();
      console.log(event.target[0].value)
       alert.show("Post can't be empty")
       return

    } else {
    event.preventDefault();
    // console.log(event.target[0].value)
    const data = {
      message: event.target[0].value
    }
    axios.post(`http://localhost:8080/api/posts/${userID}`, data)
      // .then(response => console.log(response))
      .then(response => axios.get("http://localhost:8080/api/posts"))
      .then(posts => setPosts(posts.data))
      .then(response => event.target[0].value ="") 
      .catch(error => console.log(error))
    }
  }
  const newComment = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();
      console.log(event.target[0].value)
       alert.show("Comment can't be empty")
       return

    } else {
      event.preventDefault();
      // console.log(event.target[0].attributes.post_id.value)
      const data = {
        message: event.target[0].value,
        post_id: event.target[0].attributes.post_id.value
      }
      axios.post(`http://localhost:8080/api/comments/${userID}`, data)
        .then(response => axios.get("http://localhost:8080/api/comments"))
        .then(comments => setComments(comments.data.posts))
        .then(response => event.target[0].value ="") 
        .catch(error => console.log(error))
      // console.log(data)
    }
    
 
  }

  const updateWeight = (event) => {
    event.preventDefault();
    // console.log(event.target[0].value)
    const data = {
      newWeight: event.target[0].value
    }
    axios.post(`http://localhost:8080/api/weights/${userID}`, data)
      // .then(response => console.log(response))
      .then(response => axios.get(`http://localhost:8080/api/weights/${userID}`))
      .then(weights => setWeight(weights.data.weights))
      .then(response => event.target[0].value ="") 
      .catch(error => console.log(error))
  }

  return (
    <>
      BottomNav
      <Router>
        <nav>
          <Link to='/posts/'>Community</Link>
          <Link to="/homepage">Your Profile</Link>
        </nav>

        <Routes>
          <Route
            path={`/homepage`}
            element={
              <Homepage
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
                "Loading"
              ) : (
                <Posts posts={posts} comments={comments} newPost={newPost} newComment={newComment}/>
                // <Posts posts={posts} comments={comments} onClick={createPost}/>
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}
