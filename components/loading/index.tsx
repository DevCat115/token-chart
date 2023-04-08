'use client';
import Image from 'next/image';
import './style.css';

const LoadingScreen = () => {
  return (
    <div className="loadingContainer xs:px-10 md:px-56">
      <div className="flex flex-col justify-center">
        <Image src="/logo.png" alt="Decode" width={112} height={96} className="m-auto mb-10" />
        <span className="text-center mb-10 text-sm">
          Discover Hidden Gems with Advanced Crypto Insights
        </span>
        <div className="progressBar" />
      </div>
    </div>
  );
};

export default LoadingScreen;
