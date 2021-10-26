import 'antd/dist/antd.css';
import Routes from './routes';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import initStore from "./redux/store";
import { bindActionCreators } from "redux";
import { clearAuthentication } from "./modules/auth/actions";
import setupAxiosInterceptors from "./config/axios-config";

const store = initStore();
const actions = bindActionCreators(
  { clearAuthentication },
  store.dispatch
);
setupAxiosInterceptors(
  (message) => actions.clearAuthentication(message)
);

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
