import {useState} from 'react'

export default function UpdateCategoryPref ({ selectedCategories, deleteCategory, reloadRecipes, addCategory}) {
const [includeChicken, setIncludeChicken] = useState([])

  // console.log(setCategories)
  let unique_category = [];
  const unique_categories = (selectedCategories) => {
    selectedCategories.forEach((c) => {
      if (!unique_category.includes(c)) {
        unique_category.push(c);
      }
    });

  }
  unique_categories(selectedCategories);
  console.log(selectedCategories)
  
  // Printing the unique categories
  // setCategories(unique_categories);
  // console.log(unique_categories)
  return (
    <>
    <form>
      <input type="checkbox" value="1" checked={selectedCategories.includes('chicken')} onChange={(event)=> handleSelect(event, 'chicken')}/>
      <label for="1" >Chicken</label>

      <input type="checkbox" value="2" checked={selectedCategories.includes('fish')} onChange={(event)=> handleSelect(event, 'fish')}/>
      <label for="2" >Fish</label>

      <input type="checkbox" value="3" checked={selectedCategories.includes('beef')} onChange={(event)=> handleSelect(event, 'beef')}/>
      <label for="3" >Beef</label>

      <input type="checkbox" value="4" checked={selectedCategories.includes('pork')} onChange={(event)=> handleSelect(event, 'pork')}/>
      <label for="4" >Pork</label>

      <input type="checkbox" value="5" checked={selectedCategories.includes('vegetarian')} onChange={(event)=> handleSelect(event, 'vegetarian')}/>
      <label for="5" >Vegetarian</label>
    
      <input type="checkbox" value="6" checked={selectedCategories.includes('vegan')} onChange={(event)=> handleSelect(event, 'vegan')}/>
      <label for="6" >Vegan</label>
  
    </form>
    <button onClick={reloadRecipes}>Reload</button>
    </>
  )
  function handleSelect (event, category) {
    if(selectedCategories.includes(category)) {
      deleteCategory(event, category)
    } else {
      addCategory(event, category)
    }
  }
}


// INSERT INTO recipe_category(category) VALUES ('chicken'); 1
// INSERT INTO recipe_category(category) VALUES ('fish'); 2
// INSERT INTO recipe_category(category) VALUES ('beef'); 3 
// INSERT INTO recipe_category(category) VALUES ('pork'); 4 
// INSERT INTO recipe_category(category) VALUES ('vegetarian'); 5 
// INSERT INTO recipe_category(category) VALUES ('vegan');  6 