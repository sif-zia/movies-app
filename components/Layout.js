import Link from 'next/link';
import { useContext } from 'react';
import AppContext from '../context/context';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Movies App
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/movies">Movies</Link>
          <Link href="/directors">Directors</Link>
          <Link href="/genres">Genres</Link>
          <Link href="/help">Help</Link>
        </nav>
        
        <button 
          className={styles.darkModeToggle}
          onClick={() => appContext.toggleDarkMode(!appContext.darkMode)}
          aria-label="Toggle dark mode"
        >
          {appContext.darkMode ? "🌙" : "☀️"}
        </button>
      </header>
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Movies App. All rights reserved.</p>
      </footer>
    </div>
  );
}