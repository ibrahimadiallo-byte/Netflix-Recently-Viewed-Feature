import { useState } from 'react';
import './LandingPage.css';

export default function LandingPage({ onSignIn }) {
  const [email, setEmail] = useState('');

  return (
    <div className="landing">
      <div className="landing-bg">
        <div className="landing-bg-gradient" />
        <div className="landing-bg-tiles" aria-hidden />
      </div>

      <header className="landing-header">
        <div className="landing-logo">NETFLIX</div>
        <div className="landing-header-right">
          <div className="landing-lang">
            <span className="landing-lang-icon">A</span>
            <span>English</span>
            <span className="landing-lang-chevron">▼</span>
          </div>
          <button type="button" className="landing-sign-in" onClick={onSignIn}>
            Sign In
          </button>
        </div>
      </header>

      <main className="landing-hero">
        <h1 className="landing-title">Unlimited movies, TV shows, and more.</h1>
        <p className="landing-sub">Starts at $7.99. Cancel anytime.</p>
        <p className="landing-cta-text">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="landing-email-row">
          <input
            type="email"
            className="landing-email-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="landing-get-started">
            Get Started &gt;
          </button>
        </div>
      </main>

      <div className="landing-bottom-banner">
        <span>The Netflix you love for just $7.99</span>
      </div>
    </div>
  );
}
