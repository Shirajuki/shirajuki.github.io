const Footer = () => {
  return (
    <footer className="flex relative z-20 justify-between text-white text-sm h-16 max-w-[900px] w-[calc(100%-2rem)] mx-auto px-4">
      <p className="w-1/2">Loosely designed in Figma by Jonny Ngo Luong. Built with Astro.js and Tailwind CSS</p>
      <a
        href="#content"
        onClick={() => lenis.scrollTo('#content')}
        className="flex items-center justify-between gap-3 bg-primary-100 h-8 text-sm rounded-md p-[0.35rem] px-3 hover:brightness-125 hover:scale-105 transition-all duration-500"
      >
        <p>Scroll to top</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
        </svg>
      </a>
    </footer>
  );
};
export default Footer;
