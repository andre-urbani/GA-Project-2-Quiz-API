import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => this.setState({ categories: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState(
      { [e.target.name]: e.target.value })
  }


  render() {

    if (this.state.categories.length === 0) {
      return <div className='spinner-container'><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    }
    return <div>
      <section className='hero is-medium is-info'>
        <div className='hero-body '>
          <div className='container'>
            <h1 className='title is-1 has-text-centered'>Ten Questions</h1>
            <h2 className='subtitle is 3 has-text-centered'>Test your skill...</h2>
          </div>
        </div>

      </section>
      <div className="start-container">
        <div className='select'>
          <select name='category' onChange={(e) => this.handleChange(e)}>
            <option>Select Category</option>

            <option value='9'>General Knowledge</option>
            <option value='10'>Entertainment: Books </option>
            <option value='11'>Entertainment: Film</option>
            <option value='12'>Entertainment: Music</option>
            <option value='13'>Entertainment: Musicals and Theatres</option>
            <option value='14'>Entertainment: Television</option>
            <option value='15'>Entertainment: Video Games</option>
            <option value='16'>Entertainment: Board Games</option>
            <option value='17'>Science and Nature</option>
            <option value='18'>Science: Computers</option>
            <option value='19'>Science: Mathematics</option>
            <option value='20'>Mythology</option>
            <option value='21'>Sports</option>
            <option value='22'>Geography</option>
            <option value='23'>History</option>
            <option value='24'>Politics</option>
            <option value='25'>Art</option>
            <option value='26'>Celebrities</option>
            <option value='27'>Animals</option>
            <option value='28'>Vehicles</option>
            <option value='29'>Entertainment: Comics</option>
            <option value='30'>Science: Gadgets</option>
            <option value='31'>Entertainment: Japanese Anime and Manga</option>
            <option value='32'>Entertainment: Cartoon and Animations</option>

          </select>

        </div>
        <div className='select'>
          <select name='difficulty' onChange={(e) => this.handleChange(e)}>
            <option >Select Difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>

          </select>
        </div>

      </div>
      <div className="start-quiz">
        <div>
          <Link className='button button-start' to={{
            pathname: '/quiz',
            state: this.state
          }}>Start Quiz
          </Link>
        </div>
      </div>
    </div>
  }

}

export default Home