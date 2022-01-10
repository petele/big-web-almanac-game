import { h, Component } from 'preact';

class Results extends Component {
  state = {
    correct: 8,
    total: 10
  };

  render(state) {
    return (
      <div class="container">
        <h2>Nice job! In 60 seconds, you answered <span>{state.correct}</span> questions correctly out of <span>{state.total}</span> total questions attempted.</h2>
      </div>
    );
  }
}

export default Results;