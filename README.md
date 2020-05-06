# brise

A breeze of fresh air when using TailwindCSS.

`brise` offers an API that is very similar to styled-components but leverages TailwindCSS (or any other global CSS classnames) instead.

## Example

```js
import { tw } from 'brise';

const Headline = tw.h1`
  text-3xl
  text-blue-500
`;

const UnderlinedHeadline = tw(Headline)`
  underline
  ${props => (props.important ? 'font-bold' : '')}
`;
```

## Reusing property related styles

The `styles` helper can be used to create style compositions that can be reused across multiple components but maintain the ability to access properties.

```js
const withImportant = styles`
  ${props => (props.important ? 'text-bold' : '')}
`;

const Text = tw`
  text-base
  ${withImportant}
`;

const Headline = tw`
  text-3xl
  underline
  ${withImportant}
`;
```

## Switching on properties

The `property` helper can be used to map from properties to styles.

```js
const Headline = tw.h1`
  text-blue-600
  ${property(
    'size', // name of the property
    {
      small: 'text-2xl', // value can be a string
      medium: styles`text-4xl`, // or a reusable style
      large: props => 'text-6xl', // or a function
    },
    'medium' // default value
  )}
`;
```

## Using Custom CSS

It is possible to use the `css` utility from `emotion` and probably other CSS-in-JS libraries to include custom CSS.

```js
const Button = tw.button`
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
```
