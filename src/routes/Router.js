import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Results from "../pages/Results.jsx";
import ByCountry from "../views/ByCountry.jsx";
import ByBudget from "../views/ByBudget.jsx";
import ResultsBudget from "../pages/ResultsBudget.jsx";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.jsx"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.jsx"));
const About = lazy(() => import("../views/About.jsx"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/Bycountry", element: <ByCountry /> },
      { path: "/Bybudget", element: <ByBudget /> },
      { path: "/Results", element: <Results /> },
      { path: "/ResultsBudget", element: <ResultsBudget /> },
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
