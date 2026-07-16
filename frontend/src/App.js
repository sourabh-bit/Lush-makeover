import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
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
import Footer from './components/Footer';
import { pageTransition } from './components/motion';
import { AuthProvider, RequireAuth } from './auth/AuthContext';
import AdminShell from './admin/AdminShell';
import AdminLogin from './components/AdminLogin';
import DashboardHome from './admin/pages/DashboardHome';
import WebsitePages from './admin/pages/WebsitePages';
import PageSections from './admin/pages/PageSections';
import SectionEditor from './admin/pages/SectionEditor';
import BookingsList from './admin/pages/BookingsList';
import MessagesList from './admin/pages/MessagesList';
import OrdersList from './admin/pages/OrdersList';
import MediaLibrary from './admin/pages/MediaLibrary';
import ChangePassword from './admin/pages/ChangePassword';
import ClientPortal from './components/ClientPortal';

const ServicesPage = lazy(() => import('./components/ServicesPage'));
const PortfolioPage = lazy(() => import('./components/PortfolioPage'));
const AcademyPage = lazy(() => import('./components/AcademyPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const InquirePage = lazy(() => import('./components/InquirePage'));

const RouteShell = ({ children }) => (
  <motion.div className="bg-white min-h-screen" {...pageTransition}>
    {children}
  </motion.div>
);

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-6 py-20 bg-white">
    <div className="text-center">
      <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] uppercase">Loading</div>
      <div className="mt-3 font-script italic text-[#2a2a2a] text-[26px]">one moment please</div>
    </div>
  </div>
);

const Home = () => (
  <RouteShell>
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
    <Footer />
  </RouteShell>
);

const Services = () => (
  <RouteShell>
    <Header />
    <Suspense fallback={<RouteFallback />}>
      <ServicesPage />
    </Suspense>
    <Footer />
  </RouteShell>
);

const PortfolioRoute = () => (
  <RouteShell>
    <Header />
    <Suspense fallback={<RouteFallback />}>
      <PortfolioPage />
    </Suspense>
    <Footer />
  </RouteShell>
);

const AcademyRoute = () => (
  <RouteShell>
    <Header />
    <Suspense fallback={<RouteFallback />}>
      <AcademyPage />
    </Suspense>
    <Footer />
  </RouteShell>
);

const AboutRoute = () => (
  <RouteShell>
    <Header />
    <Suspense fallback={<RouteFallback />}>
      <AboutPage />
    </Suspense>
    <Footer />
  </RouteShell>
);

const ContactRoute = () => (
  <RouteShell>
    <Header />
    <Suspense fallback={<RouteFallback />}>
      <ContactPage />
    </Suspense>
    <Footer />
  </RouteShell>
);

const InquireRoute = () => (
  <RouteShell>
    <Header />
    <Suspense fallback={<RouteFallback />}>
      <InquirePage />
    </Suspense>
    <Footer />
  </RouteShell>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<PortfolioRoute />} />
        <Route path="/about" element={<AboutRoute />} />
        <Route path="/academy" element={<AcademyRoute />} />
        <Route path="/contact" element={<ContactRoute />} />
        <Route path="/inquire" element={<InquireRoute />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={['super_admin', 'admin', 'editor']}>
              <AdminShell />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="website" element={<WebsitePages />} />
          <Route path="website/:pageId" element={<PageSections />} />
          <Route path="website/:pageId/:sectionKey" element={<SectionEditor />} />
          <Route path="bookings" element={<BookingsList />} />
          <Route path="messages" element={<MessagesList />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="settings" element={<Navigate to="/admin/website/business" replace />} />
        </Route>
        <Route
          path="/portal"
          element={
            <RequireAuth allowedRoles={['client', 'super_admin', 'admin']}>
              <ClientPortal />
            </RequireAuth>
          }
        />
        <Route path="/client" element={<Navigate to="/portal" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App">
      <MotionConfig reducedMotion="user">
        <AuthProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </AuthProvider>
      </MotionConfig>
    </div>
  );
}

export default App;

