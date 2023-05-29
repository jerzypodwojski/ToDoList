import './App.css';
import ListTask from './components/ListTask';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';

function App() {
  return (
    <div className="App">
      <h1>Welcome to my To Do list!</h1>
      <fieldset>
        <ListTask />
        <hr></hr>
        <CreateTask />
      </fieldset>
    </div>
  );
}

export default App;
