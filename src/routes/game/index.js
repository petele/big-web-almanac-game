import { h } from 'preact';
import Question from './question.js';

// Game state and timer

const Game = () => {

  document.title = 'Big Web Almanac Quiz';

  return (
    <div class="container">
      {/* Send question, number, answers */}
      <Question 
        q="What is the meaning of life?" 
        num="1" 
        a1="Answer 1" 
        a2="Answer 2" 
        a3="Answer 3" 
        a4="Answer 4"
      />
    </div>
  );
};

export default Game;
