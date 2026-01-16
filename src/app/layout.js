import '../styles/globals.css';
import '../styles/animations.css';

export const metadata = {
  title: 'Pet-Sovereign Economy',
  description: 'Gamified Pet Care & Charity Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
