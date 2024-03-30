import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" eleent={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
