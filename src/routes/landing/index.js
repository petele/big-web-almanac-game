import { h } from 'preact';
import { Link } from 'preact-router/match';

const Landing = () => {

  document.title = 'Big Web Almanac Quiz';

  return (
    <div class="container">
      <h1>Big Web Almanac Quiz</h1>
      <p>
        <Link href="/play" aria-label="Start Quiz">
          Start Quiz
        </Link>
      </p>
    </div>
  );
};

export default Landing;
