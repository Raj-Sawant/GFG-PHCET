export default function Footer() {
  return (
    <footer className="footer">
      <p style={{ fontWeight: 700, color: '#00b386', fontSize: '1rem', marginBottom: '0.35rem', letterSpacing: '0.06em' }}>
        GFG PHCET
      </p>
      <p>GeeksForGeeks Student Chapter &middot; Pillai HOC College of Engineering &amp; Technology</p>
      <p style={{ marginTop: '0.4rem', opacity: 0.4, fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} GFG PHCET &middot; Built by the Technical Team
      </p>
    </footer>
  );
}
