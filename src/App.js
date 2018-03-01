import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = 2;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

// const list = [
//   {
//     title: 'React',
//     url: 'www.baidu.com',
//     author: 'Azhilingege',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'www.hao123.com',
//     author: 'Bzhilingege',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.hpp = DEFAULT_HPP; //每页数据条数
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  //发起请求的好时机
  componentDidMount() {
    this.fetchSearchTopStories(this.state.searchTerm);
  }

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    // filter、map、reduce 等都是纯函数式的，没有副作用，返回的也都是新的数组
    const updateHits = this.state.result.hits.filter(isNotId);
    const updateResult = {
      ...this.state.result,
      hits: updateHits,
    };
    this.setState({ result: updateResult });
  };

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories(result) {
    const { page = 0, hits } = result;
    const oldHits = page === 0 ? [] : this.state.result.hits;
    const updateResult = {
      ...this.state.result,
      hits: [...oldHits, ...hits],
      page,
    };
    this.setState({ result: updateResult });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${
        this.hpp
      }`
    )
      .then(res => res.json())
      .then(json => this.setSearchTopStories(json))
      .catch(e => e);
  }

  render() {
    const { result, searchTerm } = this.state; //使用结构赋值的方式
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={this.state.searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            搜索{/* children的使用 */}
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <Button
            onClick={() => {
              this.fetchSearchTopStories(searchTerm, page + 1);
            }}
          >
            more
          </Button>
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      onChange={onChange}
      value={value} //受控组件的写法
    />
    <button type="submit">{children}</button>
  </form>
);

const Table = ({ list, onDismiss }) => {
  const largeColumn = { width: '40%' };
  const midColumn = { width: '30%' };
  const smallColumn = { width: '10%' };
  return (
    <div className="table">
      <div className="table-row">
        <span style={largeColumn}>title</span>
        <span style={midColumn}>author</span>
        <span style={smallColumn}>num_comments</span>
        <span style={smallColumn}>points</span>
        <span style={smallColumn}>operation</span>
      </div>
      {list &&
        list.map(item => (
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
