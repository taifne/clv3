// components/Card.tsx
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ title, description, href }) => {
  return (
    <Link href={href}>
      <div className="block rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105  m-3 min-w-60 min-h-80 bg-gradient-to-br from-pink-500 to-cyan-400 text-white">
        <h2 className="text-2xl font-bold mb-4 ">{title}</h2>
        <p className="text-gray-200">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
