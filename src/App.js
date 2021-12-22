import Home from "./Pages/Home";
import Upload from "./Pages/Upload";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/upload" element={<Upload/>}/>
      </Routes>
    </Router>
  );
}

export default App;
