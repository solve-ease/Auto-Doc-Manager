import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UploadDoc from "./pages/UploadDoc.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Hello World</h1>
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              <UploadDoc />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
