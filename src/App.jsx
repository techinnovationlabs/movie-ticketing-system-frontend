import AppRoute from "./routers/AppRoute";
import "./App.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
}

export default App;
