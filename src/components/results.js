import { h, Component } from 'preact';

class Results extends Component {

  render(state) {
    const total = state.questions.questionsPlayed.length;
    const correct = state.questions.questionsPlayed.filter(question => {
      return question.answerCorrect;
    }).length;
    const calcPercent = () => {
      return Math.floor(correct / total * 100);
    }

    return (
      <div class="container">
        <h2>{calcPercent()}% correct out of <span>{total}!</span></h2>
        <p>Nice job! In 60 seconds, you answered <span>{correct}</span> questions correctly out of <span>{total}</span> total questions attempted.</p>
      </div>
    );
  }
}

export default Results;
