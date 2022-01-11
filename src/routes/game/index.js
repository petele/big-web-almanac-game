import { h, Component } from 'preact';
import Question from '../../components/question.js';
import Timer from '../../components/timer.js';
import { getNewQuestion, savePlayedQuestion } from '../../components/questions';

// Game state and timer

class Game extends Component {
  state = {
    currentQuestion: getNewQuestion()
  };

  _butNextQuestion = null;

  _clickAnswer(e) {
    const selectedAnswer = e.srcElement.innerText;
    this.saveAndNextQuestion(selectedAnswer);
  }

  componentDidMount() {
    this._butNextQuestion.addEventListener('click', () => {
      this.saveAndNextQuestion(e);
    });
  }

  saveAndNextQuestion(answer) {
    const currentQuestion = this.state.currentQuestion;
    currentQuestion.answerUser = answer;
    const wasAnswerCorrect = answer === currentQuestion.answer;
    currentQuestion.answerCorrect = wasAnswerCorrect;

    const answers = document.querySelectorAll('.answer');

    [...answers].forEach((elem) => {
      if (elem.innerText === currentQuestion.answer) {
        elem.classList.add('correct');
        setTimeout(() => elem.classList.remove('correct'), 900);
      } else {
        elem.classList.add('incorrect');
        setTimeout(() => elem.classList.remove('incorrect'), 900);
      }
    });

    savePlayedQuestion(currentQuestion);
    this.showNextQuestion(1000);
  }

  showNextQuestion(timeout) {
    setTimeout(() => {
      this.setState({ currentQuestion: getNewQuestion() });
    }, timeout);
  }

  render(props, state) {
    return (
      <div class="container">
        <Timer />
        <Question
          q={state.currentQuestion.question}
          num="1"
          a1={state.currentQuestion.options[0]}
          a2={state.currentQuestion.options[1]}
          a3={state.currentQuestion.options[2]}
          a4={state.currentQuestion.options[3]}
          answerClick={this._clickAnswer.bind(this)}
        />
        <button id="butNextQuest" ref={el => { this._butNextQuestion = el }}>Next Question</button>
      </div>
    );
  }
}

export default Game;
