import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import History from "./src/pages/History";
import Header from "./src/components/Header";
import DefaultLayout from "./src/layout/DefaultLayout";
function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesApp;
