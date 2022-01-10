import { h } from 'preact';

const Question = (props) => {

  return (
      <div class="question-block">
        <fieldset class="answers">
          <h2 class="question">
            <span class="question-num">{props.num}. </span> 
          {props.q}
          </h2>
          <div class="answer-list">
            <div class="answer">
              <input type="radio" id="a1" name={props.a1} value="a1" />
              <label for="a1">{props.a1}</label>
            </div>
            <div class="answer">
              <input type="radio" id="a2" name={props.a2} value="a2" />
              <label for="a2">{props.a2}</label>
            </div>
            <div class="answer">
              <input type="radio" id="a3" name={props.a3} value="a3" />
              <label for="a3">{props.a3}</label>
            </div>
            <div class="answer">
              <input type="radio" id="a4" name={props.a4} value="a4" />
              <label for="a4">{props.a4}</label>
            </div>
          </div>
      </fieldset>
    </div>
  );
};

export default Question;
