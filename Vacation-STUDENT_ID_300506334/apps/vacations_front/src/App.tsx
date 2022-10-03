import "./App.css";
import Header, {
  RouteConfig,
  routingConfiguration,
} from "./components/app-components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertDialogModal from "./components/app-components/popUpModal";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {routingConfiguration.map((route: RouteConfig) => {
            return (
              <Route
                key={route.key}
                element={route.element}
                path={route.path}
              ></Route>
            );
          })}
        </Routes>
       <AlertDialogModal/>
      </div>
    </BrowserRouter>
  );
}

export default App;
