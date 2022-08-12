import React, { Component } from 'react';
import './App.css';
import './cards.css';

class App extends Component {
  Card = (props) => {
    console.log(props.suit)
    console.log(props.rank)
    let rank = props.rank
    const suits = {'H': '♥', 'D': '♦', 'C': '♣', 'S': '♠'};
    const getSuit = (suit) => {
      let returnSuit = '';
      let i = 0
      for (let key in suits) {
        console.log(key)
        if (key === suit) {
          returnSuit = Object.values(suits)[i]
          console.log(returnSuit)
        }
        i++
      }
      return returnSuit
    }
    let returnSuit = getSuit(props.suit)
    let color = ''
    switch (returnSuit) {
      case '♥':
        color = 'hearts'
        break;
      case '♦': 
        color = 'diams'
        break;
      case '♣':
        color = 'clubs'
        break;
      case '♠':
        color = 'spades'
        break;
      default:
        color = 'N'
    }
    return (
      <div className={`card rank-${rank.toLowerCase()} ${color}`}>
        <span className="rank">{rank}</span>
        <span className="suit">{returnSuit}</span>
      </div>
    )
  }
  render() {
    return (
      <div className="cards">
        <button className="cards__refresh">Refresh</button>
        <div className="playingCards">
          <this.Card rank="K" suit="D"></this.Card>
        </div>
      </div>
    )
  }
}

export default App;
