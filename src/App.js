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
          return true;
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
  two = (massRank) => {
    console.log('two')
    let text = this.state.text;
    text = 'Две пары';
    let first = 0;
    let second = 0;
    let third = 0;
    let fourth = 0;
    const has2one = arr => {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
          first = 1
          i += 99
        }
      }
      first = 0;
    }
    const has2two = arr => {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
          second = 1;
          i += 99
        }
      }
      second = 0;
    }
    const has2three = arr => {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
          third = 1;
          i += 99
        }
      }
      third = 0;
    }
    const has2four = arr => {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
          fourth = 1;
          i += 99
        }
      }
      fourth = 0;
    }
    has2one(massRank)
    has2two(massRank)
    has2three(massRank)
    has2four(massRank)
    console.log(massRank)
    if (first + second == 2 || first + third == 2 || first + fourth == 2 || second + third == 2 || second + fourth == 2 || third + fourth == 2) {
      this.setState({
        text
      })
    }
  }
  royal = (massSuit, massRank) => {
    console.log('royal')
    let text = this.state.text;
    let suit = massSuit[0];
    let coincidenceSuit = 0;
    let coincidenceRank = false;
    for (let i = 0; i < massSuit.length; i++) {
      if (suit === massSuit[i]) {
        coincidenceSuit++
      }
    }
    for (let i = 0; i < massRank.length; i++) {
      switch (massRank[i]) {
        case 'A':
        case 'K':
        case 'Q':
        case 'J':
        case 10:
          coincidenceRank = true;
          break;
        default:
          coincidenceRank = false;
          i += 99
      }
    }
    text = 'Роял-флеш'
    if (coincidenceSuit == 5 && coincidenceRank) {
      this.setState({
        text
      })
    }
  }
  straight = (massRank) => {
    console.log('straight')
    let coincidenceSuit = false;
    let coincidenceRank = false;
    let nan = false;
    let text = this.state.text;
    if (isNaN(massRank[0]) || isNaN(massRank[4])) {
      coincidenceSuit = true;
    }
    for (let i = 1; i < 4; i++) {
      if (isNaN(massRank[i])) {
        i += 99;
        nan = false;
      } else {
        nan = true;
      }
    } 
    if (isNaN(massRank[0]) && massRank[1] - 1 == massRank[2] && massRank[2] - 1 == massRank[3] && massRank[3] - 1 == massRank[4] && nan) {
      coincidenceRank = true
    } else if (isNaN(massRank[4]) && massRank[0] - 1 == massRank[1] && massRank[1] - 1 == massRank[2] && massRank[2] - 1 == massRank[3] && nan) {
      coincidenceRank = true
    }
    text = 'Стрит'
    if (coincidenceRank && coincidenceSuit) {
      this.setState({
        text
      })
    }
  }
  straightFlush = (massSuit, massRank) => {
    console.log('straightFlush')
    let text = this.state.text;
    let suit = massSuit[0];
    let coincidenceSuit = 0;
    let coincidenceRank = false;
    for (let i = 0; i < massSuit.length; i++) {
      if (suit === massSuit[i]) {
        coincidenceSuit++
      }
    }
    text = 'Стрит-флеш'
    let lettersInRanks = false
    for (let i = 0; i < massRank.length; i++) {
      if (isNaN(massRank[i])) {
        lettersInRanks = false
      } else {
        lettersInRanks = true;
      }
    }
    if (!lettersInRanks && massRank[0] - 1 == massRank[1] && massRank[1] - 1 == massRank[2] && massRank[2] - 1 == massRank[3] && massRank[3] - 1 == massRank[4] && massRank[4] - 1 == massRank[5]) {
      coincidenceRank = true
    }
    if (coincidenceSuit == 5 && coincidenceRank) {
      this.setState({
        text
      })
    }
  }
  flush = (massSuit) => {
    console.log('flush')
    let text = this.state.text;
    text = 'Флеш';
    let nan = false;
    for (let i = 0; i < massSuit.length; i++) {
      if (isNaN(massSuit[i])) {
        nan = true;
      } else {
        nan = false;
        i += 99
      }
    }
    if (nan) {
      let coincidenceSuit = false;
      let suit = massSuit[0];
      for (let i = 0; i < massSuit.length; i++) {
        if (massSuit[i] !== suit) {
          i += 99
          coincidenceSuit = false;
        } else {
          coincidenceSuit = true;
        }
      }
      if (coincidenceSuit) {
        this.setState({
          text
        })
      }
    }
  }
  three = (massRank) => {
    console.log('three')
    let text = this.state.text;
    text = 'Тройка'
    const has3 = arr => {
      for (let i = 2; i < arr.length; i++) {
        if (arr[i] === arr[i - 1] && arr[i] === arr[i - 2]) {
          return true;
        }
      }
      return false;
    }
    if (has3(massRank)) {
      this.setState({
        text
      })
    }     
  }
  full = (massRank) => {
    console.log('full')
    let text = this.state.text;
    text = 'Фулл-хаус'
    let nan = true;
    for(let i = 0; i < massRank.length; i++) {
      if (isNaN(massRank[i])) {
        nan = false
      }
    }
    if (nan) {
      let coincidenceRankTrio = false;
      let coincidenceRankDuo = false;
      let trioRank = massRank[0]
      let duoRank = massRank[3]
      for (let i = 0; i < 3; i++) {
        if (massRank[i] != trioRank) {
          coincidenceRankTrio = false;
          i += 99
        } else {
          coincidenceRankTrio = true;
        }
      }
      for (let i = 3; i < 5; i++) {
        if (massRank[i] != duoRank) {
          coincidenceRankDuo = false;
          i += 99
        } else {
          coincidenceRankDuo = true
        }
      }
      if (coincidenceRankTrio && coincidenceRankDuo) {
        this.setState({
          text
        })
      }
    }
  }
  poker = (massSuit, massRank) => {
    console.log('poker')
    let text = this.state.text;
    let suit = massSuit[0];
    let rank = massRank[0];
    let coincidenceSuit = 0;
    let coincidenceRank = 0;
    for (let i = 0; i < massSuit.length - 1; i++) {
      if (suit === massSuit[i]) {
        coincidenceSuit++
      }
      if(rank == massRank[i]) {
        coincidenceRank++
      }
    }
    text = 'Покер';
    if (coincidenceSuit == 4 && coincidenceRank == 4) {
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
    this.royal(suits, ranks)
    this.straightFlush(suits, ranks)
    this.poker(suits, ranks)
    this.straight(ranks)
    this.full(ranks)
    this.flush(suits)
    this.two(ranks)
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
