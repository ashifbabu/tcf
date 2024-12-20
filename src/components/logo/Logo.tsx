import Link from 'next/link';

interface LogoProps {
  size?: number; // Optional size for the logo text
  link?: string; // Optional link that the logo will redirect to (defaults to "/")
}

const Logo: React.FC<LogoProps> = ({ size = 24, link = '/' }) => {
  return (
    <div className="logo-container">
      <Link href={link} legacyBehavior>
        <a className="logo-text">
          <span>The City Flyers</span>
        </a>
      </Link>

      <style jsx>{`
        .logo-container {
          display: flex;
          justify-content: center; /* Center align the logo */
          align-items: center;
          margin: 0 auto; /* Add automatic margins for centering */
          padding: 0.5rem 0; /* Adjust padding for spacing */
        }
        .logo-text {
          font-size: ${size}px; /* Dynamically adjust font size */
          font-weight: bold;
          color: #0070f3; /* Primary color for the logo */
          text-decoration: none;
          text-align: center; /* Center-align the text */
        }
        .logo-text:hover {
          color: #0056a3; /* Slightly darker color on hover for a subtle effect */
        }
        .logo-text span {
          font-size: ${size}px; /* Ensure consistency in font size */
        }
      `}</style>
    </div>
  );
};

export default Logo;
