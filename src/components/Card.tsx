import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};
const Card = ({ children, className = '' }: Props) => {
  return (
    <article
      className={`group relative flex bg-primary-700 outline outline-primary-500 rounded-lg p-6 transition-transform duration-500 hover:[transform:perspective(1200px)_rotateY(var(--rotate))] ${className}`}
    >
      {children}

      <div className="spotlight pointer-events-none absolute inset-0 z-10 transition-all duration-300 [background:radial-gradient(600px_at_var(--x)_var(--y),rgba(207,194,232,0.15),transparent_80%)] opacity-0 group-hover:opacity-100"></div>
    </article>
  );
};
export default Card;
