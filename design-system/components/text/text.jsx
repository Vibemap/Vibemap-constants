import React from 'react';

import { Text, StyleSheet } from 'react-native';

export interface TextProps {
  size?: "small" | "medium" | "large";
}

const TextElement = ({
  children,
  text }) => {
  return (
    <Text>
      {text ? text : children}
    </Text>
  );
}

export default TextElement