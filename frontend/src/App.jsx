import "./App.scss";
import { RoutesComp } from "./routes/RoutesComp";
import { Provider } from "react-redux";
import { store } from "./api/redux/store";

function App() {
  return (
    <Provider store={store}>
      <RoutesComp />
    </Provider>
  );
}

export default App;
