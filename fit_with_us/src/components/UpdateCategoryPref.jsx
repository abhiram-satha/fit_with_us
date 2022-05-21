import {useState} from 'react'
import Button from './Button';

export default function UpdateCategoryPref ({ selectedCategories, deleteCategory, reloadRecipes, addCategory}) {
// const [includeChicken, setIncludeChicken] = useState([])

  let unique_category = [];
  const unique_categories = (selectedCategories) => {
    selectedCategories.forEach((c) => {
      if (!unique_category.includes(c)) {
        unique_category.push(c);
      }
    });

  }
  unique_categories(selectedCategories);

  return (
    <>
    
    <div class="column">
          <div class="card">
            <div class="card-content">
    <form>
        <p className="update-title">Update Your Category Preferences:</p>
        <br />

        <div className="label-flex">
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

    </div>
      
    </form>

    </div></div></div>

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