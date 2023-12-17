import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};
const Card = ({ children, className = '' }: Props) => {
  const spotlightRef: any = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     if (spotlightRef.current === null) return;

  //     function handleOnMouseMove(e: MouseEvent) {
  //       const rect = spotlightRef.current.getBoundingClientRect();
  //       const x = e.clientX - rect.left;
  //       const y = e.clientY - rect.top;
  //       spotlightRef.current.style.setProperty('--x', x + 'px');
  //       spotlightRef.current.style.setProperty('--y', y + 'px');
  //       if (x > rect.width / 2) {
  //         spotlightRef.current.style.setProperty('--rotate', '5deg');
  //       } else if (x < rect.width / 2) {
  //         spotlightRef.current.style.setProperty('--rotate', '-5deg');
  //       }
  //     }

  //     document.addEventListener('mousemove', handleOnMouseMove);
  //     return () => {
  //       document.removeEventListener('mousemove', handleOnMouseMove);
  //     };
  //   }, [spotlightRef.current]);

  return (
    <article
      ref={spotlightRef}
      className={`group relative flex bg-primary-700 outline outline-primary-500 rounded-lg p-6 transition-transform duration-500 hover:[transform:perspective(1200px)_rotateY(var(--rotate))] ${className}`}
    >
      {children}

      <div className="spotlight pointer-events-none absolute inset-0 z-10 transition-all duration-300 [background:radial-gradient(600px_at_var(--x)_var(--y),rgba(207,194,232,0.15),transparent_80%)] opacity-0 group-hover:opacity-100"></div>
    </article>
  );
};
export default Card;
