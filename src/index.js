import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Surveys from './components/pages/Surveys';
import { createBrowserRouter, RouterProvider, Route, Link, redirect } from "react-router-dom";
import Header from './components/header/Header';
import Questions from './components/pages/Questions';

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      return redirect('/surveys')

    }
  },
  {
    path: "/surveys",
    element: (
      <Surveys />
    ),
    loader: async () => {
      return <Surveys />

    }
  },
  {
    path: "/questions",
    element: (
      <Questions />
    ),
    loader: async () => {
      return <Questions />

    }
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
