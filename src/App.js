import { Provider } from "react-redux";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./store/store";
import SignInCompo from "./components/SignIn";
import SignUpCompo from "./components/SignUp";
import TaskLists from "./components/TaskLists";
import Sidebar from "./components/Sidebar";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { isSignedIn, isLoaded } = useAuth(); 

  // useEffect(() => {
  //   if (!isLoaded) return; 
  // }, [isLoaded]);

  if (!isLoaded) {
    return <div className="flex h-full w-auto justify-center items-center font-bold text-3xl">Loading...</div>; 
  }

  return (
    <div className="flex h-screen max-h-screen">
      <Provider store={store}>
        <BrowserRouter>
          {isSignedIn && <Sidebar />}
          <Routes>
            <Route path="/" element={isSignedIn ? <Main /> : <Navigate to="/signin" />} />
            <Route path="/tasklists" element={isSignedIn ? <TaskLists /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={<SignInCompo />} />
            <Route path="/signup" element={<SignUpCompo />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
