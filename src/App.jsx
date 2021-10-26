import AppRoute from "./routers/AppRoute";
import "./App.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Layout } from "antd";

const { Content, Footer, Header } = Layout;
function App() {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  return (
    <Provider store={store}>
      {!isAuthenticated ? (
        <AppRoute />
      ) : (
        <Layout>
          <Header style={{ color: "white !important" }}>
            MOVIES TICKETING SYSTEM
          </Header>
          <Content>
            <AppRoute />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      )}
    </Provider>
  );
}

export default App;
