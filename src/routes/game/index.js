import { h, Component } from 'preact';
import Question from '../../components/question.js';
import Timer from '../../components/timer.js';
import Questions from '../../components/questions';
import Results from '../../components/results';
import { getChapter } from '../../components/questions';
import { getChapterName } from '../../util/almanac.js';

// Game state and timer

class Game extends Component {
  state = {
    isPlaying: true,
    startAt: Date.now(),
    chapter: getChapter()
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

  componentDidMount() {
    document.querySelector('.question-block').focus();
  }

  getNewQuestion() {
    return this.state.questions.getNewQuestion();
  }

  checkAnswerCorrect(user, actual) {
    return user == actual;
  }

  saveAndNextQuestion(answerUser, e) {
    const currentQuestion = this.state.currentQuestion;
    const answerActual = currentQuestion.answer;

    const isAnswerCorrect = this.checkAnswerCorrect(answerUser, answerActual);

    currentQuestion.answerUser = answerUser;
    currentQuestion.answerCorrect = isAnswerCorrect;

    this.logAnswer(currentQuestion);

    const clickedAnswer = e.target;
    const answers = document.querySelectorAll('.answer');

    clickedAnswer.classList.add('guessed');
    clickedAnswer.setAttribute('aria-label', isAnswerCorrect ? 'Correct!' : 'Incorrect.');

    [...answers].forEach((elem) => {
      elem.setAttribute('disabled', true);

      if (this.checkAnswerCorrect(elem.innerText, currentQuestion.answer)) {
        elem.classList.add('correct');
        setTimeout(() => elem.classList.remove('correct'), 1000);
      } else {
        elem.classList.add('incorrect');
        setTimeout(() => elem.classList.remove('incorrect'), 1000);
      }

      setTimeout(() => {
        elem.removeAttribute('disabled');
        elem.removeAttribute('aria-label');
        elem.classList.remove('guessed');
      }, 1000);
    });

    this.state.questions.savePlayedQuestion(currentQuestion);
    this.showNextQuestion(1000);
  }

  logAnswer(question) {
    gtag('event', 'answer', {
      value: question.answerUser,
      correct: question.answerCorrect ? 1 : 0,
      question: question.question,
      chapter: question.chapterName
    });
  }

  showNextQuestion(timeout) {
    setTimeout(() => {
      const nextQuestion = this.getNewQuestion();
      if (nextQuestion) {
        this.setState({ currentQuestion: nextQuestion });
        requestAnimationFrame(() => {
          // Move focus to the next question.
          document.querySelector('.question-block').focus();
        });
        return;
      }
      this.setState({isPlaying: false});
    }, timeout);
  }

  _timerExpired() {
    this.setState({
      isPlaying: false,
      currentQuestion: null,
    });
  }

  render(props, state) {
    if (!state.isPlaying) {
      return (
        <Results
          questions={state.questions}
          install={props.install}
        />
      );
    }
    return (
      <div class="container">
        <Timer startAt={state.startAt} numSec="60" onTimerExpired={this._timerExpired.bind(this)} />
        {state.chapter && <h2 class="chapter-name">{getChapterName(state.chapter)} Edition</h2>}
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
