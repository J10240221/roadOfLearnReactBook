import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './App';

Enzyme.configure({ adapter: new Adapter() });

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
  const props = {
    onSubmit: () => {},
    onChange: () => {},
  };
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search {...props}>Search</Search>, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Search {...props}>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  const props = {
    className: 'button-inline',
    onClick: () => {},
  };
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button {...props}>More</Button>, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Button {...props}>more</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows one item in list', () => {
    const element = shallow(<Button {...props}>More</Button>);
    expect(element.find('.button-inline').length).toBe(1);
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
        objectID: '0',
      },
      {
        title: 'Redux',
        url: 'www.hao123.com',
        author: 'Bzhilingege',
        num_comments: 2,
        points: 5,
        objectID: '1',
      },
    ],
    onDismiss: () => {},
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

  it('show tow items in list', () => {
    const element = shallow(<Table {...props} />);
    expect(element.find('.table-row').length).toBe(3);
  });
});
