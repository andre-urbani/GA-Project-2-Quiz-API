import React from 'react'
import axios from 'axios'

class Quiz extends React.Component {
  

  constructor() {
    super()
    this.state = {
      quiz: [],
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
        axios.get(`https://opentdb.com/api.php?amount=10&category=${this.state.category}&difficulty=${this.state.difficulty}`)
          .then(res => this.setState({ quiz: res.data }))
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
    e.preventDefault()
    this.setState(
      {
        answer: e.currentTarget.innerText 
      }
    )
    console.log(this.state.answer)

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

  render() {
    
    

    if (this.state.quiz.length === 0) {
      return <div>Loading...</div>
    }
    return <div className="container">
      <div>{this.state.quiz.results[`${this.state.questionNo}`].question}</div>
      <div  className="control" >
        <label onChange={(e) => this.handleChange(e)} className="radio">
          <input type="radio" name="answer"/>
          {this.state.quiz.results[`${this.state.questionNo}`].correct_answer}
        </label>

        {this.state.quiz.results[`${this.state.questionNo}`].incorrect_answers.map((answers, i) => {
          return <label key={i} className="radio" onChange={(e) => this.handleChange(e)}>
            <input type="radio" name="answer" />
            {answers}
          </label>


        })}

      </div>
      <div className="container">
        <button className="button" onClick={(e) => this.addToScore(e)}>Submit Answer</button>
        <button className="button" onClick={(e) => this.handleClick(e)}>Next Question</button>
      </div>
    </div>


  }
}

export default Quiz