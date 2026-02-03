import { useAuthentication } from "../../contexts/auth/AuthenticationContext";
import Login from "./Login";
import TaskWall from "./TaskWall";

const Home = () => {
    const {user} = useAuthentication()

    return (
        <div className="walls--wrapper">
            { !user && <Login />}     
            { user && <TaskWall/> }          
        </div>
    );
}

export default Home;
