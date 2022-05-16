import "./App.css";
// import Form from "./Form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies, Cookies, withCookies } from "react-cookie";
import UserLogin from "./UserLogin";
import SignUp from "./SignUp";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Button from "./Button";
import { useAlert } from 'react-alert'
import Settings from "./Settings";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";;

function App() {


  //User States
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
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

  //Set Cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const userID = cookies.id;
    if (userID) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function loggedInUser(id) {
    setCookie("id", id, { path: "/" });
    setLoggedIn(true);
  }

  function backButton() {
    setLoggedIn(false);
    setLogin(false);
    setSignUp(false);
  }

  function loggedOutUser() {
    removeCookie("id", { path: "/" });
    backButton();
  }

  function loginUser() {
    setLogin(true);
  }

  function signUserUp() {
    setSignUp(true);
  }

  localStorage.setItem('user', 1)
  let userID = localStorage.getItem('user')

  

  let string =""
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

  const [selectedCategories, setSelectedCategories] = useState([])
  const randomCategorySelector = (categories) => {
   
    if (categories.length === 0) {
      return "";
    }
    


    
    
    const randomNumber = Math.floor(Math.random() * categories.length)
    
    return categories[randomNumber]

  }

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/api/dietary_restrictions/${userID}`),
  ])
    .then(result => {
      
      string  += makeArrayOfRestrictions(result[0]['data']['users'])
    })
    .then(answer => {
      return Promise.all([
        axios.get(`http://localhost:8080/api/user_preferences/${userID}`)
    ])
    })
    .then(response => {
      const userPreferences = response[0]['data']['users']
      const categories = userPreferences.map(userPreference => userPreference.category.toLowerCase())
      setSelectedCategories(categories);
      return randomCategorySelector(categories)
    })
    .then(categorySelection => {
      return Promise.all([
        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&calories=300-600`),
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

  const updateGoalWeight = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();
      console.log(event.target[0].value)
       alert.show("Goal Weight can't be empty")
       return

    } else {
    event.preventDefault();
    // console.log(event.target[0].value)
    const data = {
      goal_weight: event.target[0].value
    }

    // console.log(data)
    axios.put(`http://localhost:8080/api/user/${userID}`, data)
      // .then(response => console.log(response))
      .then(response => axios.get(`http://localhost:8080/api/user/${userID}`))
      // .then(weights => setWeight(weights.data.weights))
      // .then(users => setUsers(prev => {...prev, goal_weight: data.goal_weight}))
      .then(data => setUsers(prev => {
          return {...prev, goal_weight: data.goal_weight}
          }))
      .then(window.location.reload(false))
      .then(response => event.target[0].value ="") 
      .catch(error => console.log(error))
    }
  }

const deleteCategory = (event, categoryToRemove) => {

const data = {
  category_value: event.target.value
}
// console.log(data)
    axios.delete(`http://localhost:8080/api/user_preferences/${userID}`, {data})
    
    .then(answer => {
      
      return Promise.all([
        axios.get(`http://localhost:8080/api/user_preferences/${userID}`)
    ])
    })
    .then(response => {
      const userPreferences = response[0]['data']['users']
      const categories = userPreferences.map(userPreference => userPreference.category.toLowerCase())
      setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory !== categoryToRemove))
      return randomCategorySelector(categories)
    })
    .then(categorySelection => {
      return Promise.all([
        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&calories=300-600`),
      ])
    }).
    then((all) => {
      // console.log(all);
      setRecipes([all[0].data["hits"]]);
    }).then(()=> {
      setTimeout(()=> {
        window.location.reload(false)
      }, 300)
    })
    .catch((err) => console.log(err.message));
  }

  const addCategory = (event, categoryToAdd) => {

    const data = {
      category_value: event.target.value
    }
    // console.log(data)
        axios.post(`http://localhost:8080/api/user_preferences/${userID}`, data)
        .then(answer => {
          
          return Promise.all([
            axios.get(`http://localhost:8080/api/user_preferences/${userID}`)
        ])
        })
      
        .then(response => {
            const userPreferences = response[0]['data']['users']
            const categories = userPreferences.map(userPreference => userPreference.category.toLowerCase())
            setSelectedCategories([...selectedCategories, categoryToAdd])
            return randomCategorySelector(categories)
          })
        .then(categorySelection => {
          return Promise.all([
            axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&calories=300-600`),
          ])
        }).
        then((all) => {
          // console.log(all);
          setRecipes([all[0].data["hits"]]);
        })
        .catch((err) => console.log(err.message));
      }

  return (
    <div className="App">
<Router>
<Routes >
  <Route 
path={`/settings`}
            element={
              users.users === undefined ? "Loading" : <Settings
                users={users}
                updateGoalWeight={updateGoalWeight}
                // categoryArray={categoryArray}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                deleteCategory={deleteCategory}
                addCategory={addCategory}
              />}
              />
</Routes>
<nav>
          <Link to='/settings'>Setting</Link>
        </nav>
</Router>
      
      <BottomNav weight={weight}
                users = {users}
                updateWeight = {updateWeight}
                recipes = {recipes}
                posts={posts}
                comments={comments}
                newPost={newPost}
                newComment={newComment}
                  />
 
      {/* {!user_id ? <Form /> :<BottomNav/>}
      
      {loggedIn ? (
        <>
          <TopNav loggedOutUser={loggedOutUser} />
          <br />
          <br />
          <BottomNav />
        </>
      ) : login ? (
        <>
          <TopNav backButton={backButton} />
          <UserLogin
            loggedInUser={loggedInUser}
            setSignUp={setSignUp}
            signUserUp={signUserUp}
          />
        </>
      ) : signUp ? (
        <>
          <TopNav backButton={backButton} />
          <SignUp loggedInUser={loggedInUser} />
        </>
      ) : (
        <>
          <h1>Welcome to Fit with Us!</h1>
          <Button onClick={loginUser} name="Login" />
          <Button onClick={signUserUp} name="Sign Up!" />
        </>
      )} */}
    </div>
  );
}

export default App;