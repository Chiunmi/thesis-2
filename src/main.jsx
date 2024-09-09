import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from "./App.jsx";
import "./index.css";
import Modal from "react-modal";
import { UserProvider } from './context/UserContext.jsx'

Modal.setAppElement("#root");

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <QueryClientProvider client={queryClient}> {/* Provide the QueryClient */}
        <App />
      </QueryClientProvider>
    </UserProvider>
  </BrowserRouter>
);
