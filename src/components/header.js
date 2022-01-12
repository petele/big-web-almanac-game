import { h } from 'preact';
import { Link } from 'preact-router/match';

const Header = () => {

  const isDarkMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return (
    <div class='header'>
      <Link href="/" label="Home" aria-label="Home">
        <picture class="logo">
          <source srcset={isDarkMode() ? "/img/logo-dark.avif" : "/img/logo.avif"} type="image/avif" />
          <img src="/img/logo.png" height="137" width="350" />
        </picture>
      </Link>
      <Link href="/about" class='about-btn'>
        <picture>
          <source srcset="/img/character-file.avif" type="image/avif" />
          <img src="/img/character-file.png" alt="About the quiz" />
        </picture>
      </Link>
    </div>
  );
};

export default Header;
