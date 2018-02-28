import React, { Component } from 'react';
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
      searchTerm: '',
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    // filter、map、reduce 等都是纯函数式的，没有副作用，返回的也都是新的数组
    const updateList = this.state.list.filter(isNotId);
    this.setState({ list: updateList });
  };

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { list: listState, searchTerm } = this.state; //使用结构赋值的方式
    const msg = 'welcome to the Road to learn React111';
    debugger;
    return (
      <div className="App">
        <h2>{msg}</h2>
        <form action="">
          输入查询名称：
          <input
            type="text"
            onChange={this.onSearchChange}
            value={searchTerm} //受控组件的写法
          />
        </form>
        {listState
          .filter(listItem =>
            listItem.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(item => (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <button onClick={() => this.onDismiss(item.objectID)}>
                Dismiss
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
