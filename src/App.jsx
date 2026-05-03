import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import Slider from "./Components/Slider";
import Dashboard from "./Components/Dashboard";
import User from "./Components/User";
import Section from "./Components/Section";
import Content from "./Components/Content";
import Setting from "./Components/Setting";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ IMPORT CURSOR
import AnimatedCursor from "react-animated-cursor";

// ✅ PRIVATE ROUTE
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

function App() {
  const location = useLocation();

  // ✅ Hide navbar for slider/dashboard
  const hideNavbarRoutes = ["/slider", "/dashboard"];

  const hideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/slider");

  return (
    <>
      {/* ✅ PROFESSIONAL CURSOR (ADD HERE) */}
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        color="0, 123, 255"
        outerAlpha={0.3}
        innerScale={1}
        outerScale={2}
        clickables={[
          "a",
          "button",
          "input",
          "textarea",
          "select",
          ".submit-btn"
        ]}
      />

      {/* ✅ Navbar */}
      {!hideNavbar && <Navbar />}

      {/* ✅ Toast */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ✅ Routes */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/events" element={<h1>Events Page</h1>} />
        <Route path="/news" element={<h1>News Page</h1>} />
        <Route path="/downloads" element={<h1>Downloads Page</h1>} />
        <Route path="/forms" element={<h1>Forms Page</h1>} />
        <Route path="/videos" element={<h1>Videos Page</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/committee" element={<h1>Committee Page</h1>} />
        <Route path="/contacts" element={<h1>Contacts Page</h1>} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* SLIDER */}
        <Route
          path="/slider"
          element={
            <PrivateRoute>
              <Slider />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="user" replace />} />
          <Route path="user" element={<User />} />
          <Route path="section" element={<Section />} />
          <Route path="content" element={<Content />} />

          <Route path="setting" element={<Setting />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

















// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Admin from "./Components/Admin";
// import Home from "./Components/Home";
// import Slider from "./Components/Slider";
// import Dashboard from "./Components/Dashboard";
// import User from "./Components/User";
// import Section from "./Components/Section";
// import Content from "./Components/Content";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // ✅ PRIVATE ROUTE
// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
//   return isLoggedIn ? children : <Navigate to="/admin" replace />;
// };

// function App() {
//   const location = useLocation();

//   // ✅ Hide navbar for ALL slider child routes also
//   const hideNavbarRoutes = ["/slider", "/dashboard"];

//   const hideNavbar =
//     hideNavbarRoutes.includes(location.pathname) ||
//     location.pathname.startsWith("/slider");

//   return (
//     <>
//       {/* ✅ Navbar condition */}
//       {!hideNavbar && <Navbar />}

//       <ToastContainer position="top-right" autoClose={2000} />

//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<Home />} />
//         <Route path="/admin" element={<Admin />} />

//         <Route path="/events" element={<h1>Events Page</h1>} />
//         <Route path="/news" element={<h1>News Page</h1>} />
//         <Route path="/downloads" element={<h1>Downloads Page</h1>} />
//         <Route path="/forms" element={<h1>Forms Page</h1>} />
//         <Route path="/videos" element={<h1>Videos Page</h1>} />
//         <Route path="/about" element={<h1>About Page</h1>} />
//         <Route path="/committee" element={<h1>Committee Page</h1>} />
//         <Route path="/contacts" element={<h1>Contacts Page</h1>} />

//         {/* ✅ DASHBOARD (OPTIONAL PAGE) */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         {/* ✅ SLIDER WITH NESTED ROUTES */}
//         <Route
//           path="/slider"
//           element={
//             <PrivateRoute>
//               <Slider />
//             </PrivateRoute>
//           }
//         >
//           {/* DEFAULT ROUTE */}
//           <Route index element={<Navigate to="user" replace />} />

//           {/* CHILD ROUTES */}
//           <Route path="user" element={<User />} />
//           <Route path="section" element={<Section />} />
//           <Route path="content" element={<Content />} />
//         </Route>

//         {/* ✅ FALLBACK */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

