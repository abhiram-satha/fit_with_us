export default function UpdateCategoryPref({
  selectedCategories,
  deleteCategory,
  addCategory,
}) {
  let unique_category = [];
  const unique_categories = (selectedCategories) => {
    selectedCategories.forEach((c) => {
      if (!unique_category.includes(c)) {
        unique_category.push(c);
      }
    });
  };
  unique_categories(selectedCategories);

  return (
    <div className="card restrictions-card mb-4">
      <h3 className="title is-5">
        What kinds of recipes would you like to see?
      </h3>
      <label className="checkbox" htmlFor="1">
        <input
          type="checkbox"
          value="1"
          checked={selectedCategories.includes("chicken")}
          onChange={(event) => handleSelect(event, "chicken")}
        />
        &nbsp;Recipes including chicken
      </label>
      <br />
      <label className="checkbox" htmlFor="2">
        <input
          type="checkbox"
          value="2"
          checked={selectedCategories.includes("fish")}
          onChange={(event) => handleSelect(event, "fish")}
        />
        &nbsp;Recipes including fish
      </label>
      <br />
      <label className="checkbox" htmlFor="3">
        <input
          type="checkbox"
          value="3"
          checked={selectedCategories.includes("beef")}
          onChange={(event) => handleSelect(event, "beef")}
        />
        &nbsp;Recipes including beef
      </label>
      <br />
      <label className="checkbox" htmlFor="4">
        <input
          type="checkbox"
          value="4"
          checked={selectedCategories.includes("pork")}
          onChange={(event) => handleSelect(event, "pork")}
        />
        &nbsp;Recipes including pork
      </label>
      <br />
      <label className="checkbox" htmlFor="5">
        <input
          type="checkbox"
          value="5"
          checked={selectedCategories.includes("vegetarian")}
          onChange={(event) => handleSelect(event, "vegetarian")}
        />
        &nbsp;Vegetarian recipes
      </label>
      <br />
      <label className="checkbox" htmlFor="6">
        <input
          type="checkbox"
          value="6"
          checked={selectedCategories.includes("vegan")}
          onChange={(event) => handleSelect(event, "vegan")}
        />
        &nbsp;Vegan recipes
      </label>
    </div>
  );
  function handleSelect(event, category) {
    if (selectedCategories.includes(category)) {
      deleteCategory(event, category);
    } else {
      addCategory(event, category);
    }
  }
}
