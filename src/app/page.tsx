'use client';

import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    title: 'Create & Edit Notes',
    img: '/images/image1.jpg',
    desc: 'Rich markdown editor with autosave.',
  },
  {
    title: 'View All Notes',
    img: '/images/image2.jpg',
    desc: 'Your notes, sorted by date and tag.',
  },
  {
    title: 'Secure Login',
    img: '/images/image3.jpg',
    desc: 'JWT-powered auth keeps you safe.',
  },
];

export default function HomePage() {
  return (
    <main className="homepage">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">QuickNotes</h1>
          <div className="nav-links">
            <Link href="/login" className="nav-link nav-button">Login</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <h2>Welcome to QuickNotes</h2>
        <p>
          Fast, minimal note-taking built with Next.js, TypeScript, and MongoDB.
          Organize your thoughts instantly and securely.
        </p>
        <Link href="/signup" className="get-started">Get Started</Link>
      </header>

      {/* FEATURES */}
      <section className="features">
        <h3>Features</h3>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-image">
                <Image src={f.img} alt={f.title} fill className="img" />
              </div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} QuickNotes. Built with ❤️ and Next.js.
      </footer>
    </main>
  );
}
