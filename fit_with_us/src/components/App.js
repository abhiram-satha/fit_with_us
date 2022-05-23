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
import { Route, Routes, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import UserProfile from "./UserProfile";
import Weighthistorygraph from "./Weighthistorygraph";

export default function App() {
  const location = useLocation();

  //User States
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [userHasRestrictions, setUserHasRestrictions] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [recipes, setRecipes] = useState([[]]);

  const alert = useAlert();
  const [weight, setWeight] = useState([]);
  const [weightClass, setWeightClass] = useState("input")
  const [weightError, setWeightError] = useState(null)
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(false);
  const [badges, setBadges] = useState([]);

  //Set Cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  function loggedInUser(id) {
    if (Number.isInteger(id)) {
      setCookie("id", id, { path: "/" });
      setLoggedIn(true);
      setUserID(id);
    } else {
      return id;
    }
  }

  const getBadges = async () => {
    return await axios.get("http://localhost:8080/api/badges");
  };

  function backButton() {
    setLoggedIn(false);
    setLogin(false);
    setSignUp(false);
    setUserHasRestrictions(false);
  }

  function loggedOutUser() {
    removeCookie("id", { path: "/" });
    backButton();
    window.location.reload(false);
  }

  function loginUser() {
    setLogin(true);
  }

  function signUserUp() {
    setSignUp(true);
  }

  function returnToLogin() {
    setSignUp(false);
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

    return dietRestrictionString;
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const randomCategorySelector = (categories) => {
    if (categories.length === 0) {
      return "";
    }

    const randomNumber = Math.floor(Math.random() * categories.length);

    return categories[randomNumber];
  };

  useEffect(() => {
    const userID = cookies.id;
    if (userID) {
      setLoggedIn(true);
      setUserID(userID);
    } else {
      setLoggedIn(false);
    }
      setLoading(false)
    if (recipes[0].length > 0) return;

    const fetchBadgeData = async () => await getBadges();

    fetchBadgeData()
      .then((all) => setBadges(all.data.badges))
      .catch((err) => console.log(err));

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
      .then((result) => {
        string += makeArrayOfRestrictions(result[0]["data"]["users"]);
      })
      .then((answer) => {
        return Promise.all([
          axios.get(`http://localhost:8080/api/user_preferences/${userID}`),
        ]);
      })
      .then((response) => {
        const userPreferences = response[0]["data"]["users"];
        const categories = userPreferences.map((userPreference) =>
          userPreference.category.toLowerCase()
        );
        setSelectedCategories(categories);
        return randomCategorySelector(categories);
      })
      .then((categorySelection) => {
        return Promise.all([
          axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=${process.env.REACT_APP_ID}&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&excluded=broth&excluded=Homemade%20Essence%20of%20Chicken&calories=300-600`
          ),
          // axios.get(
          //   `https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&calories=300-600`
          // ),
          axios.get(`http://localhost:8080/api/weights/${userID}`),
          axios.get(`http://localhost:8080/api/posts/`),
          axios.get("http://localhost:8080/api/comments"),
          axios.get(`http://localhost:8080/api/user/${userID}`),
        ]);
      })
      .then((all) => {
        setRecipes([all[0].data["hits"]]);
        setWeight(all[1].data["weights"]);
        setPosts(all[2].data);
        setComments(all[3].data.posts);
        setUsers(all[4].data);
      })
      .catch((err) => console.log(err.message));
  }, [location]);

  const newPost = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();

      alert.show("Post can't be empty");
      return;
    } else {
      event.preventDefault();

      const data = {
        message: event.target[0].value,
      };
      axios
        .post(`http://localhost:8080/api/posts/${userID}`, data)

        .then((response) => axios.get("http://localhost:8080/api/posts"))
        .then((posts) => setPosts(posts.data))
        .then((response) => (event.target[0].value = ""))
        .catch((error) => console.log(error));
    }
  };
  const newComment = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();

      alert.show("Comment can't be empty");
      return;
    } else {
      event.preventDefault();

      const data = {
        message: event.target[0].value,
        post_id: event.target[0].attributes.post_id.value,
      };
      axios
        .post(`http://localhost:8080/api/comments/${userID}`, data)
        .then((response) => axios.get("http://localhost:8080/api/comments"))
        .then((comments) => setComments(comments.data.posts))
        .then((response) => (event.target[0].value = ""))
        .catch((error) => console.log(error));
    }
  };

  const updateWeight = (event) => {
    if (!event.target[0].value) {
      event.preventDefault();
      setWeightClass("input is-danger");
      setWeightError("Weight can't be empty");
      return;
    } else {
      event.preventDefault();
      setWeightClass("input");
      setWeightError(null);
      const data = {
        newWeight: event.target[0].value,
      };
      axios
        .post(`http://localhost:8080/api/weights/${userID}`, data)

        .then(() => axios.get(`http://localhost:8080/api/weights/${userID}`))
        .then((weights) => setWeight(weights.data.weights))
        .then(() => (event.target[0].value = ""))
        .catch((error) => console.log(error));
    }
  };

  const updateGoalWeight = (event) => {
    event.preventDefault();

    const data = {
      goal_weight: event.target.value,
    };

    axios
      .put(`http://localhost:8080/api/user/${userID}`, data)

      .then(() => {
        return Promise.all([
          axios.get(`http://localhost:8080/api/user/${userID}`),
        ]);
      })
      .then((data) => {
   
        return setUsers(data[0].data);
      })
      .catch((error) => console.log(error));
  };

  const deleteCategory = (event, categoryToRemove) => {
    const data = {
      category_value: event.target.value,
    };

    axios
      .delete(`http://localhost:8080/api/user_preferences/${userID}`, { data })

      .then((answer) => {
        return Promise.all([
          axios.get(`http://localhost:8080/api/user_preferences/${userID}`),
        ]);
      })
      .then((response) => {
        const userPreferences = response[0]["data"]["users"];
        const categories = userPreferences.map((userPreference) =>
          userPreference.category.toLowerCase()
        );
        setSelectedCategories(
          selectedCategories.filter(
            (selectedCategory) => selectedCategory !== categoryToRemove
          )
        );
      });
  };

  const reloadRecipes = () => {
    const categorySelection = randomCategorySelector(selectedCategories);
    return Promise.all([
      axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${categorySelection}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&excluded=broth&excluded=Homemade%20Essence%20of%20Chicken&calories=300-600`
      ),
    ])
      .then((all) => {
        setRecipes([all[0].data["hits"]]);
      })
      .catch((err) => console.log(err.message));
  };

  const addCategory = (event, categoryToAdd) => {
    const data = {
      category_value: event.target.value,
    };

    axios
      .post(`http://localhost:8080/api/user_preferences/${userID}`, data)
      .then((answer) => {
        return Promise.all([
          axios.get(`http://localhost:8080/api/user_preferences/${userID}`),
        ]);
      })

      .then((response) => {
        const userPreferences = response[0]["data"]["users"];
        const categories = userPreferences.map((userPreference) =>
          userPreference.category.toLowerCase()
        );
        setSelectedCategories([...selectedCategories, categoryToAdd]);
      })
      .catch((err) => console.log(err.message));
  };

  const [recipeRecord, setRecipeRecord] = useLocalStorage(
    "recipe",
    localStorage.getItem("recipe") || 0
  );

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <TopNav loggedOutUser={loggedOutUser} />
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
                  weightClass={weightClass}
                  weightError={weightError}
                  recipeRecord={recipeRecord}
                  recipes={recipes}
                />
              }
            />

            <Route
              path={`/weightchart`}
              element={
                <Weighthistorygraph
                  users={users}
                  userWeight={weight}
                  updateWeight={updateWeight}
                  // recipe={userChosenRecipe}
                  recipeRecord={recipeRecord}
                  recipes={recipes}
                />
              }
            />
            <Route
              path="/posts"
              element={
                posts.length === 0 ? (
                  <progress className="progress is-small is-primary" max="100">
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
                  recipeRecord={recipeRecord}
                  recipes={recipes}
                  setRecipeRecord={setRecipeRecord}
                  newPost={newPost}
                />
              }
            />
            <Route
              path={`/profile`}
              element={
                <UserProfile badges={badges} user={users} weight={weight} />
              }
            />
            <Route
              path={`/food-restrictions`}
              element={
                <UserDietaryRestrictions
                  userID={userID}
                  setUserHasRestrictions={setUserHasRestrictions}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  deleteCategory={deleteCategory}
                  addCategory={addCategory}
                />
              }
            />
          </Routes>
          <BottomNav />
        </>
      ) : loading ?<progress className="progress is-small is-primary" max="100">
      15%
    </progress> : !signUp ? (
        <UserLogin
          loggedInUser={loggedInUser}
          signUserUp={signUserUp}
          setUserHasRestrictions={setUserHasRestrictions}
        />
      ) : (
        <SignUp loggedInUser={loggedInUser} returnToLogin={returnToLogin} />
      )}
    </div>
  );
}
