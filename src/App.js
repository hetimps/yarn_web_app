import { Provider } from "react-redux";
import Router from "./router/Router.js";
import { store } from "./Redux/Store.js";
import Toasters from "./Comon_Components/Toasters.js";

function App() {
  return (
    <>
      <Provider store={store}>
        <Toasters/>
        <Router />

      </Provider>
    </>
  );
}

export default App;
