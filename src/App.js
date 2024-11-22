import { Provider } from "react-redux";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/store";
import SignInCompo from "./components/SignIn";
import SignUpCompo from "./components/SignUp";




function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signin" element={<SignInCompo />}></Route>
            <Route path="/signup" element={<SignUpCompo />}></Route>


          </Routes>
        </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
