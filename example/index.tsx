import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from 'emotion';
import { tw, styles, property } from '../.';

interface TextProps {
  important?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const withImportant = styles<TextProps>`
  ${props => (props.important ? 'text-bold' : '')}
`;

// type is figured out because of the `withImportant`
const Headline: React.FC<TextProps> = tw.h1`
  text-blue-600
  ${property(
    'size',
    {
      small: 'text-2xl',
      medium: styles`text-4xl`,
      large: 'text-6xl',
    },
    'medium'
  )}
  ${withImportant}
`;

const UnderlinedHeadline = tw(Headline)`
  underline
`;

const Text: React.FC<TextProps> = tw.p<TextProps>`
  text-xl
  ${props => (props.important ? 'font-bold' : '')}
`;

const Button = tw.button<TextProps>`
  py-2 px-4
  border border-transparent
  rounded
  bg-blue-500
  text-white
  hover:bg-blue-700
  ${css`
    &:hover {
      text-decoration: underline;
    }
  `}
`;

const App = () => {
  return (
    <>
      <UnderlinedHeadline size="small">Hello World</UnderlinedHeadline>
      <Text size="medium">This is my new website</Text>
      <Button>Click me</Button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
