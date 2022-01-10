import { h } from 'preact';

const Question = (props) => {

  return (
      <div class="question-block">
        <h2 class="question">
            <span class="question-num">{props.num}. </span> 
            {props.q}
        </h2>
      <div class="answers">
        <ul class="answer-list">
          <li>{props.a1}</li>
          <li>{props.a2}</li>
          <li>{props.a3}</li>
          <li>{props.a4}</li>
        </ul>
      </div>
    </div>
  );
};

export default Question;
