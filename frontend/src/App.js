import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployeeScreen from "./screens/AddEmployeeScreen";
import CSVUploadScreen from "./screens/CSVUploadScreen";
import HomeScreen from "./screens/HomeScreen";
import EmployeeListScreen from "./screens/EmployeeListScreen";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
      <Routes>
      <Route  path="/" element={<HomeScreen/>}/>
        <Route path="/create-employee" element={<AddEmployeeScreen/>} />
        <Route path="/employee-list" element={<EmployeeListScreen/>} />
        <Route path="/upload-file" element={<CSVUploadScreen/>} />
    
       </Routes>
      </Router>
    </div>
  );
}

export default App;
