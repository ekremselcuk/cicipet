import '../styles/globals.css';
import '../styles/animations.css';
import TopStickyNav from '@/components/layout/TopStickyNav';
import HomeBottomBar from '@/components/layout/HomeBottomBar';

export const metadata = {
  title: 'CiciPet - Mutlu Patiler Dünyası',
  description: 'Sevgi dolu, ödüllü evcil hayvan platformu.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-bone-white min-h-screen pt-16">
        <TopStickyNav />
        <div className="container mx-auto">
          {children}
        </div>
        <div className="h-40 w-full"></div>
        <HomeBottomBar />
      </body>
    </html>
  );
}
