import React from 'react'
import axios from 'axios'
import _ from 'lodash'

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
    // this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({ ...this.props.location.state },
      () => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${this.state.category}&difficulty=${this.state.difficulty}`)
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

  shuffle(array) {
    let j, x, i
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = array[i]
      array[i] = array[j]
      array[j] = x
    }
    return array
  }

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

  getAnswers() {
    const correctAnswer = [this.state.quiz.results[`${this.state.questionNo}`].correct_answer]
    const incorrectAnswers = this.state.quiz.results[`${this.state.questionNo}`].incorrect_answers
    let allAnswers = correctAnswer.concat(incorrectAnswers)
    allAnswers = this.shuffle(allAnswers)
    return allAnswers
  }

  // handleSubmit(e) {
  //   e.preventDefault()
  //   // console.log(e.target.innerText)
  //   this.setState(
  //     {
  //       answer: e.target.innerText
  //     }
  //   )
  //   console.log(e.target.innerText)

  // }



  // const allAnswers = this.getAnswers()

  render() {
    console.log(this.state.score)
    console.log(this.state.answer)
    if (this.state.quiz.length === 0) {
      return <div>Loading...</div>
    }

    return <div className="section has-text-centered">
      <div className="title has-text-centered">
        <div>{this.state.quiz.results[`${this.state.questionNo}`].question}</div>
        <div className="container has-text-centered">
          <div className="section">

            {this.state.allAnswers[`${this.state.questionNo}`].map((answers, i) => {
              return <button key={i} className="button is-info is-outlined" onClick={(e) => this.handleChange(e)}> {answers}</button>

            })}



          </div>
        </div>
        <div className="container has-text-centered">
          <button className="button is-info is-outlined" onClick={(e) => { this.addToScore(e); this.handleClick(e) }}>Submit Answer</button>
          {/* <button className="button is-info is-outlined" onClick={(e) => this.handleClick(e)}>Next Question</button> */}

          {/* onClick={function(event){ func1(event); func2();}} */}

        </div>
        <section className="section">
          <div className="section">
            <h2 className="subtitle is-4">Score:{this.state.score}</h2>
          </div>

        </section>
      </div>
    </div>




    // if (this.state.quiz.length === 0) {
    //   return <div>Loading...</div>
    // }

    // return <div className="container">
    //   <div className="container">
    //     <div>{this.state.quiz.results[`${this.state.questionNo}`].question}</div>
    //     <div className="control" >
    //       <label onChange={(e) => this.handleChange(e)} className="radio">
    //         <input type="radio" name="answer" />
    //         {answers}
    //       </label>
    //     </div>
    //   </div>
    //   <div className="container">
    //     <button className="button" onClick={(e) => this.addToScore(e)}>Submit Answer</button>
    //     <button className="button" onClick={(e) => this.handleClick(e)}>Next Question</button>
    //   </div>
    // </div>

  }
}

export default Quiz