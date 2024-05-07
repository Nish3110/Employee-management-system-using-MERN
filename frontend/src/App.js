import React, { useState } from "react";
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// pages

import AddEmployee from "./pages/AddEmployee";
import ViewEmployees from "./pages/ViewEmployees";
import PageNotFound from "./pages/PageNotFound";
import UpdateEmployee from "./pages/UpdateEmployee";
import EmployeeView from "./components/EmployeeView";
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:5000/graphql",
});

function App() {


  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route>
            <Route index element={<ViewEmployees />} />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/:id" element={<EmployeeView />} />
            <Route path="/edit/:id" element={<UpdateEmployee />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      <Footer/>

      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

