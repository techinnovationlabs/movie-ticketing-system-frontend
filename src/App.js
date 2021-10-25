import 'antd/dist/antd.css';
import Routes from './routes';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import initStore from "./redux/store";

const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes />
          </header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
