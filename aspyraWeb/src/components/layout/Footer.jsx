const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-inner">
        <span>© {year} Aspyra</span>
        <span className="footer-sep">•</span>
        <a href="/privacy" className="footer-link">Privacy</a>
        <span className="footer-sep">•</span>
        <a href="/terms" className="footer-link">Terms</a>
      </div>
    </footer>
  );
};

export default Footer;
