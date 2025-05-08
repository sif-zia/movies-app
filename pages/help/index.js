import Link from 'next/link';
import { Mail, HelpCircle, FileText, Search } from 'lucide-react';
import styles from '../../styles/Help.module.css';

export default function Help() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Help Center</h1>
        <p className={styles.subtitle}>
          Welcome to our help center. Find answers to common questions and learn how to get the most out of our movie database.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p className={styles.helpText}>
          Here are some common questions about using our movie database:
        </p>
        
        <ul className={styles.linksList}>
          <li className={styles.linkItem}>
            <Link href="/help/browsing">
              <div className={styles.linkTitle}>How to browse movies?</div>
              <div className={styles.linkDescription}>Learn how to navigate through our collection of movies by genre, director, or year.</div>
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link href="/help/searching">
              <div className={styles.linkTitle}>How to search for specific movies?</div>
              <div className={styles.linkDescription}>Tips for finding exactly what you're looking for using our search functionality.</div>
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link href="/help/accounts">
              <div className={styles.linkTitle}>Managing your account</div>
              <div className={styles.linkDescription}>Learn how to update your profile, preferences, and personalize your experience.</div>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Guides</h2>
        <p className={styles.helpText}>
          Detailed guides to help you get started:
        </p>
        
        <ul className={styles.linksList}>
          <li className={styles.linkItem}>
            <Link href="/help/getting-started">
              <div className={styles.linkTitle}>Getting Started Guide</div>
              <div className={styles.linkDescription}>A complete walkthrough of our movie database for new users.</div>
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link href="/help/advanced-features">
              <div className={styles.linkTitle}>Advanced Features</div>
              <div className={styles.linkDescription}>Discover powerful features for movie enthusiasts and film buffs.</div>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Still need help?</h2>
        <p className={styles.helpText}>
          Our support team is ready to assist you with any questions or issues you might have.
        </p>
        <a href="mailto:support@moviedb.com" className={styles.contactEmail}>
          <Mail size={16} style={{ marginRight: '8px' }} />
          support@moviedb.com
        </a>
      </div>
    </div>
  );
}