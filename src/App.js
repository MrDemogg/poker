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
  detecter = (massRank) => {
    console.log('one')
    let text = this.state.text;
    const text1 = 'Одна пара';
    const text2 = 'Две пары';
    const text3 = 'Тройка';
    const text4 = 'Покер';
    const text5 = 'Фулл-хаус';
    const rank5A = massRank[0];
    const rank5B = massRank[3];
    let rank5Bbull = false;
    let rank5Abull = false;
    let names = {};
    function count(array){
      array.forEach(item => {
        names[item] = (names[item] || 0) + 1;
      });
    }
    count(massRank)
    console.log(names)
    let duo = 0;
    for (let i in names) {
      console.log(names[i])
      if (names[i] == 2) {
        duo++
      } else if (names[i] == 3) {
        duo = 3
      } else if (names[i] == 4) {
        duo = 4
      }
    }
    if (duo == 1) {
      text = text1;
    } else if (duo == 2) {
      text = text2;
    } else if (duo == 3) {
      text = text3;
    } else if (duo == 4) {
      text = text4;
    } else {
      text = '';
    }
    for (let i = 0; i < 3; i++) {
      if (massRank[i] == rank5A) {
        rank5Abull = true;
      } else {
        rank5Abull = false;
        i += 99
      }
    }
    for (let i = 3; i < 5; i++) {
      if (massRank[i] == rank5B) {
        rank5Bbull = true;
      } else {
        rank5Bbull = false;
        i += 99
      }
    }
    if (rank5Abull && rank5Bbull) {
      text = text5;
    }
    this.setState({
      text
    })
    
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
    this.detecter(ranks)
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
