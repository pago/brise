import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { styled, styles, property } from '../.';

interface TextProps {
  important?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const withImportant = styles<TextProps>`
  ${props => (props.important ? 'text-bold' : '')}
`;

// type is figured out because of the `withImportant`
const Headline: React.FC<TextProps> = styled.h1`
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

const Text: React.FC<TextProps> = styled.p<TextProps>`
  text-xl
  ${props => (props.important ? 'font-bold' : '')}
`;

const App = () => {
  return (
    <>
      <Headline size="small">Hello World</Headline>
      <Text size="medium">This is my new website</Text>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
