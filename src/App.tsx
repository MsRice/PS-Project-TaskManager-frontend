import { Routes , Route } from "react-router-dom";
import HomeLayout from "./components/layout/HomeLayout";
import Home from "./components/layout/Home";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />}/>
      </Route>
    </Routes>
  )
};

export default App;
