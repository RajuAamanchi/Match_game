import {Component} from 'react'

import './index.css'

import TabItem from '../TabItem'

import ThumbnailItem from '../ThumbnailItem'

const initialTime = 0

class Matchgame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainImageId: props.imagesList[0].id,
      score: initialTime,
      timerTime: 60,
      imagesList: props.imagesList,
      tabsList: props.tabsList,
      activeTabId: props.tabsList[0].tabId,
      isGameRunning: true,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.decreaseTimer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  decreaseTimer = () => {
    this.setState(prevState => {
      if (prevState.timerTime === 1) {
        clearInterval(this.timerId)
        return {timerTime: 0, isGameRunning: false}
      }
      return {timerTime: prevState.timerTime - 1}
    })
  }

  onClickTabItem = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickThumbnail = id => {
    const {imagesList, mainImageId} = this.state
    if (id === mainImageId) {
      const randomIndex = Math.floor(Math.random() * imagesList.length)
      const randomImage = imagesList[randomIndex]
      this.setState(prevState => ({
        score: prevState.score + 1,
        mainImageId: randomImage.id,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameRunning: false})
    }
  }

  restartGame = () => {
    clearInterval(this.timerId)
    this.timerId = setInterval(this.decreaseTimer, 1000)

    const {imagesList, tabsList} = this.props
    this.setState({
      mainImageId: imagesList[0].id,
      score: initialTime,
      timerTime: 60,
      activeTabId: tabsList[0].tabId,
      isGameRunning: true,
    })
  }

  render() {
    const {score, timerTime, activeTabId, mainImageId} = this.state
    const {imagesList, tabsList, isGameRunning} = this.state
    const filteredImagesList = imagesList.filter(
      image => image.category === activeTabId,
    )
    return (
      <div className="bg-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo"
          />
          <ul className="score-container">
            <li className="list-item">
              <p>Score: </p>
              <span className="span-element"> {score}</span>
            </li>
            <li className="list-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-icon"
              />
              <p className="span-element">{timerTime} sec</p>
            </li>
          </ul>
        </div>
        {isGameRunning ? (
          <>
            <div className="match-image-container">
              <img
                className="match-image"
                src={imagesList.find(img => img.id === mainImageId).imageUrl}
                alt="match"
              />
            </div>
            <ul className="tab-items-container">
              {tabsList.map(eachItem => (
                <TabItem
                  onClickTabItem={this.onClickTabItem}
                  tabItem={eachItem}
                  key={eachItem.tabId}
                  isActive={eachItem.tabId === activeTabId}
                />
              ))}
            </ul>
            <ul className="thumbnails-list-container">
              {filteredImagesList.map(eachItem => (
                <ThumbnailItem
                  onClickThumbnail={this.onClickThumbnail}
                  thumbnailItem={eachItem}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="game-over-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy-image"
            />
            <p className="score-card">YOUR SCORE</p>
            <p className="score-card final-score">{score}</p>
            <button
              onClick={this.restartGame}
              type="button"
              className="play-again-button"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />{' '}
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Matchgame
