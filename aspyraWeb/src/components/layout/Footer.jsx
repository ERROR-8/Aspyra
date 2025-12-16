const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-col">
          <strong>Company</strong>
          <div>
            <a href="/about" className="footer-link">About Us</a>
          </div>
          <div>
            <a href="/careers" className="footer-link">Careers</a>
          </div>
        </div>

        <div className="footer-col">
          <strong>Legal</strong>
          <div>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </div>
          <div>
            <a href="/terms" className="footer-link">Terms &amp; Conditions</a>
          </div>
        </div>

        <div className="footer-col">
          <strong>Support</strong>
          <div>
            <a href="/help" className="footer-link">Help Center</a>
          </div>
          <div>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>

        <div className="footer-col footer-right">
          <div>© {year} Aspyra</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
