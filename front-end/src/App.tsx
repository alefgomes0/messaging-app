import "./App.css";
import { Conversation } from "./components/Conversation/Conversation";
import { UserContextProvider } from "./context/userContext";
import { MessengerPage } from "./pages/MessengerPage/MessengerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserContextProvider>
                <MessengerPage />
              </UserContextProvider>
            }
          >
            <Route path=":contactId" element={<Conversation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
