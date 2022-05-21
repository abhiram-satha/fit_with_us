useEffect(() => {
    getData()
  }, []);

  return null

  async function getData() {
    try {
      const dietaryRestrictions = await axios.get(`http://localhost:8080/api/dietary_restrictions/${userID}`)
      string  += makeArrayOfRestrictions(dietaryRestrictions.data.users)
  
      getRecipes()
      getWeights()
      getPosts()
      getComents()
      getUser()
    } catch(error) {
      console.log(error.message)
    }
  }

  async function getRecipes() {
    const userPreferences = await axios.get(`http://localhost:8080/api/user_preferences/${userID}`)
    const category = randomCategorySelector(userPreferences.data.users)
    const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${category}&app_id=d44a082f&app_key=35468e3059752f205fc55cbd181c94bc${string}&mealType=Dinner&dishType=Main%20course&excluded=fat&calories=300-600`)
  
    setRecipes(response.data.hits)
  }

  async function getWeights() {
    const response = await axios.get(`http://localhost:8080/api/weights/${userID}`)
    setWeight(response.data.weights)
  }

  async function getPosts() {
    const response = await axios.get(`http://localhost:8080/api/posts/`)
    setPosts(response.data)
  }
  async function getComments() {
    const response = await axios.get("http://localhost:8080/api/comments")
    setComments(response.data.posts)
  }
  async function getUser() {
    const response = await axios.get(`http://localhost:8080/api/user/${userID}`)
    setUsers(response.data)
  }