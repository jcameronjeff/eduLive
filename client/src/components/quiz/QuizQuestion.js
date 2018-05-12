import React from "react";
import AnswerOption from "./AnswerOption";
import QuizData from "../../data/quizData.js";

const shuffleArray = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

class QuizQuestion extends React.Component {
  state = {
    question: "",
    options: [],
    answer: "",
    questionIndex: 0,
    quiz: []
  };

  componentDidMount() {
    console.log(QuizData);
    //fetch quiz from API
    this.setState({
      quiz: QuizData
    });
    //set initial quiz question
    this.setQuestion();
  }

  //sets each new question/options/answer chronologically from quiz stored in state
  setQuestion = () => {
    if (this.state.questionIndex === 12) {
      console.log("over");
    } else {
      this.setState({
        answer: this.state.quiz[this.state.questionIndex].correct_answer,
        question: this.state.quiz[this.state.questionIndex].question
      });
      this.formatOptionArray();
    }
  };

  //pushes answer onto option array and shuffles array
  formatOptionArray = () => {
    let answer = this.state.quiz[this.state.questionIndex].correct_answer;
    let options = this.state.quiz[this.state.questionIndex].incorrect_answers;
    options.push(answer);
    shuffleArray(options);
    this.setState({
      options: options
    });
  };

  handleUserGuess = e => {
    console.log(e, e.target.textContent, this.state.answer);
    if (e.target.textContent === this.state.answer) {
      let questionIndex = ++this.state.questionIndex;
      this.setState({
        questionIndex: questionIndex
      });
      this.setQuestion();
    } else {
      console.log("wrong");
    }
  };

  render() {
    return !this.state.quiz.length ? (
      <div className="container"> Loading question </div>
    ) : (
      <div className="container">
        <div>
          <h3 questions={this.state.question} />
          <AnswerOption
            options={this.state.options}
            answer={this.state.answer}
            handleUserGuess={this.handleUserGuess}
          />
        </div>
      </div>
    );
  }
}

export default QuizQuestion;
