import React from 'react';
import {Text} from 'react-native';
import MyText from './textcomponent'; // adjust path if needed

const HighlightedText = ({text, highlight, fontSize, color, fontWeight}) => {
  if (!highlight || highlight.trim() === '') {
    return (
      <MyText
        text={text}
        fontSize={fontSize}
        color={color}
        fontWeight={fontWeight}
      />
    );
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text style={{flexWrap: 'wrap', flexDirection: 'row'}}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <MyText
            key={index}
            text={part}
            fontSize={fontSize}
            color={color}
            fontWeight={fontWeight}
            textStyle={{backgroundColor: '#FFFF00'}} // Highlight style
          />
        ) : (
          <MyText
            key={index}
            text={part}
            fontSize={fontSize}
            color={color}
            fontWeight={fontWeight}
          />
        ),
      )}
    </Text>
  );
};

export default HighlightedText;
