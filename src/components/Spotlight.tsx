import { useEffect, useRef } from 'react';

const findFirstParentArticle = (element: HTMLElement | null): HTMLElement | null => {
  if (element?.tagName === 'BODY' || element === null) return null;
  if (element?.tagName === 'ARTICLE') return element;
  return findFirstParentArticle(element.parentElement || null);
};

const Spotlight = () => {
  const spotlightRef: any = useRef<HTMLDivElement>(null);

  // Mouse cursor
  useEffect(() => {
    if (spotlightRef.current === null) return;

    function handleOnMouseMove(e: MouseEvent) {
      spotlightRef.current.style.background = `radial-gradient(600px at ${e.pageX}px ${e.pageY}px, rgba(207,194,232,0.05), transparent 80%)`;
      const article = findFirstParentArticle(e.target as HTMLElement);
      if (article === null) return;
      const rect = article.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      article.style.setProperty('--x', x + 'px');
      article.style.setProperty('--y', y + 'px');
    }
    document.addEventListener('mousemove', handleOnMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleOnMouseMove);
    };
  }, [spotlightRef.current]);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none absolute inset-0 z-10 transition duration-300"
      style={{
        height: document.documentElement.scrollHeight + 'px',
      }}
    ></div>
  );
};
export default Spotlight;
