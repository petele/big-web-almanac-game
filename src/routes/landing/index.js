import { h } from 'preact';
import { Link } from 'preact-router/match';

const Landing = () => {

  document.title = 'Big Web Almanac Quiz';

  return (
    <div class="container">
      <h1>Welcome to the Big Web Almanac Quiz</h1>
      <p>In this game, you'll have <strong>60 seconds</strong> to answer as many questions as you can about the web today. All questions in this game are statistics pulled from the 2021 <a href="https://almanac.httparchive.org/en/2021/">Web Almanac</a>, and are based on real data from millions of live websites.</p>
      <p>So, are you ready?</p>
      <Link class="start" href="/play">
        Start Quiz
      </Link>

      <hr></hr>

      <h2>Categories</h2>
      <p>Customize your game!</p>

      <ul class="categories">
        <li><Link class="category" href="/play?chapter=css">
          <picture>
            <source srcset="../static/img/character-painter.avif" type="image/avif" />
            <img src="../static/img/character-painter.png" />
          </picture>
          <h3>CSS</h3>
        </Link>
        </li>
        <li><Link class="category" href="/play?chapter=javascript">
          <picture>
            <source srcset="../static/img/character-hat.avif" type="image/avif" />
            <img src="../static/img/character-hat.png" />
          </picture>
          <h3>JavaScript</h3>
        </Link>
        </li>
      </ul>
    </div>
  );
};

export default Landing;
