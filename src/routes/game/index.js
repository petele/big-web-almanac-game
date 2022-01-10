import { h, Component } from 'preact';
import Question from '../../components/question.js';
import Timer from '../../components/timer.js';
import { getNewQuestion, savePlayedQuestion } from '../../components/questions';

// Game state and timer

class Game extends Component {
  state = {
    currentQuestion: getNewQuestion(),
  };

  _butNextQuestion = null;


  componentDidMount() {
    this._butNextQuestion.addEventListener('click', () => {
      const currentQuestion = this.state.currentQuestion;
      currentQuestion.answer = 'pete';
      savePlayedQuestion(currentQuestion);
      this.setState({ currentQuestion: getNewQuestion() });
    });
  }

  render(props, state) {
    return (
      <div class="container">
        <Timer />
        <Question
          q={state.currentQuestion.Clue}
          num="1"
          a1="Answer 1"
          a2="Answer 2"
          a3="Answer 3"
          a4="Answer 4"
        />
        <button id="butNextQuest" ref={el => { this._butNextQuestion = el }}>Next Question</button>
      </div>
    );
  }
}

export default Game;
