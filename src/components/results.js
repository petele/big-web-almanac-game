import { h, Component } from 'preact';

class Results extends Component {

  clickInstall() {
    if (!this.props.install) {
      console.log('no beforeInstallPrompt event');
      return;
    }
    this.props.install.prompt();
  }

  logScore(correct, total, score, questions) {
    gtag('event', 'score', {
      value: total == 0 ? 0 : correct / total,
      correct,
      total,
      score: `${score}%`,
      chapter: questions.chapter ? questions.chapterName : undefined
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
    let edition = '';
    const APP_URL = new URL('https://big-web-almanac-game.web.app/');
    if (questions.chapter) {
      APP_URL.searchParams.append('chapter', questions.chapter);
      edition = `: ${questions.chapterName} edition`;
    }

    let shareText;

    if (questions.questionsPlayed.length) {
      shareText = `The Big Web Almanac Quiz${edition} (${correct}/${total})

${questions.questionsPlayed.map(({answerCorrect}) => answerCorrect ? '🟩' : '⬜️').join('')}

${APP_URL}`;
    } else {
      shareText = `Test your knowledge of the state of the web with The Big Web Quiz!

${APP_URL}`
    }

    return (
      <a class="share-button" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}>
        <img src="/img/twitter-logo-blue.svg" />
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
    this.logScore(correct, total, score, state.questions);

    return (
      <div class="container">
        <div class="result-block" aria-live="polite">
          <h1 class="result-header">{score}% correct out of <span>{total}!</span></h1>
          <p class="result-subhead">Nice job! In 60 seconds, you answered <span>{correct}</span> {correct == 1 ? 'question' : 'questions'} correctly out of <span>{total}</span> {total == 1 ? 'question' : 'total questions'} attempted.</p>

          {this.renderShareButton(correct, total, state.questions)}

          <div class="next-step-buttons">
            {this.props.install &&
              <button onClick={this.clickInstall.bind(this)} class="install-button">Install</button>
            }
            <button onClick={() => window.location.reload()} class="play-again">Play Again</button>
          </div>
        </div>

        {this.renderResponses(state.questions.questionsPlayed)}
      </div>
    );
  }
}

export default Results;
