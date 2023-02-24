import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Login from './login';
import Home from './Home';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  return (
    <div style={{margin: "0px"}}>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Login />} />
          <Route exact path='/home' element={ <Home />} />
          <Route exact path='/userlist' element={ <UserList />} />
          <Route exact path='/createUser' element={ <CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
