import { h, Component } from 'preact';

class Results extends Component {

  logScore(score) {
    gtag('event', 'score', {
      value: score
    });
  }

  renderResponses(questions) {
    if (!questions.length) {
      return;
    }

    return (
      <div class="responses">
      <h2>Let's review your results:</h2>
      { questions.map((q, i) => {
        return (
          <div className={`response ${q.answerCorrect ? 'correct' : 'incorrect'}`}>
            <h3 class="result-q">{i + 1}. {q.question}</h3>
            <p class="result-a">
              {q.answerUser}<br/>
              <span>
                ({
                  q.answerCorrect ?
                  'Correct!' :
                  <a href={`${q.chapterUrl}`} title={`Read the ${q.chapterName} chapter`}>Correct answer: {q.answer}</a>
                })
              </span>
            </p>
          </div>
        );
      }) }
      </div>
    );
  }

  renderShareButton(correct, total, questions) {
    const APP_URL = 'https://big-web-almanac-game.web.app/';
    let shareText;

    if (questions.length) {
      shareText = `The Big Web Almanac Quiz (${correct}/${total})

${questions.map(({answerCorrect}) => answerCorrect ? '🟩' : '⬜️').join('')}

${APP_URL}`;
    } else {
      shareText = `Test your knowledge of the state of the web with The Big Web Quiz!

${APP_URL}`
    }

    return (
      <a class="share-button" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}>
        <img src="../static/img/twitter-logo-blue.svg" />
        <p>Share your results</p>
      </a>
    );
  }

  render(state) {
    const total = state.questions.questionsPlayed.length
    const correct = state.questions.questionsPlayed.filter(question => {
      return question.answerCorrect;
    }).length;
    const score = total == 0 ? 0 : Math.floor(correct / total * 100);
    this.logScore(score);

    return (
      <div class="container">
        <div class="result-block" aria-live="polite">
          <h1 class="result-header">{score}% correct out of <span>{total}!</span></h1>
          <p class="result-subhead">Nice job! In 60 seconds, you answered <span>{correct}</span> {correct == 1 ? 'question' : 'questions'} correctly out of <span>{total}</span> {total == 1 ? 'question' : 'total questions'} attempted.</p>

          {this.renderShareButton(correct, total, state.questions.questionsPlayed)}
        </div>

        {this.renderResponses(state.questions.questionsPlayed)}
      </div>
    );
  }
}

export default Results;
