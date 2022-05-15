export default function UpdateCategoryPref ({categoryArray, categories, setCategories, deleteCategory}) {

  
  let unique_category = [];
  const unique_categories = (category) => {
    category.forEach((c) => {
      if (!unique_category.includes(c)) {
        unique_category.push(c);
      }
    });

  }
  unique_categories(categories);
  // console.log(unique_category)
  
  // Printing the unique categories
  // setCategories(unique_categories);
  // console.log(unique_categories)
  return (
    <>
    <form>
    {unique_category.includes('chicken') ? <input type="checkbox" value="1" checked onChange={deleteCategory}/> : <input type="checkbox" value="1" />}
    <label for="1" >Chicken</label>
    {unique_category.includes('fish') ? <input type="checkbox" value="2" checked onChange={deleteCategory}/> : <input type="checkbox" value="2" />}
    <label for="2" >Fish</label>
    <input type="submit" name="Update User Preferences"></input>
    </form>
    </>
  )
}


// INSERT INTO recipe_category(category) VALUES ('chicken'); 1
// INSERT INTO recipe_category(category) VALUES ('fish'); 2
// INSERT INTO recipe_category(category) VALUES ('beef'); 3 
// INSERT INTO recipe_category(category) VALUES ('pork'); 4 
// INSERT INTO recipe_category(category) VALUES ('vegetarian'); 5 
// INSERT INTO recipe_category(category) VALUES ('vegan');  6 