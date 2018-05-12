import React from "react";
import { PropTypes } from "prop-types";

const AnswerOption = props => (
  <div className="answer">
    {!props.options.length ? (
      <div>Loading options</div>
    ) : (
      props.options.map((cur, i) => (
        <li key={i} className="list-group-item" onClick={props.handleUserGuess}>
          <p id={cur}>{cur}</p>
        </li>
      ))
    )}
  </div>
);

export default AnswerOption;
