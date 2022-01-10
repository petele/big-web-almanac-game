import { h } from 'preact';
import { Link } from 'preact-router/match';

const Header = () => {

  return (
    <div class='header'>
      <img class='logo' src='../img/logo.png' />
      <button class='about-btn'>
          <img src="../img/character-file.png" alt="about" />
      </button>
    </div>
  );
};

export default Header;