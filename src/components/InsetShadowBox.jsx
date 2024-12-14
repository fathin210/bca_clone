import React from 'react';
import {StyleSheet, View} from 'react-native';

const InsetShadowBox = ({style = {}, color = 'red'}) => {
  return (
    <View
      style={{...styles.container, ...style, backgroundColor: color}}></View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderTopWidth: 2,
    borderTopColor: '#A2B187',
    borderRadius: 4,
    overflow: 'hidden', // Penting untuk membuat efek inset
  },
});

export default InsetShadowBox;
