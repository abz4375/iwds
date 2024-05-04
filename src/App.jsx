import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthTutorial from "./components/AuthTutorial";
import MoviesCRUD from "./components/MoviesCRUD";
import Testpage from "./components/Testpage";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Dashboard/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/test" element={ <Testpage/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
