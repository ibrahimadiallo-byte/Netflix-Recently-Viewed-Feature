import './Footer.css';

export default function Footer() {
  const linkGroups = [
    [
      'Audio Description',
      'Help Center',
      'Gift Cards',
      'Media Center',
    ],
    [
      'Investor Relations',
      'Jobs',
      'Terms of Use',
      'Privacy',
    ],
    [
      'Legal Notices',
      'Cookie Preferences',
      'Corporate Information',
      'Contact Us',
    ],
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-contact">
          Questions? Call{' '}
          <a href="#" className="footer-link">
            1-844-505-2993
          </a>
        </p>

        <div className="footer-columns">
          {linkGroups.map((group, groupIndex) => (
            <ul key={groupIndex} className="footer-column">
              {group.map((label) => (
                <li key={label}>
                  <a href="#" className="footer-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="footer-lang">
          <span className="footer-lang-icon">A</span>
          <span>English</span>
          <span className="footer-lang-chevron">▼</span>
        </div>

        <p className="footer-copy">
          © 2026 Netflix Clone — Built by Ibrahima, Joshua &amp; Yaasameen
        </p>
      </div>
    </footer>
  );
}