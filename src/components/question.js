import { h } from 'preact';

const Question = (props) => {

  return (
    <div class="question-block" aria-live="polite">
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
};

export default Question;
