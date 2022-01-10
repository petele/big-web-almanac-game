import { h } from 'preact';
import { Link } from 'preact-router/match';

const Landing = () => {

  document.title = 'Big Web Almanac Quiz';

  return (
    <div class="container">
      <h1>Welcome to the Big Web Almanac Quiz</h1>
      <p>In this game, you'll have <strong>60 seconds</strong> to answer as many questions as you can about the web today. All questions in this game are statistics pulled from the 2021 <a href="https://almanac.httparchive.org/en/2021/">Web Almanac</a>, and are based on real data from thousands of live websites.</p>
      <p>So, are you ready?</p>
      <p>
        <Link href="/play" aria-label="Start Quiz">
          Start Quiz
        </Link>
      </p>
    </div>
  );
};

export default Landing;
