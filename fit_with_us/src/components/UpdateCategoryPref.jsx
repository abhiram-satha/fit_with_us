export default function UpdateCategoryPref ({categoryArray}) {

  console.log(categoryArray)

  return (
    <>
    <form>
    <input type="checkbox" value="1" checked/><label for="1" >Chicken</label>

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