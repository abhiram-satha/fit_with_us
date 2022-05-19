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
import Homepage from "./Homepage";
import Posts from "./Posts";
import RecipeDetails from "./RecipeDetails";
import { useAlert } from "react-alert";
import Settings from "./Settings";
import UserDietaryRestrictions from "./UserDietaryRestrictions";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export default function App() {
  //User States
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userHasRestrictions, setUserHasRestrictions] = useState(false);
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
  const alert = useAlert();
  const [weight, setWeight] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(false);

  //Set Cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  // useEffect(() => {
  //   const userID = cookies.id;
  //   if (userID) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, []);
  function loggedInUser(id) {
    if (Number.isInteger(id)) {
      setCookie("id", id, { path: "/" });
      setLoggedIn(true);
      setUserID(id);
    } else {
      return id;
    }
  }

  function backButton() {
    setLoggedIn(false);
    setLogin(false);
    setSignUp(false);
    setUserHasRestrictions(false);
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

  async function getUserRestrictions() {
    return await axios.get("http://localhost:8080/api/user_restrictions");
  }
  let string = "";
  const makeArrayOfRestrictions = (apiArray) => {
    if (apiArray.length === 0) {
      return "";
    }
       let dietRestrictionString = "";

       for (let i = 0; i < apiArray.length; i++) {
        // arrayOfRestrictions.push(apiArray[i]['restriction'])
        if (apiArray[i]["restriction"] !== "None") {
          let lowerCaseRestriction = apiArray[i]["restriction"].toLowerCase();
          dietRestrictionString += `&health=${lowerCaseRestriction}`;
        }
      }

    return dietRestrictionString

  }

  const [selectedCategories, setSelectedCategories] = useState([])
  const randomCategorySelector = (categories) => {
   
    if (categories.length === 0) {
      return "";
    }
    
   
    
    const randomNumber = Math.floor(Math.random() * categories.length)
    
    return categories[randomNumber]


  };

  useEffect(() => {
    const userID = cookies.id;
    if (userID) {
      setLoggedIn(true);
      setUserID(userID);
    } else {
      setLoggedIn(false);
    }

    const fetchUserRestrictionsData = async () => await getUserRestrictions();

    fetchUserRestrictionsData().then((all) => {
      const found = all.data.user_restrictions.find((restriction, index) => {
        if (restriction.user_id == userID) {
          return true;
        }
      });

      if (found) {
        setUserHasRestrictions(true);
      }
    });
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
        axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&calories=300-600`
        ),
        axios.get(`http://localhost:8080/api/weights/${userID}`),
        axios.get(`http://localhost:8080/api/posts/`),
        axios.get("http://localhost:8080/api/comments"),
        axios.get(`http://localhost:8080/api/user/${userID}`),
      ])
    })
      .then((all) => {

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

       alert.show("Post can't be empty")
       return

    } else {
    event.preventDefault();

    const data = {
      message: event.target[0].value
    }
    axios.post(`http://localhost:8080/api/posts/${userID}`, data)

      .then(response => axios.get("http://localhost:8080/api/posts"))
      .then(posts => setPosts(posts.data))
      .then(response => event.target[0].value ="") 
      .catch(error => console.log(error))
    }
  };
  const newComment = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();

       alert.show("Comment can't be empty")
       return

    } else {
      event.preventDefault();

      const data = {
        message: event.target[0].value,
        post_id: event.target[0].attributes.post_id.value
      }
      axios.post(`http://localhost:8080/api/comments/${userID}`, data)
        .then(response => axios.get("http://localhost:8080/api/comments"))
        .then(comments => setComments(comments.data.posts))
        .then(response => event.target[0].value ="") 
        .catch(error => console.log(error))

    }
  };

  const updateWeight = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();

       alert.show("Weight can't be empty")
       return

    } else {
    event.preventDefault();

    const data = {
      newWeight: event.target[0].value
    }
    axios.post(`http://localhost:8080/api/weights/${userID}`, data)

      .then(response => axios.get(`http://localhost:8080/api/weights/${userID}`))
      .then(weights => setWeight(weights.data.weights))
      .then(response => event.target[0].value ="") 
      .catch(error => console.log(error))
    }
  };

  const updateGoalWeight = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();

       alert.show("Goal Weight can't be empty")
       return

    } else {
    event.preventDefault();

    const data = {
      goal_weight: event.target[0].value
    }


    axios.put(`http://localhost:8080/api/user/${userID}`, data)

      .then(response => axios.get(`http://localhost:8080/api/user/${userID}`))
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
    })
   
  }

  const reloadRecipes = () => {
    const categorySelection = randomCategorySelector(selectedCategories)
      return Promise.all([
        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&excluded=broth&excluded=Homemade%20Essence%20of%20Chicken&calories=300-600`),
      ])
      .then((all) => {

      setRecipes([all[0].data["hits"]]);
    })
    .catch((err) => console.log(err.message));
  }

  const addCategory = (event, categoryToAdd) => {

    const data = {
      category_value: event.target.value
    }

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
          
          })
        .catch((err) => console.log(err.message));
      }

  const [recipeRecord, setRecipeRecord] = useLocalStorage(
    "recipe",
    localStorage.getItem("recipe") || 0
  );

  const userChosenRecipe = recipes[0][recipeRecord]["recipe"];
  //console.log(recipeRecord);
  console.log(userChosenRecipe);

  return (
    <div className="App">
{/* <Router>
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
                reloadRecipes={reloadRecipes}
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
                  /> */}
 
      {/* {!user_id ? <Form /> :<BottomNav/>} */}
      
      {/* {loggedIn ? (
        !userHasRestrictions ? (
          <>
            <TopNav loggedOutUser={loggedOutUser} />
            <UserDietaryRestrictions
              userID={userID}
              setUserHasRestrictions={setUserHasRestrictions}
            />
          </>
        ) : (
          <>
            <TopNav loggedOutUser={loggedOutUser} />

          </>
        )
      ) : login ? (
        <>
          <UserLogin
            loggedInUser={loggedInUser}
            setSignUp={setSignUp}
            signUserUp={signUserUp}
          />
        </>
      ) : signUp ? (
        <>
          <SignUp loggedInUser={loggedInUser} />
        </>
      ) : (
        <>
          <h1>Welcome to Fit with Us!</h1>
          <Button onClick={loginUser} name="Login" />
          <Button onClick={signUserUp} name="Sign Up!" />
        </>
      )} */}

      {loggedIn ? 
      <>
      <TopNav loggedOutUser={loggedOutUser}/>
      <Router>
        <Routes>
          <Route
            path={`/settings`}
            element={
              users.users === undefined ? (
                "Loading"
              ) : (
                <Settings 
                users={users}
                updateGoalWeight={updateGoalWeight}
                // categoryArray={categoryArray}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                deleteCategory={deleteCategory}
                addCategory={addCategory}
                reloadRecipes={reloadRecipes}
                />
              )
            }
          />
          <Route
            path={`/homepage`}
            element={

              <Homepage
                users={users}
                userWeight={weight}
                updateWeight={updateWeight}
                recipe={userChosenRecipe}
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
              )
            }
          />
          <Route
            path="recipe-details"
            element={
              <RecipeDetails
                users={users}
                recipe={userChosenRecipe}
                ingredients={userChosenRecipe.ingredients}
                setRecipeRecord={setRecipeRecord}
                newPost={newPost}
              />
            }
          />
        </Routes>
      </Router>
      <BottomNav />
      </> : (!signUp ? <UserLogin signUserUp={signUserUp} /> : <SignUp loggedInUser={loggedInUser}/>)
    }

      

    </div>
  );
}
