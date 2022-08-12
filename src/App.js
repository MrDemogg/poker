import React, { Component } from 'react';
import './App.css';
import './cards.css';

class App extends Component {
  state = {
    cards: []
  }
  Card = (props) => {
    let rank = props.rank
    const suits = {'H': '♥', 'D': '♦', 'C': '♣', 'S': '♠'};
    const getSuit = (suit) => {
      let returnSuit = '';
      let i = 0
      for (let key in suits) {
        if (key === suit) {
          returnSuit = Object.values(suits)[i]
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
    const rankClass = (rank) => {
      if (isNaN(rank)) {
        return rank.toLowerCase();
      } else {
        return Number(rank)
      }
    }
    return (
      <div className={`card rank-${rankClass(rank)} ${color}`}>
        <span className="rank">{rank}</span>
        <span className="suit">{returnSuit}</span>
      </div>
    )
  }
  randomCards = () => {
    const newCards = this.state.cards;
    newCards.length = 0;
    const suits = ['H', 'D', 'C', 'S'];
    const ranks = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2]
    for (let i = 0; i < 5; i++) {
      let randSuitNum = Math.floor(Math.random() * suits.length);
      let randRankNum = Math.floor(Math.random() * ranks.length);
      let randSuit = suits[randSuitNum];
      let randRank = ranks[randRankNum];
      console.log(randSuit)
      console.log(randRank)
      newCards.push({rank: randRank, suit: randSuit})
    }
    console.log(newCards)
    this.setState({
      newCards
    })
  }
  render() {
    return (
      <div className="cards">
        <center><button className="cards__refresh" onClick={() => this.randomCards()}>Refresh</button></center>
        <div className="playingCards">
          {this.state.cards.map((card) => {
            return <this.Card suit={card.suit} rank={card.rank}></this.Card>
          })}
        </div>
      </div>
    )
  }
}

export default App;
