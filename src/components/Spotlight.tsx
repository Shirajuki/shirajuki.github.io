import { useEffect, useRef } from 'react';

const Spotlight = () => {
  const spotlight: any = useRef<HTMLDivElement>(null);

  // Mouse cursor
  useEffect(() => {
    if (spotlight.current === null) return;

    function setMousePosition(e: MouseEvent) {
      spotlight.current.setAttribute(
        'style',
        `background: radial-gradient(600px at ${e.pageX}px ${e.pageY}px, rgba(207,194,232,0.15), transparent 80%); height: ${document.documentElement.scrollHeight}px;`
      );
    }
    function click() {
      spotlight.current.classList.add('expand');
      setTimeout(() => {
        spotlight.current.classList.remove('expand');
      }, 500);
    }

    document.addEventListener('mousemove', setMousePosition);
    document.addEventListener('click', click);
    return () => {
      document.removeEventListener('mousemove', setMousePosition);
      document.removeEventListener('click', click);
    };
  }, [spotlight.current]);

  return (
    <div
      ref={spotlight}
      className="pointer-events-none absolute inset-0 z-10 transition duration-300"
      style={{
        background: 'radial-gradient(600px at 1160px 383px, rgba(207,194,232,0.15), transparent 80%);',
        height: document.documentElement.scrollHeight + 'px',
      }}
    ></div>
  );
};
export default Spotlight;
