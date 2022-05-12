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

function App() {
const user_id = localStorage.getItem('user');

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

  const randomCategorySelector = (apiArray) => {
    // console.log(apiArray)
    if (apiArray.length === 0) {
      return "";
    }
    let categoryArray = [];
    // &health=dairy-free&health=egg-free

    let categoryString = ''

    for (let i = 0; i < apiArray.length; i++) {
      // arrayOfRestrictions.push(apiArray[i]['restriction'])
      categoryArray.push(apiArray[i]['category'].toLowerCase())
    }
    // console.log(dietRestrictionString)
    // console.log(categoryArray)

    let randomNumber = Math.floor(Math.random() * categoryArray.length)

    return categoryArray[randomNumber]

  }

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/api/dietary_restrictions/${userID}`),
      axios.get(`http://localhost:8080/api/user_preferences/${userID}`)
  ])
    // .then(response =>  response[0]['data']['users'])
    // .then(result => console.log(result[0]['data']['users']))
    .then(result => {
      // console.log(result[1])
      string  += makeArrayOfRestrictions(result[0]['data']['users'])
    })
    .then(answer => {
      return Promise.all([
        axios.get(`http://localhost:8080/api/user_preferences/${userID}`)
    ])
    })
    .then(response => randomCategorySelector(response[0]['data']['users']))
    .then(categorySelection => {
      return Promise.all([
        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&calories=100-600`),
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

  // console.log(users)

  return (
    <div className="App">
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
