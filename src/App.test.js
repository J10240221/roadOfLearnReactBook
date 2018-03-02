import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App, { Search, Button, Table } from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Search', () => {
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Search>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>More</Button>, div);
  });
  test('Button', () => {
    const component = renderer.create(<Button>more</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Table', () => {
  const props = {
    list: [
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
    ],
  };
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
