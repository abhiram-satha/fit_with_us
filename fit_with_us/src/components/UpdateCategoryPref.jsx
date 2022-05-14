export default function UpdateCategoryPref ({categoryArray, categories, setCategories}) {

  let unique_categories = [];
  categories.forEach((c) => {
    if (!unique_categories.includes(c)) {
      unique_categories.push(c);
    }
  });
  
  // Printing the unique categories
  setCategories(unique_categories);

  return (
    <>
    {/* <form>
    {categories.includes('chicken') ? <input type="checkbox" value="1" checked/> : <input type="checkbox" value="1" />}
    <label for="1" >Chicken</label>
    {categories.includes('fish') ? <input type="checkbox" value="2" checked/> : <input type="checkbox" value="2" />}
    <label for="2" >Fish</label>
    <input type="submit" name="Update User Preferences"></input>
    </form> */}
    </>
  )
}


// INSERT INTO recipe_category(category) VALUES ('chicken'); 1
// INSERT INTO recipe_category(category) VALUES ('fish'); 2
// INSERT INTO recipe_category(category) VALUES ('beef'); 3 
// INSERT INTO recipe_category(category) VALUES ('pork'); 4 
// INSERT INTO recipe_category(category) VALUES ('vegetarian'); 5 
// INSERT INTO recipe_category(category) VALUES ('vegan');  6 