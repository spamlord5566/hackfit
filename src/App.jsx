import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Understand from './pages/Understand';
import TeamLogin from './pages/TeamLogin';
import Dashboard from './pages/Dashboard';

const pageVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(12px)',
    scale: 0.95,
  },
  in: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
  },
  out: {
    opacity: 0,
    filter: 'blur(16px)',
    scale: 1.05,
  }
};

const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut'
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const location = useLocation();

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate replace to="/understand" />} />
          <Route path="/understand" element={<PageWrapper><Understand /></PageWrapper>} />
          <Route path="/team-login" element={<PageWrapper><TeamLogin /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><h2>404 - Page Not Found</h2></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

