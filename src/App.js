import React, { Component } from 'react';
import './App.css';
import './cards.css';

class App extends Component {
  state = {
    cards: [],
    text: '',
    ranks: ['A', 'Q', 'K', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2],
    suits: ['H', 'D', 'C', 'S'],
    usedRanks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    usedSuits: [0, 0, 0, 0],
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
    if (this.state.cards.length !== 0 || this.state.text !== 'Карты закончились') {
      const cards = this.state.cards;
      const usedRanks = this.state.usedRanks;
      const usedSuits = this.state.usedSuits
      let text = this.state.text;
      cards.length = 0;
      text = '';
      this.setState({
        text
      })
      const suits = this.state.suits;
      const ranks = this.state.ranks;
      for (let i = 0; i < 5; i++) {
        let randSuitNum = Math.floor(Math.random() * suits.length);
        let randRankNum = Math.floor(Math.random() * ranks.length);
        let randRank = ranks[randRankNum];
        let randSuit = suits[randSuitNum];
        cards.push({rank: randRank, suit: randSuit})
        usedRanks[randRankNum]++
        usedSuits[randSuitNum]++
        this.setState({
          usedRanks,
          usedSuits,
          suits,
          ranks
        })
      }
      this.setState({
        cards
      })
      this.arm()
    }
  }
  detecter = (massRank, massSuit) => {
    if (this.state.cards.length !== 0 || this.state.text !== 'Карты закончились') {
      let text = this.state.text;
      const text1 = 'Одна пара';
      const text2 = 'Две пары';
      const text3 = 'Тройка';
      const text4 = 'Покер';
      const text5 = 'Фулл-хаус';
      const text6 = 'Флэш';
      const text7 = 'Стрит'
      const rank5A = massRank[0];
      const rank5B = massRank[3];
      let rank5Bbull = false;
      let rank5Abull = false;
      let namesRank = {};
      let namesSuit = {};
      function count(array, choice){
        if (choice === 1) {
          array.forEach(item => {
            namesRank[item] = (namesRank[item] || 0) + 1;
          });
        } else if (choice === 2) {
          array.forEach(item => {
            namesSuit[item] = (namesRank[item] || 0) + 1;
          })
        }
      }
      count(massRank, 1)
      count(massSuit, 2)
      console.log(namesRank)
      console.log(namesSuit)
      let repeatsRank = 0;
      let repeatsSuit = 0;
      for (let i in namesRank) {
        if (namesRank[i] === 2) {
          repeatsRank++
        } else if (namesRank[i] === 3) {
          repeatsRank = 3
        } else if (namesRank[i] === 4) {
          repeatsRank = 4
        }
      }
      let suitsLength = 0;
      for (let i in namesSuit) {
        console.log(i)
        suitsLength++
      }
      for (let i in namesSuit) {
        if (namesSuit[i] === 1 && suitsLength === 1) {
          repeatsSuit++
        }
      }
      if (repeatsRank === 1) {
        text = text1;
      } else if (repeatsRank === 2) {
        text = text2;
      } else if (repeatsRank === 3) {
        text = text3;
      } else if (repeatsRank === 4) {
        text = text4;
      } else {
        text = '';
      }
      for (let i = 0; i < 3; i++) {
        if (massRank[i] === rank5A) {
          rank5Abull = true;
        } else {
          rank5Abull = false;
          i += 99
        }
      }
      for (let i = 3; i < 5; i++) {
        if (massRank[i] === rank5B) {
          rank5Bbull = true;
        } else {
          rank5Bbull = false;
          i += 99
        }
      }
      if (rank5Abull && rank5Bbull) {
        text = text5;
      }
      console.log(repeatsSuit)
      if (repeatsSuit === 1) {
        text = text6
      }
      let numberArr = false;
      massRank.sort()
      for (let f = 1; f < massRank.length - 1; f++) {
        if (!isNaN(massRank[f])) {
          numberArr = true
        } else if (isNaN(massRank[f])) {
          numberArr = false;
          f += 99
        }
        if (numberArr && massRank[f - 1] + 1 === massRank[f] && massRank[4] === 'J') {
          text = text7
        }
      }
      this.setState({
        text
      })
    }
  }
  arm = () => {
    if (!this.state.empty) {
      const cards = this.state.cards
      const suits = [];
      const ranks = [];
      for (let i = 0; i < cards.length; i++) {
        suits.push(cards[i].suit)
        ranks.push(cards[i].rank)
      }
      this.detecter(ranks, suits)
    }
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
