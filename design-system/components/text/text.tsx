import React, { FunctionComponent } from 'react';

import { Text, StyleSheet } from 'react-native';
import styled from 'styled-components';

import tokens from 'vibemap-constants/design-system/build/json/variables.json'

// 'small' | 'normal' | 'large'
export enum Sizes{
  small = 'small',
  normal = 'normal',
  large = 'large'
}

export enum Weights{
  light = 'light',
  normal = 'normal',
  medium = 'medium',
  bold = 'bold'
}

export interface TextProps {
  disabled?: boolean
  size?: Sizes
  weight?: Weights,
  text: any
}

// TODO: Make this a global util
const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
  obj[key];

const TextElement:  React.FC<TextProps> = (props) => {
  // De-structured, Default props
  const {
    children,
    size = Sizes.normal,
    weight = Weights.normal} = props

  //console.log('Text size ', size, getKeyValue(tokens.font.size)(size))

  const styles = StyleSheet.create({
    box: { padding: 10 },
    text: {
      fontWeight: getKeyValue(tokens.font.weight)(weight),
      fontSize: getKeyValue(tokens.font.size)(size)
    }
  })

  return (
    <Text style={styles.text}>
      {props.children}
    </Text>
  );
}

export default TextElement