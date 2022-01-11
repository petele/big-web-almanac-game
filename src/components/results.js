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
                ({q.answerCorrect ? 'Correct!' : `Correct answer: ${q.answer}`})
              </span>
            </p>
          </div>
        );
      }) }
      </div>
    );
  }

  render(state) {
    const total = state.questions.questionsPlayed.length
    const correct = state.questions.questionsPlayed.filter(question => {
      return question.answerCorrect;
    }).length;
    const score = Math.floor(correct / total * 100);
    this.logScore(score);

    return (
      <div class="container">
        <h1 class="result-header">{score}% correct out of <span>{total}!</span></h1>
        <p class="result-subhead">Nice job! In 60 seconds, you answered <span>{correct}</span> questions correctly out of <span>{total}</span> total questions attempted.</p>

        {this.renderResponses(state.questions.questionsPlayed)}
      </div>
    );
  }
}

export default Results;
