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
    
    <form>
      
        <div className="subcategory-flex">
        <div className="label-flex">
      <input type="checkbox" value="1" checked={selectedCategories.includes('chicken')} onChange={(event)=> handleSelect(event, 'chicken')}/>
      <label for="1" >Chicken</label>
      </div>
      <div className="label-flex">
      <input type="checkbox" value="2" checked={selectedCategories.includes('fish')} onChange={(event)=> handleSelect(event, 'fish')}/>
      <label for="2" >Fish</label>
      </div>
      </div>
      <div className="subcategory-flex">
      <div className="label-flex">
      <input type="checkbox" value="3" checked={selectedCategories.includes('beef')} onChange={(event)=> handleSelect(event, 'beef')}/>
      <label for="3" >Beef</label>
      </div>
      <div className="label-flex">
      <input type="checkbox" value="4" checked={selectedCategories.includes('pork')} onChange={(event)=> handleSelect(event, 'pork')}/>
      <label for="4" >Pork</label>
      </div>
      </div>
      <div className="subcategory-flex">
      <div className="label-flex">
      <input type="checkbox" value="5" checked={selectedCategories.includes('vegetarian')} onChange={(event)=> handleSelect(event, 'vegetarian')}/>
      <label for="5" >Vegetarian</label>
    </div>
    <div className="label-flex">
      <input type="checkbox" value="6" checked={selectedCategories.includes('vegan')} onChange={(event)=> handleSelect(event, 'vegan')}/>
      <label for="6" >Vegan</label>
      
      </div>
    </div>
    </form>
    <Button onClick={reloadRecipes} type="submit" name="Update Preferences"/>
    {/* <button onClick={reloadRecipes}>Update Preferences</button> */}
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