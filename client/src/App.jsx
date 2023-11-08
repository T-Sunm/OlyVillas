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
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Website />
      },

    ]
  },
  {
    path: "/properties",
    element: <Properties />
  },
  {
    path: "/createResidency",
    element: <NewListing />
  }
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
