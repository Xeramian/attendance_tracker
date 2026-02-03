import React from 'react';
import { Text, TextProps } from 'react-native';

export const AppText = ({ children, ...props }: TextProps) => {
  // 1. Only apply the fix if the child is a string
  const processedChildren = typeof children === 'string' 
    ? `${children}\u00A0` 
    : children;

  return (
    <Text 
      {...props} 
      // 2. Project-wide Android Fix: Disable native padding
      textBreakStrategy='simple'
    >
      {processedChildren}
    </Text>
  );
};