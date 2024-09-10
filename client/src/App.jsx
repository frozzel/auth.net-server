import { Routes, Route } from "react-router-dom";
import Home from './Home';
import './App.css';


function App (){
  return(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={ <Home />}/>
        </Routes>
  )
}



export default App;
