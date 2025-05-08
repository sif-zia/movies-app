import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AppContext from '../context/context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    // Check if user has a preference stored
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedDarkMode ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = (isDark) => {
    setDarkMode(isDark);
    localStorage.setItem('darkMode', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };

  const contextValue = {
    darkMode,
    toggleDarkMode
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;