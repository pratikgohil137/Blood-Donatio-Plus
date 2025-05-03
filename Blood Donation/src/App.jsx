import { useState } from 'react';
import Header from './Component/Header';
import Currousel from './Component/Currousel';
import Eligible from './Component/Eligible';
import FAQ from './Component/FAQ';
import ShowHospital2 from './Component/ShowHospital2';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Component/Login';
import Register from './Component/Register';
import Forgotpass from './Component/ForgotPassword';
import Bloodcompatibility from './Component/Bloodcompatibility';
import Eligibleform from './Component/Eligibleform';
import Mission from './Component/Mission';
import AboutUs from './Component/AboutUs';
import Footer from './Component/Footer';
import Feedback from './Component/Feedback';
import Dashboard from './Component/Dashboard';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import OrganizationLogin from './Component/OrganizationLogin';
import AwarenessSection from './Component/AwarenessSection';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Header />
        <Currousel />
        <Mission />
        <Eligibleform />
        <ShowHospital2 />
        <Bloodcompatibility />
        <FAQ />
        <AboutUs />
        <Feedback />
        <Footer />
      </div>
    ),
  },
  {
    path: '/eligible',
    element: (
      <div>
        <Header />
        <Eligible />
      </div>
    ),
  },
  {
    path: '/register',
    element: (
      <div>
        <Header />
        <Register />
      </div>
    ),
  },
  {
    path: '/login',
    element: (
      <div>
        <Header />
        <Login />
      </div>
    ),
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/mission',
    element: (
      <div>
        <Header />
        <Mission />
      </div>
    ),
  },
  {
    path: '/aboutus',
    element: (
      <div>
        <Header />
        <AboutUs />
      </div>
    ),
  },
  {
    path: '/dashboard',
    element: (
        <Dashboard />
    ),
  },
  {
    path: '/organization-login',
    element: <OrganizationLogin />,
  },
  {
    path: '/show-hospital',
    element:(
      <div>
        <Header />
        <ShowHospital2 />
      </div>
    )
  },
  {
    path: '/AwarenessSection',
    element:(
      <div>
        <Header />
        <AwarenessSection />
      </div>
    )
  },

  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
