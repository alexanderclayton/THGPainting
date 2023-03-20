import React from 'react';
import {
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  createHttpLink } 
from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import WhyTHG from './pages/WhyTHG/WhyTHG';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Userpage from './pages/Userpage/Userpage';
import AllProjects from './pages/AllProjects/AllProjects';
// import Project from './pages/Project/Project';
import AllClients from './pages/AllClients/AllClients';
import Client from './pages/Client/Client';



import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/why-thg" element={<WhyTHG />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/all-projects" element={<AllProjects />} />
          {/* <Route path="/project" element={<Project />} /> */}
          <Route path="/all-clients" element={<AllClients />} />
          <Route path="/all-clients/client/:id" element={<Client />} />


        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  )
}

export default App;
