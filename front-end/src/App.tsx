import './App.css'
import { AddPhoto } from './components/AddPhoto/AddPhoto'
import { Conversation } from './components/Conversation/Conversation'
import { MessengerPage } from './pages/MessengerPage/MessengerPage'
import { BrowserRouter, Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MessengerPage />}>
            <Route path=":contactId" element={<Conversation />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
