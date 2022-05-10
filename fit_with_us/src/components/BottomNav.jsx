import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Posts from "./Posts";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAlert } from 'react-alert'

export default function BottomNav() {

  localStorage.setItem('user', 3)
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
  const [users, setUsers] = useState([]);
  const [dietRestrictions, setDietRestrictions] = useState([]);

  const makeArrayOfRestrictions = (apiArray) => {

    if (apiArray.length === 0) {
      return "";
    }
    let arrayOfRestrictions = [];
    // &health=dairy-free&health=egg-free

    let dietRestrictionString = ''

    for (let i = 0; i < apiArray.length; i++) {
      // arrayOfRestrictions.push(apiArray[i]['restriction'])
      let lowerCaseRestriction = apiArray[i]['restriction'].toLowerCase()
      dietRestrictionString += `&health=${lowerCaseRestriction}`
    }
    // console.log(dietRestrictionString)
    return dietRestrictionString


  }

  useEffect(() => {
    Promise.all([axios.get(`http://localhost:8080/api/dietary_restrictions/${userID}`)])
    // .then(response =>  response[0]['data']['users'])
    // .then(result => console.log(result[0]['data']['users']))
    .then(result => makeArrayOfRestrictions(result[0]['data']['users']))
    .then(dietRestrictionComment => {
      return Promise.all([
        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${dietRestrictionComment}&mealType=Dinner&dishType=Main%20course&calories=100-600`),
        axios.get(`http://localhost:8080/api/weights/${userID}`),
        axios.get(`http://localhost:8080/api/posts/`),
        axios.get("http://localhost:8080/api/comments"),
        axios.get(`http://localhost:8080/api/user/${userID}`),
      ])
    })
      .then((all) => {
        // console.log(all);
        setRecipes([all[0].data["hits"]]);
        setWeight(all[1].data["weights"]);
        setPosts(all[2].data);
        setComments(all[3].data.posts);
        setUsers(all[4].data);
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

    if (!event.target[0].value) {
      event.preventDefault();
      console.log(event.target[0].value)
       alert.show("Weight can't be empty")
       return

    } else {
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
  }

  const caloriesPerGender = (gender, age, goalPlan) => {
    if(gender === "male" && age >= 20 && age < 30 && goalPlan > "Increase Weight") {
      let calories = 3230;
    } else if(gender === "male" && age >= 30 && age < 40 && goalPlan > "Increase Weight") {
      let calories = 3153;
    } else if(gender === "male" && age >= 40 && age < 50 && goalPlan > "Increase Weight") {
      let calories = 3075;
    } else if(gender === "male" && age >= 50 && goalPlan > "Increase Weight") {
      let calories = 2998;
    } else if(gender === "male" && age >= 20 && age < 30 && goalPlan > "Maintain Weight") {
      let calories = 2806;
    } else if(gender === "male" && age >= 30 && age < 40 && goalPlan > "Maintain Weight") {
      let calories = 2728;
    } else if(gender === "male" && age >= 40 && age < 50 && goalPlan > "Maintain Weight") {
      let calories = 2651;
    } else if(gender === "male" && age >= 50 && goalPlan > "Maintain Weight") {
      let calories = 2573;
    } else if(gender === "male" && age >= 20 && age < 30 && goalPlan > "Lose Weight") {
      let calories = 2306;
    } else if(gender === "male" && age >= 30 && age < 40 && goalPlan > "Lose Weight") {
      let calories = 2228;
    } else if(gender === "male" && age >= 40 && age < 50 && goalPlan > "Lose Weight") {
      let calories = 2151;
    } else if(gender === "male" && age >= 50 && goalPlan > "Lose Weight") {
      let calories = 2073;
    } else if (gender === "female" && age >= 20 && age < 30 && goalPlan > "Increase Weight") {
      let calories = 2700;
    } else if(gender === "female" && age >= 30 && age < 40 && goalPlan > "Increase Weight") {
      let calories = 2500;
    } else if(gender === "female" && age >= 40 && age < 50 && goalPlan > "Increase Weight") {
      let calories = 2500;
    } else if(gender === "female" && age >= 50 && goalPlan > "Increase Weight") {
      let calories = 2300;
    } else if(gender === "female" && age >= 20 && age < 30 && goalPlan > "Maintain Weight") {
      let calories = 2200;
    } else if(gender === "female" && age >= 30 && age < 40 && goalPlan > "Maintain Weight") {
      let calories = 2000;
    } else if(gender === "female" && age >= 40 && age < 50 && goalPlan > "Maintain Weight") {
      let calories = 2000;
    } else if(gender === "female" && age >= 50 && goalPlan > "Maintain Weight") {
      let calories = 1800;
    } else if(gender === "female" && age >= 20 && age < 30 && goalPlan > "Lose Weight") {
      let calories = 1700;
    } else if(gender === "female" && age >= 30 && age < 40 && goalPlan > "Lose Weight") {
      let calories = 1500;
    } else if(gender === "female" && age >= 40 && age < 50 && goalPlan > "Lose Weight") {
      let calories = 1500;
    } else {
      let calories = 1300;
    }
  }

  // console.log(users)
  return (
    <>
      BottomNav
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
                // dietRestrictions={dietRestrictions.users[0]}
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
                // <Posts posts={posts} comments={comments} onClick={createPost}/>
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
