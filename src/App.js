import logo from './logo.svg';
import Routes from './routes';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes />
        </header>
      </div>
    </Router>
  );
}

export default App;
