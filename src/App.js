import React, { Component } from 'react';
import './App.css';
import './cards.css';

class App extends Component {
  Card = (props) => {
    console.log(props.suit)
    console.log(props.rank)
    let rank = props.rank
    const suits = {'H': '♥', 'D': '♦', 'C': '♠', 'S': '♠'};
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
    return (
      <div className={`card rank-${rank.toLowerCase()} diams`}>
        <span className="rank">{rank}</span>
        <span className="suit">{getSuit(props.suit)}</span>
      </div>
    )
  }
  render() {
    return (
      <div className="playingCards">
        <this.Card rank="K" suit="C"></this.Card>
        <this.Card rank="A" suit="D"></this.Card>
      </div>
    )
  }
}

export default App;
