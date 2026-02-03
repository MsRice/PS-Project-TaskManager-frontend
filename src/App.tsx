import { Routes , Route } from "react-router-dom";
import HomeLayout from "./components/layout/HomeLayout";
import Home from "./components/layout/Home";
import Resgister from "./components/layout/Resgister";
import Metrics from "./components/layout/Metrics";
import Completed from "./components/layout/Completed";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />}/>
        <Route path='login/:register' element={<Resgister />}/>
         <Route path='completed' element={<Completed />} />
        <Route path='metrics' element={<Metrics />} />

      </Route>
    </Routes>
  )
};

export default App;
