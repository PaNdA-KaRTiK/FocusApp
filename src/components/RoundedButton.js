import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';

const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 128,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}> {props.title} </Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 3,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: colors.white,
      borderWidth: 1,
    },
    text: {
      color: colors.white,
      alignSelf: 'center',
      fontSize: size / 3,
    },
  });

export { RoundedButton };
