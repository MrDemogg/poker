import React, { Component } from 'react';
import './App.css';
import './cards.css';

class App extends Component {
  state = {
    cards: [],
    text: ''
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
    let text = this.state.text;
    newCards.length = 0;
    text = '';
    this.setState({
      text
    })
    const suits = ['H', 'D', 'C', 'S'];
    const ranks = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2]
    for (let i = 0; i < 5; i++) {
      let randSuitNum = Math.floor(Math.random() * suits.length);
      let randRankNum = Math.floor(Math.random() * ranks.length);
      let randSuit = suits[randSuitNum];
      let randRank = ranks[randRankNum];
      newCards.push({rank: randRank, suit: randSuit})
    }
    this.setState({
      newCards
    })
    this.arm()
  }
  one = (massRank) => {
    console.log('one')
    let text = this.state.text;
    text = 'Одна пара';
    const has2 = arr => {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
          return true
        }
      }
      return false;
    }
    if (has2(massRank)) {
      this.setState({
        text
      })
    }
    
  }
  arm = () => {
    console.log('arm')
    const newCards = this.state.cards
    const suits = [];
    const ranks = [];
    for (let i = 0; i < newCards.length; i++) {
      suits.push(newCards[i].suit)
      ranks.push(newCards[i].rank)
    }
    this.one(ranks)
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
        {this.state.text}
      </div>
    )
  }
}

export default App;
