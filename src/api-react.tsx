import React from 'react';
import validAttr from '@emotion/is-prop-valid';
import {
  buildClassList,
  mergeClassNames,
  ObjectMap,
  EmbeddedExpression,
  filterProps,
} from './utils';
import domElements, { DomElement } from './dom-elements';

type AcceptsClassNameProperty = {
  className: string;
};

type StyledComponentProps<T> = T & {
  children?: React.ReactNode;
  as?: React.ElementType<T>;
};

type TemplateString<T> = (
  parts: TemplateStringsArray,
  ...expressions: EmbeddedExpression<T>[]
) => React.FC<T>;

type Styled = (<T extends AcceptsClassNameProperty>(
  elem: React.ComponentType<T> | string
) => TemplateString<T>) &
  {
    [key in DomElement]: <T>(
      parts: TemplateStringsArray,
      ...expressions: EmbeddedExpression<T>[]
    ) => React.FC<T>;
  };

//@ts-ignore
export const styled: Styled = <
  T extends AcceptsClassNameProperty = AcceptsClassNameProperty
>(
  elem: React.ComponentType<T> | string
): TemplateString<T> => {
  const styledLiteral: TemplateString<T> = (
    parts: TemplateStringsArray,
    ...expressions: EmbeddedExpression<T>[]
  ) => {
    const StyledComponent: React.FC<StyledComponentProps<T>> = props => {
      const element = props.as || elem;
      const className = buildClassList(parts, expressions, props);
      const finalProps =
        typeof element === 'string' ? filterProps(props) : props;
      finalProps.className = mergeClassNames(className, finalProps.className);
      return React.createElement(element, finalProps, props.children);
    };
    return StyledComponent;
  };

  return styledLiteral;
};

domElements.forEach(elem => {
  //@ts-ignore
  styled[elem] = styled(elem);
});

export const styles = <T extends any>(
  parts: TemplateStringsArray,
  ...expressions: EmbeddedExpression<T>[]
) => (props: T) => {
  return buildClassList(parts, expressions, props);
};

export const property = <T extends any>(
  propName: string,
  map: ObjectMap<EmbeddedExpression<T>>,
  defaultName = ''
) => (props: T) => {
  const value = map[props[propName] || defaultName];
  return typeof value === 'string' ? value : value(props);
};
