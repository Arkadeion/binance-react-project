import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Assets } from "./Assets";
import { DataContextProvider } from "./DataContext";
import { Markets } from "./Markets";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-blue-100" >
        <Routes >
          <Route path='/markets' element={<DataContextProvider><Markets /></DataContextProvider>} />
          <Route path='/assets' element={<DataContextProvider><Assets /></DataContextProvider>} />
          <Route
            path="*"
            element={<Navigate to="/assets" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);