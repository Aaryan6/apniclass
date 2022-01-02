import Home from "./Pages/Home";
import Upload from "./Pages/Upload";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  const user = JSON.parse(localStorage.getItem("student"));
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={user? <Home user={user}/> : <Home message={"Login"}/>}/>
      <Route exact path="/upload" element={user? <Upload user={user}/> : <Register/>}/>
      <Route exact path="/register" element={user? <Home user={user}/> : <Register/>}/>
      <Route exact path="/login" element={user? <Home user={user}/> : <Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
