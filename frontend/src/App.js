import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnvelopeIntro from './components/EnvelopeIntro';
import Header from './components/Header';
import Hero from './components/Hero';
import Elevated from './components/Elevated';
import Destination from './components/Destination';
import MeetFounder from './components/MeetFounder';
import Philosophy from './components/Philosophy';
import Curated from './components/Curated';
import Testimonials from './components/Testimonials';
import Portfolio from './components/Portfolio';
import Instagram from './components/Instagram';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import PortfolioPage from './components/PortfolioPage';

const Home = () => (
  <div className="bg-[#f7f4ef] min-h-screen">
    <EnvelopeIntro />
    <Header />
    <Hero />
    <Elevated />
    <Destination />
    <MeetFounder />
    <Philosophy />
    <Curated />
    <Testimonials />
    <Portfolio />
    <Instagram />
    <Blog />
    <Footer />
  </div>
);

const Services = () => (
  <div className="bg-[#f7f4ef] min-h-screen">
    <Header />
    <ServicesPage />
    <Footer />
  </div>
);

const PortfolioRoute = () => (
  <div className="bg-[#f7f4ef] min-h-screen">
    <Header />
    <PortfolioPage />
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<PortfolioRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
