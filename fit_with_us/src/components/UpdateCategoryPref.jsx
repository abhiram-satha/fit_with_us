import {useState} from 'react'

export default function UpdateCategoryPref ({ selectedCategories, deleteCategory, addCategory}) {
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


    {unique_category.includes('fish') ? <input type="checkbox" value="2" checked onChange={deleteCategory}/> : <input type="checkbox" value="2" onChange={addCategory}/>}
    <label for="2" >Fish</label>
    {unique_category.includes('beef') ? <input type="checkbox" value="3" checked onChange={deleteCategory}/> : <input type="checkbox" value="3" onChange={addCategory}/>}
    <label for="2" >Beef</label>
    {unique_category.includes('pork') ? <input type="checkbox" value="4" checked onChange={deleteCategory}/> : <input type="checkbox" value="4" onChange={addCategory}/>}
    <label for="4" >Pork</label>
    {unique_category.includes('vegetarian') ? <input type="checkbox" value="5" checked onChange={deleteCategory}/> : <input type="checkbox" value="5" onChange={addCategory}/>}
    <label for="5" >Vegetarian</label>
    {unique_category.includes('vegan') ? <input type="checkbox" value="6" checked onChange={deleteCategory}/> : <input type="checkbox" value="6" onChange={addCategory}/>}
    <label for="2" >Vegan</label>
    </form>
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