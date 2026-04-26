import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import FoodPosts from "./pages/FoodPosts"
import Profile from "./pages/Profile"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ProtectedRoute from "./components/ProtectedRoute"
import Needy from "./pages/Needy"
import Landing from "./pages/Landing"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <FoodPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/required-helps"
          element={
            <ProtectedRoute>
              <Needy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landing-page"
          element={
              <Landing />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App