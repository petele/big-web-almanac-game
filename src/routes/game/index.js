import { h, Component } from 'preact';
import Question from '../../components/question.js';
import Timer from '../../components/timer.js';
import Questions from '../../components/questions';
import Results from '../../components/results';

// Game state and timer

class Game extends Component {
  state = {
    isPlaying: true,
  };

  _butNextQuestion = null;

  _clickAnswer(e) {
    const selectedAnswer = e.srcElement.innerText;
    this.saveAndNextQuestion(selectedAnswer);
  }

  componentWillMount() {
    this.state.questions = new Questions();
    this.state.currentQuestion = this.getNewQuestion();
  }

  componentDidMount() {
    this._butNextQuestion.addEventListener('click', () => {
      this.saveAndNextQuestion();
    });
  }

  getNewQuestion() {
    return this.state.questions.getNewQuestion();
  }

  saveAndNextQuestion(answer) {
    const currentQuestion = this.state.currentQuestion;
    currentQuestion.answerUser = answer;
    const wasAnswerCorrect = answer === currentQuestion.answer;
    currentQuestion.answerCorrect = wasAnswerCorrect;
    this.state.questions.savePlayedQuestion(currentQuestion);
    this.showNextQuestion(2500);
  }

  showNextQuestion(timeout) {
    setTimeout(() => {
      this.setState({ currentQuestion: this.getNewQuestion() });
    }, timeout);
  }

  render(props, state) {
    if (!state.currentQuestion) {
      return (
        <Results
        />
      );
    }
    return (
      <div class="container">
        <Timer />
        <Question
          q={state.currentQuestion.question}
          num={state.questions.questionsPlayed.length}
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
