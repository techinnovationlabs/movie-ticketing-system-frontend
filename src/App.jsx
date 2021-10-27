import AppRoute from "./routers/AppRoute";
import "./App.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Layout } from "antd";

const { Content, Footer, Header } = Layout;
function App() {
  return (
    <Provider store={store}>
      {window.location.pathname.includes("login") ||
      window.location.pathname.includes("sign-up") ||
      window.location.pathname === "/" ? (
        <AppRoute />
      ) : (
        <Layout>
          <Header style={{ color: "white !important" }}>
            MOVIES TICKETING SYSTEM
          </Header>
          <Content>
            <AppRoute />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            {" "}
            Movie ticketing system@2021
          </Footer>
        </Layout>
      )}
    </Provider>
  );
}

export default App;
