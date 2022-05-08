import "./App.css";
import Form from "./Form";
import BottomNav from "./BottomNav";

function App() {
const user_id = localStorage.getItem('user');

  return (
    <div className="App">
      {!user_id ? <Form /> :<BottomNav/>}
      
    </div>
  );
}

export default App;
