import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Website from "./pages/website";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from "react-query";
import 'react-toastify/dist/ReactToastify.css';
import NewListing from "./pages/new-listing/NewListing";
import LayoutMain from "./components/Layout/LayoutMain";
import Property from "./pages/Property/Property";
import Reservations from "./pages/Reservations/Reservations";
import Hosting from "./pages/Hosting/Hosting";
import Whistlist from "./pages/Whistlist/Whistlist";
import Layout2 from "./components/Layout/Layout2";
import Listing from "./pages/Hosting/Listing/Listing";
import EditResidency from "./pages/Hosting/Editresidency/EditResidency";
import LayoutEdit from "./components/Layout/LayoutEdit";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Website />
      },
      {
        element: <LayoutMain />,
        path: "/all-properties",
        children: [
          {
            index: true,
            element: <Properties />
          },
          {
            path: "/all-properties/:propertyId",
            element: <Property />, // Hiển thị thông tin chi tiết của một property cụ thể
          },
        ]
      },
      {
        element: <Layout2 />,
        children: [
          {
            path: "/reservations",
            element: <Reservations />
          },
          {
            path: "/whishlists",
            element: <Whistlist />
          },
          {
            path: "/editresidency",
            element: <EditResidency />
          },
        ]
      },
      {
        element: <LayoutEdit />,
        path: "/editresidency",
        children: [
          {
            index: true,
            element: <EditResidency />
          },
        ]
      },
      {
        path: "/hosting",
        children: [
          {
            index: true,
            element: <Hosting />,
          },
          {
            path: "/hosting/listings",
            element: <Listing />
          }
        ]
      },
      {
        path: "/createResidency",
        element: <NewListing />
      },
    ]
  },
])

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>


  );
}

export default App;
