import { motion } from 'framer-motion';

const endpoints = [
  { href: '#home', site: 'Home' },
  { href: '#experience', site: 'Experience' },
  { href: '#projects', site: 'Projects' },
  { href: 'https://shirajuki.js.org', site: 'Digital garden' },
];
const Navigation = () => {
  return (
    <header className="fixed z-50 top-6 backdrop-blur-md left-1/2 -translate-x-1/2 flex text-white items-center py-2 px-12 justify-between w-full max-w-[640px] mx-auto bg-clear rounded-full outline-primary-500 outline">
      <a href="/">
        <motion.h1
          className="text-2xl fancy-font"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          Jonny
        </motion.h1>
      </a>
      <nav className="flex gap-5 text-sm">
        {endpoints.map((endpoint) => (
          <motion.a
            key={endpoint.site}
            href={endpoint.href}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="hover:text-primary-100 hover:brightness-[1.75] transition-colors duration-200"
            onClick={() => endpoint.href.startsWith('#') && lenis.scrollTo(endpoint.href)}
          >
            {endpoint.site}
          </motion.a>
        ))}
      </nav>
    </header>
  );
};

export default Navigation;
