import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux'
import { store } from "./store/index";
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/Residency";
import Modal from "./components/Modal/Modal";
ReactDOM.createRoot(document.getElementById("root")).render(

  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>


);
