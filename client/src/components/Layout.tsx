// components/Layout.tsx
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>


      <header className="bg-gray-800 py-4 px-10">
        <nav className="container mx-auto flex items-center justify-between">
          <div>
            <a href="#" className="text-white text-xl font-bold">###########</a>
          </div>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white">.</a></li>
            <li><a href="#" className="text-white">.</a></li>
            <li><a href="#" className="text-white">.</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto py-8">
        {children}
      </main>

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-white">&copy; 2024 My Next.js App</p>
      </footer>
    </div>
  );
};

export default Layout;
