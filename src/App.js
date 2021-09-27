import './App.css';
import User from './components/User';
import MainHeader from './UI/MainHeader';
import UserList from './components/UserList';

function App() {

  return (
    
    <div >
      <header> <MainHeader/> </header>
       <div className="App"> <User /></div>
       <div className="App-User">  <UserList/>  </div>
    
    </div>
  );
}

export default App;
