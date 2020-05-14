import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { tw } from '../src';

describe('tw', () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement('div');
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  const render = (Component: React.ReactElement) => {
    ReactDOM.render(Component, container);
  };

  const findBySelector = (query: string) => {
    return container.querySelector(query);
  };

  it('renders with classes', () => {
    const Headline = tw.h1<any>`text-3xl`;
    render(<Headline />);

    const elem = findBySelector('h1');
    expect(elem).toBeDefined();
    expect(elem!.className).toEqual('text-3xl');
  });

  it('allows changing the tag', () => {
    const Headline = tw.h1<any>`text-2xl`;
    render(<Headline as="h2" />);

    const elem = findBySelector('h2');
    expect(findBySelector('h1')).toBeNull();
    expect(elem).toBeDefined();
    expect(elem!.classList.contains('text-2xl')).toBeTruthy();
  });
});
