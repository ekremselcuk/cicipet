import '../styles/globals.css';
import '../styles/animations.css';

export const metadata = {
  title: 'CiciPet - Mutlu Patiler Dünyası',
  description: 'Sevgi dolu, ödüllü evcil hayvan platformu.',
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
