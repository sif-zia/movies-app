import { useRouter } from "next/router";
import styles from "../../../styles/SpecificHelp.module.css";

export default function HelpSection() {
	const router = useRouter();
	const { slug } = router.query;

	const pageTitle = slug ? slug[0] : null;

	const getPageContent = () => {
		switch(pageTitle) {
			case "faq":
				return (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
						<div className={styles.faqList}>
							<div className={styles.faqItem}>
								<h3 className={styles.faqQuestion}>How do I search for movies?</h3>
								<p className={styles.faqAnswer}>You can browse all movies from the Movies page or filter by genre using the dropdown menu.</p>
							</div>
							<div className={styles.faqItem}>
								<h3 className={styles.faqQuestion}>Can I view movies by director?</h3>
								<p className={styles.faqAnswer}>Yes! Click on any director's name to see all movies directed by them.</p>
							</div>
							<div className={styles.faqItem}>
								<h3 className={styles.faqQuestion}>What information is available for each movie?</h3>
								<p className={styles.faqAnswer}>Each movie page includes the title, director, release year, genre, rating, and a description.</p>
							</div>
						</div>
					</div>
				);
			case "contact":
				return (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>Contact Us</h2>
						<p className={styles.helpText}>Have questions or feedback? We'd love to hear from you!</p>
						<div className={styles.contactForm}>
							<div className={styles.formGroup}>
								<label className={styles.label}>Name</label>
								<input type="text" className={styles.input} placeholder="Your name" />
							</div>
							<div className={styles.formGroup}>
								<label className={styles.label}>Email</label>
								<input type="email" className={styles.input} placeholder="Your email" />
							</div>
							<div className={styles.formGroup}>
								<label className={styles.label}>Message</label>
								<textarea className={styles.textarea} placeholder="Your message" rows="5"></textarea>
							</div>
							<button className={styles.submitButton}>Send Message</button>
						</div>
					</div>
				);
			case "privacy":
				return (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>Terms and Conditions</h2>
						<div className={styles.termsContent}>
							<p className={styles.helpText}>These Terms and Conditions govern the use of our movie database service. By accessing or using the service, you agree to be bound by these terms.</p>
							
							<h3 className={styles.termsSubtitle}>1. Usage Guidelines</h3>
							<p className={styles.helpText}>This database is provided for informational purposes only. All content is for personal, non-commercial use.</p>
							
							<h3 className={styles.termsSubtitle}>2. Privacy Policy</h3>
							<p className={styles.helpText}>We respect your privacy and are committed to protecting your personal data. We do not share your information with third parties.</p>
							
							<h3 className={styles.termsSubtitle}>3. Copyright</h3>
							<p className={styles.helpText}>All content on this website is protected by copyright laws and may not be reproduced without permission.</p>
						</div>
					</div>
				);
			default:
				return <p className={styles.helpText}>Please select a specific help topic from the menu.</p>;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>{pageTitle ? pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1) : "Help Center"}</h1>
				<p className={styles.subtitle}>Find answers to your questions and learn how to use our movie database.</p>
			</div>
			
			<div className={styles.content}>
				{getPageContent()}
			</div>

			<div className={styles.navigation}>
				<div className={styles.navTitle}>Help Topics</div>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<a href="/help/faq" className={`${styles.navLink} ${pageTitle === "faq" ? styles.active : ""}`}>FAQ</a>
					</li>
					<li className={styles.navItem}>
						<a href="/help/contact" className={`${styles.navLink} ${pageTitle === "contact" ? styles.active : ""}`}>Contact Us</a>
					</li>
					<li className={styles.navItem}>
						<a href="/help/privacy" className={`${styles.navLink} ${pageTitle === "privacy" ? styles.active : ""}`}>Terms & Conditions</a>
					</li>
				</ul>
			</div>
		</div>
	);
}