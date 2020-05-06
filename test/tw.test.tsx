import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { tw } from '../src';

describe('it', () => {
  it('renders with classes', () => {
    const div = document.createElement('div');
    const Headline = tw.h1<any>`text-3xl`;
    ReactDOM.render(<Headline />, div);
    const elem = div.querySelector('h1');
    expect(elem).toBeDefined();
    expect(elem!.className).toEqual('text-3xl');
    ReactDOM.unmountComponentAtNode(div);
  });
});
