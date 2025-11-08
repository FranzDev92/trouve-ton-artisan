import React from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Artisan from "./pages/Artisan.jsx";
import Legal from "./pages/Legal.jsx";
import NotFound from "./pages/NotFound.jsx";

const router=createBrowserRouter([
  {path:"/",element:<Home/>},
  {path:"/c/:categoryId",element:<List/>},
  {path:"/search",element:<List/>},                 // recherche globale (par nom)
  {path:"/artisans/:id",element:<Artisan/>},
  {path:"/legal/:slug",element:<Legal/>},
  {path:"*",element:<NotFound/>}
]);

createRoot(document.getElementById("root")).render(
  <HelmetProvider><RouterProvider router={router}/></HelmetProvider>
);
