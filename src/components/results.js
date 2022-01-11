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
            <h3>{i + 1}. {q.question}</h3>
            <p>
              {q.answerUser}&nbsp;
              <span>
                ({q.answerCorrect ? 'Correct!' : `Correct answer: ${q.answer}`})
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
        <h2>{score}% correct out of <span>{total}!</span></h2>
        <p>Nice job! In 60 seconds, you answered <span>{correct}</span> questions correctly out of <span>{total}</span> total questions attempted.</p>

        {this.renderShareButton(correct, total, state.questions.questionsPlayed)}

        {this.renderResponses(state.questions.questionsPlayed)}
      </div>
    );
  }
}

export default Results;
