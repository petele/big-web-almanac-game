import { h, Component } from 'preact';
import Question from '../../components/question.js';
import Timer from '../../components/timer.js';
import Questions from '../../components/questions';
import Results from '../../components/results';

// Game state and timer

class Game extends Component {
  state = {
    isPlaying: true
  };

  _butNextQuestion = null;

  _clickAnswer(e) {
    const selectedAnswer = e.srcElement.innerText;
    this.saveAndNextQuestion(selectedAnswer, e);
  }

  componentWillMount() {
    this.state.questions = new Questions();
    this.state.currentQuestion = this.getNewQuestion();
  }

  getNewQuestion() {
    return this.state.questions.getNewQuestion();
  }

  saveAndNextQuestion(answer, e) {
    const currentQuestion = this.state.currentQuestion;
    currentQuestion.answerUser = answer;
    const wasAnswerCorrect = answer === currentQuestion.answer;
    currentQuestion.answerCorrect = wasAnswerCorrect;
    this.logAnswer(currentQuestion);
    const clickedAnswer = e.target;
    const answers = document.querySelectorAll('.answer');

    clickedAnswer.classList.add('guessed');

    [...answers].forEach((elem) => {
      elem.setAttribute('disabled', true);

      if (elem.innerText === currentQuestion.answer) {
        elem.classList.add('correct');
        setTimeout(() => elem.classList.remove('correct'), 1000);
      } else {
        elem.classList.add('incorrect');
        setTimeout(() => elem.classList.remove('incorrect'), 1000);
      };

      setTimeout(() => {
        elem.removeAttribute('disabled');
        elem.classList.remove('guessed');
      }, 1000);
    });

    this.state.questions.savePlayedQuestion(currentQuestion);
    this.showNextQuestion(1000);
  }

  logAnswer(question) {
    gtag('event', 'answer', {
      value: question.answerCorrect ? 1 : 0
    });
  }

  showNextQuestion(timeout) {
    setTimeout(() => {
      this.setState({ currentQuestion: this.getNewQuestion() });
    }, timeout);
  }

  _timerExpired() {
    this.setState({currentQuestion: null});
  }

  render(props, state) {
    if (!state.currentQuestion) {
      return (
        <Results
          questions={state.questions}
        />
      );
    }
    return (
      <div class="container">
        <Timer numSec="60" onTimerExpired={this._timerExpired.bind(this)} />
        <Question
          q={state.currentQuestion.question}
          num={state.questions.questionsPlayed.length + 1}
          a1={state.currentQuestion.options[0]}
          a2={state.currentQuestion.options[1]}
          a3={state.currentQuestion.options[2]}
          a4={state.currentQuestion.options[3]}
          answerClick={this._clickAnswer.bind(this)}
        />
      </div>
    );
  }
}

export default Game;
