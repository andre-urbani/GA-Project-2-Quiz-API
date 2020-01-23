import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Link } from 'react-router-dom'

class Quiz extends React.Component {


  constructor() {
    super()
    this.state = {
      quiz: [],
      allAnswers: [],
      category: '',
      difficulty: '',
      questionNo: 0,
      score: 0,
      answer: ''
    }

  }

  componentDidMount() {
    this.setState({ ...this.props.location.state },
      () => {
        axios.get(`https://opentdb.com/api.php?amount=11&category=${this.state.category}&difficulty=${this.state.difficulty}`)
          .then(res => {
            const allAnswers = res.data.results.map(quiz => {
              const correctAnswer = [quiz.correct_answer]
              const incorrectAnswers = quiz.incorrect_answers
              const shuffledAnswers = _.shuffle(correctAnswer.concat(incorrectAnswers))
              return shuffledAnswers
            })
            this.setState({ quiz: res.data, allAnswers })
          })
          .catch(err => console.log(err))
      })
  }


  handleClick(e) {
    e.preventDefault()
    this.setState(
      {
        questionNo: this.state.questionNo + 1
      }
    )
  }

  handleChange(e) {
    this.setState(
      {
        answer: e.target.innerText
      }
    )

  }

  // shuffle(array) {
  //   let j, x, i
  //   for (i = array.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1))
  //     x = array[i]
  //     array[i] = array[j]
  //     array[j] = x
  //   }
  //   return array
  // }

  addToScore(e) {
    e.preventDefault()
    if (this.state.answer === this.state.quiz.results[`${this.state.questionNo}`].correct_answer) {
      this.setState(
        {
          score: this.state.score + 1
        }
      )
    } else return

  }

  // getAnswers() {
  //   const correctAnswer = [this.state.quiz.results[`${this.state.questionNo}`].correct_answer]
  //   const incorrectAnswers = this.state.quiz.results[`${this.state.questionNo}`].incorrect_answers
  //   let allAnswers = correctAnswer.concat(incorrectAnswers)
  //   allAnswers = this.shuffle(allAnswers)
  //   return allAnswers
  // }


  render() {
    console.log(this.state.score)
    console.log(this.state.answer)
    if (this.state.quiz.length === 0) {
      return <div>Loading...</div>
    } else if (this.state.questionNo > 10) {
      return <div className="score-container">
        <div className="score">Your score is {this.state.score}</div>
        <div>
          <Link className='button button-start' to={{
            pathname: '/',
            state: this.state
          }}>Try Again
          </Link>
        </div>
      </div>
    }

    return <div className="section has-text-centered question-container">
      <div className="title has-text-centered">
        <div dangerouslySetInnerHTML={{
          __html: this.state.quiz.results[`${this.state.questionNo}`].question
        }} />
        <div></div>
        <div className="container has-text-centered">
          <div className="section">

            {this.state.allAnswers[`${this.state.questionNo}`].map((answers, i) => {
              return <button key={i} className="button is-info is-outlined" onClick={(e) => this.handleChange(e)} dangerouslySetInnerHTML={{
                __html: answers
              }} />

            })}



          </div>
        </div>
        <div className="container has-text-centered">
          <button className="button is-info is-outlined" onClick={(e) => { this.addToScore(e); this.handleClick(e) }}>Submit Answer</button>


        </div>
        <section className="section">
          <div className="section">
            <h2 className="subtitle is-4">Score:{this.state.score}</h2>
          </div>

        </section>
      </div>
    </div>


  }
}

export default Quiz