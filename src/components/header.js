import { h } from 'preact';
import { Link } from 'preact-router/match';

const Header = () => {

  return (
    <div class='header'>
      <Link href="/" label="Home" aria-label="Home">
        <img class='logo' src='../img/logo.png' />
      </Link>
      <button class='about-btn'>
        <img src="../img/character-file.png" alt="about" />
      </button>
    </div>
  );
};

export default Header;
