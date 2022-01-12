import { h, Component } from 'preact';

// const Question = (props) => {

class Question extends Component {

  componentDidMount() {
    window.addEventListener('keypress', this.keyPressHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.keyPressHandler);
  }

  keyPressHandler(e) {
    const buttons = document.querySelectorAll('.answer-list button.answer');
    if (e.key === '1') {
      buttons[0]?.click();
    } else if (e.key === '2') {
      buttons[1]?.click();
    } else if (e.key === '3') {
      buttons[2]?.click();
    } else if (e.key === '4') {
      buttons[3]?.click();
    }
  }

  render(props) {
    return (
      <div class="question-block" aria-live="polite" tabindex="0">
        <fieldset class="answers">
          <h2 class="question">
            <span class="question-num">{props.num}. </span>
            {props.q}
          </h2>
          <div class="answer-list">
            <button class="answer" onClick={props.answerClick}>{props.a1}</button>
            <button class="answer" onClick={props.answerClick}>{props.a2}</button>
            <button class="answer" onClick={props.answerClick}>{props.a3}</button>
            <button class="answer" onClick={props.answerClick}>{props.a4}</button>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default Question;
