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
      <div className="page">
        <div className="interactions">
          <Search value={this.state.searchTerm} onChange={this.onSearchChange}>
            输入查询名称：{/* children的使用 */}
          </Search>
        </div>
        <Table
          list={listState}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <form action="">
    {children}
    <input
      type="text"
      onChange={onChange}
      value={value} //受控组件的写法
    />
  </form>
);

const Table = ({ list: listData, pattern, onDismiss }) => {
  const largeColumn = { width: '40%' };
  const midColumn = { width: '30%' };
  const smallColumn = { width: '10%' };
  return (
    <div className="table">
      {listData
        .filter(listItem =>
          listItem.title.toLowerCase().includes(pattern.toLowerCase())
        )
        .map(item => (
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <Button
              style={smallColumn}
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </div>
        ))}
    </div>
  );
};
//es6的方式设置默认值
const Button = ({ children, onClick, className = '' }) => (
  <button type="button" onClick={onClick} className={className}>
    {children}
  </button>
);

export default App;
