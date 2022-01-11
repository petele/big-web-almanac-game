import { h, Component } from 'preact';

class Results extends Component {

  logScore(score) {
    gtag('event', 'score', {
      value: score
    });
  }

  renderResponses(questions) {
    return (
      <div class="responses">
      { questions.map((q, i) => {
        return (
          <div className={`response ${q.answerCorrect ? 'correct' : 'incorrect'}`}>
            <h3 class="result-q">{i + 1}. {q.question}</h3>
            <p class="result-a">
              {q.answerUser}&nbsp;
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
    const shareText = `The Big Web Almanac Quiz (${correct}/${total})

${questions.map(({answerCorrect}) => answerCorrect ? '🟩' : '⬜️').join('')}

https://big-web-almanac-game.web.app/`;

    return (
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}>Share your results</a>
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
        <h1 class="result-header">{score}% correct out of <span>{total}!</span></h1>
        <p class="result-subhead">Nice job! In 60 seconds, you answered <span>{correct}</span> questions correctly out of <span>{total}</span> total questions attempted.</p>

        {this.renderShareButton(correct, total, state.questions.questionsPlayed)}

        {this.renderResponses(state.questions.questionsPlayed)}
      </div>
    );
  }
}

export default Results;
