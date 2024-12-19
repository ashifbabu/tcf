// components/Logo.tsx
import Link from 'next/link';

interface LogoProps {
  size?: number;         // Optional size for the logo
  link?: string;         // Optional link that the logo will redirect to (defaults to "/")
}

const Logo: React.FC<LogoProps> = ({ size = 60, link = '/' }) => {
  return (
    <div className="logo-container">
      {/* Logo text */}
      <Link href={link} legacyBehavior>
        <a className="logo-text">
          <span>The City Flyers</span>
        </a>
      </Link>

      <style jsx>{`
        .logo-container {
          display: flex;
          align-items: center;
        }
        .logo-text {
          font-size: ${size}px;
          font-weight: bold;
          color: #0070f3; /* Change color to your preference */
          text-decoration: none;
        }
        .logo-text span {
          font-size: ${size}px;
        }
      `}</style>
    </div>
  );
};

export default Logo;
