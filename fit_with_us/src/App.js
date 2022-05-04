import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";


function App() {
  const [recipes, setRecipes] = useState([{
    from: 21,
    to: 40,
    count: 10000,
    _links: {
    next: {
    href: "https://api.edamam.com/api/recipes/v2?q=chicken&app_key=35468e3059752f205fc55cbd181c94bc&_cont=CHcVQBtNNQphDmgVQntAEX4BYlRtDAMGRmJDCmQValJ6DQsVX3cUATRAZVV0DFIDQGVCCmcbZFF6DVYFEWBFA2YbYgR1BxFqX3cWQT1OcV93BB8VADQWVhFCPwoxXVZEITQeVDcBaR4-SQ%3D%3D&calories=100-500&type=public&app_id=d44a082f",
    title: "Next page"
    }
    },
    hits: [
    {
    recipe: {
    uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_14ebd7d6d65f761843dba35202de4b37",
    label: "Chicken Satay",
    image: "https://edamam-product-images.s3.amazonaws.com/web-img/ba6/ba6f66d885e4d62a98055b088a5a85a3.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDUx3AaLZwwrHCykpVr4b2vpB9jnpYdnfzYhC4rxD8m%2BQIhAP9bHHNe0ZOqAfN7oLxeYazoKBBcnIj%2FXhryuj5QUt0wKtIECGwQABoMMTg3MDE3MTUwOTg2IgwCRDVe2JWiXaLgI%2BMqrwTwn9qqA8Xs55zfnxMSEaVASX%2FMRJ3VD8g8NLVvZOpHxr64VyhXvnqDLtGkxBwOWsbRb5F1cnAHqDgoVCxQHLAhYdI9%2Fbi8D7q0bvavwoe1jOb22hAa77iO99TTycQrwyafJZAj6S%2FplohjaKsEHN3fUqwuCdCqcVwYqNMfEdrKz6wYdGMSEhqUVCM2Ffi%2BlPKZooioUfdJ8DomMENYldZjvkbruJtpMJAF8Xq9kqgTJBjs8cwRyj9m7t2s1kJyO0uj%2BE8JH8BSnd4uPg4fUgOUt1spAU3BdO74PozytFJAr2bS2v7PhjlHo4Dac4ZmNFqZ01PbHS%2FjsYpPub5ybGVuhSZWG%2BS%2B1J8fAUhmMPAhVjgTeYW%2BHZznr3YKdJmLcXKwYoZ%2BzrAd3mnmvUVzJai%2BdDZCh0N%2BtYLlNm1qhFZ4%2F4sHY8YntUxYIuY7bxXCcOdYHdE%2F0LgKrYTxYZZ9Z7yPWKUGqnfn12vZtHrPyIDRl39vdI3r3qbmQCikT7w93tA37cnEeaPfgxfxFAdStDZjgYZTXxmLg2soJ53dAk2V4qe%2FYCZeAO9UYAAW1hjsmVkEhkyIH2N2kbzbobqB1xBylxhxW7D9c8DgufXoXkIibNX5OHY6nle7HDNDc2Pl1PPZWqME3aZQoFfm7JD5hEOLZJklOCK3xmC%2BrY7ONktl3blHILm6yblFwD8Btkiwg5%2FnmUewHRUEkAj34ILp%2Ft5Th7PBy8pE%2B0N11EVHP7vNMJTgx5MGOqgBLm9dCpZ5A9UCgA5ZS5IQK3mpZIUWSPyL98cz9irR3d3BY03zWN2hud2e5cZR5Mrbh5%2BqZKCEpf69HLMRgdhoKZH4Au5f3uU5DvBni6KHjCY6GHNzXiBx1Ixg1rttux8P%2Bjm5vqqYDMNNtYdCc%2FS47%2FXQ2zYzhP3yd475SsT2Cujs3DA0fPkwsuwU%2BFiZ4N8aAhSktR1GbB88S7BRHV5fSwFA%2BW2IMALq&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220504T045220Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFENJPMN6X%2F20220504%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f8a80e437d847dcd698aabb75e32443abb719e4f4ba5e4afb8547c0f138798ac",
    images: {
    THUMBNAIL: {
    url: "https://edamam-product-images.s3.amazonaws.com/web-img/ba6/ba6f66d885e4d62a98055b088a5a85a3-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDUx3AaLZwwrHCykpVr4b2vpB9jnpYdnfzYhC4rxD8m%2BQIhAP9bHHNe0ZOqAfN7oLxeYazoKBBcnIj%2FXhryuj5QUt0wKtIECGwQABoMMTg3MDE3MTUwOTg2IgwCRDVe2JWiXaLgI%2BMqrwTwn9qqA8Xs55zfnxMSEaVASX%2FMRJ3VD8g8NLVvZOpHxr64VyhXvnqDLtGkxBwOWsbRb5F1cnAHqDgoVCxQHLAhYdI9%2Fbi8D7q0bvavwoe1jOb22hAa77iO99TTycQrwyafJZAj6S%2FplohjaKsEHN3fUqwuCdCqcVwYqNMfEdrKz6wYdGMSEhqUVCM2Ffi%2BlPKZooioUfdJ8DomMENYldZjvkbruJtpMJAF8Xq9kqgTJBjs8cwRyj9m7t2s1kJyO0uj%2BE8JH8BSnd4uPg4fUgOUt1spAU3BdO74PozytFJAr2bS2v7PhjlHo4Dac4ZmNFqZ01PbHS%2FjsYpPub5ybGVuhSZWG%2BS%2B1J8fAUhmMPAhVjgTeYW%2BHZznr3YKdJmLcXKwYoZ%2BzrAd3mnmvUVzJai%2BdDZCh0N%2BtYLlNm1qhFZ4%2F4sHY8YntUxYIuY7bxXCcOdYHdE%2F0LgKrYTxYZZ9Z7yPWKUGqnfn12vZtHrPyIDRl39vdI3r3qbmQCikT7w93tA37cnEeaPfgxfxFAdStDZjgYZTXxmLg2soJ53dAk2V4qe%2FYCZeAO9UYAAW1hjsmVkEhkyIH2N2kbzbobqB1xBylxhxW7D9c8DgufXoXkIibNX5OHY6nle7HDNDc2Pl1PPZWqME3aZQoFfm7JD5hEOLZJklOCK3xmC%2BrY7ONktl3blHILm6yblFwD8Btkiwg5%2FnmUewHRUEkAj34ILp%2Ft5Th7PBy8pE%2B0N11EVHP7vNMJTgx5MGOqgBLm9dCpZ5A9UCgA5ZS5IQK3mpZIUWSPyL98cz9irR3d3BY03zWN2hud2e5cZR5Mrbh5%2BqZKCEpf69HLMRgdhoKZH4Au5f3uU5DvBni6KHjCY6GHNzXiBx1Ixg1rttux8P%2Bjm5vqqYDMNNtYdCc%2FS47%2FXQ2zYzhP3yd475SsT2Cujs3DA0fPkwsuwU%2BFiZ4N8aAhSktR1GbB88S7BRHV5fSwFA%2BW2IMALq&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220504T045220Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFENJPMN6X%2F20220504%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4422634d2ff264a078b45aedc851a73995d2b011acf877d250b219351318eba2",
    width: 100,
    height: 100
    },
    SMALL: {},
    REGULAR: {},
    LARGE: {}
    },
    source: "BBC Good Food",
    url: "http://www.bbcgoodfood.com/recipes/3645/",
    shareAs: "http://www.edamam.com/recipe/chicken-satay-14ebd7d6d65f761843dba35202de4b37/chicken/100-500-cal",
    yield: 4,
    dietLabels: [
    "High-Protein",
    "Low-Carb"
    ],
    healthLabels: [],
    cautions: [],
    ingredientLines: [],
    ingredients: [
    {
    text: "100.0ml soy sauce (Kikkoman is good)",
    quantity: 100,
    measure: "milliliter",
    food: "soy sauce",
    weight: 107.78219736212455,
    foodCategory: "plant-based protein",
    foodId: "food_a5g9yevb1iactoaiimbvjbkrxueh",
    image: "https://www.edamam.com/food-img/f56/f562e461eb0618f367f538b836c17b82.jpg"
    },
    {
    text: "4.0 tbsp smooth peanut butter",
    quantity: 4,
    measure: "tablespoon",
    food: "peanut butter",
    weight: 64,
    foodCategory: "plant-based protein",
    foodId: "food_bz6b8fsbccyn3zaij72f7av8dl9m",
    image: "https://www.edamam.com/food-img/d74/d740276ae1409472a8714b2cee88a310.jpg"
    },
    {
    text: "4 skinless chicken breasts fillets",
    quantity: 4,
    measure: "<unit>",
    food: "skinless chicken breasts",
    weight: 1088,
    foodCategory: "Poultry",
    foodId: "food_bdrxu94aj3x2djbpur8dhagfhkcn",
    image: "https://www.edamam.com/food-img/da5/da510379d3650787338ca16fb69f4c94.jpg"
    }
    ],
    calories: 1745.4445646019262,
    totalWeight: 1259.7821973621246,
    totalTime: 0,
    cuisineType: [],
    mealType: [],
    dishType: [],
    totalNutrients: {},
    totalDaily: {},
    digest: []
    }}
  ]} ]);
  const [weight, setWeight] = useState([{date: new Date(), weight: 140}, {date: new Date(), weight: 150}, {date: new Date(), weight: 130}]);

  // useEffect(() => {
  //   Promise.all([axios.get("http://localhost:8080/")])
  //     .then((all) => {
  //       const calories = all[0].data["hits"][0]["recipe"];
  //       setRecipes([calories]);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  return (
  <>
    <TopNav />
    <Homepage userWeight={weight} recipes={recipes}/> 
    <BottomNav />
  </>
  )
}

export default App;
