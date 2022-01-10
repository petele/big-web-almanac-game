import { h, Component } from 'preact';

class Results extends Component {
  state = {
    correct: 8,
    total: 10
  };

  render(state) {
    const calcPercent = () => {
      return this.state.correct / this.state.total * 100;
    }

    return (
      <div class="container">
        <h2>{calcPercent()}% correct out of <span>{this.state.total}!</span></h2>
        <p>Nice job! In 60 seconds, you answered <span>{this.state.correct}</span> questions correctly out of <span>{this.state.total}</span> total questions attempted.</p>
      </div>
    );
  }
}

export default Results;