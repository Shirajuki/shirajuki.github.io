const Footer = () => {
  return (
    <footer className="flex relative z-20 justify-between text-white text-sm h-16 max-w-[900px] w-[calc(100%-2rem)] mx-auto px-4">
      <p className="w-1/2">Loosely designed in Figma by Jonny Ngo Luong. Built with Astro.js and Tailwind CSS</p>
      <a href="#content" onClick={() => lenis.scrollTo('#content')}>
        Scroll to top
      </a>
    </footer>
  );
};
export default Footer;
