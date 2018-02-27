import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'www.baidu.com',
    author: 'Azhilingege',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'www.hao123.com',
    author: 'Bzhilingege',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
    };
  }

  handleDismiss = id => {
    let typeList = [...this.state.list]; // 应该使用深拷贝吧？
    typeList = typeList.filter(item => item.objectID !== id);
    this.setState({ list: typeList });
  };

  render() {
    const msg = 'welcome to the Road to learn React111';
    return (
      <div className="App">
        <h2>{msg}</h2>
        {this.state.list.map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <button onClick={() => this.handleDismiss(item.objectID)}>Dismiss</button>
          </div>
        ))}
      </div>
    ); 
  }
}

export default App;
