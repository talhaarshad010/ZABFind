import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Colors from '../styles/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import MyText from './textcomponent';

// const MyTextInput = ({
//   inputStyle = {},
//   textStyle = {},
//   placeholder,
//   onChangeText,
//   value,
//   placeholderTextColor = Colors.gray,
//   RightView = false,
//   LeftView = null,
//   props,
//   fieldName,
// }) => {
//   const [isPasswordVisible, setPasswordVisible] = useState(false);

//   return (
//     <View>
//       {fieldName && (
//         <MyText
//           color={Colors.black}
//           fontWeight="500"
//           fontSize={responsiveFontSize(2.2)}
//           text={fieldName}
//           textStyle={styles.fieldName}
//         />
//       )}

//       <View style={[styles.inputContainer, inputStyle]}>
//         <View style={styles.inputInner}>
//           {LeftView && <View>{LeftView}</View>}
//           <TextInput
//             allowFontScaling={false}
//             secureTextEntry={RightView && !isPasswordVisible}
//             cursorColor={Colors.black}
//             placeholder={placeholder}
//             onChangeText={onChangeText}
//             value={value}
//             placeholderTextColor={placeholderTextColor}
//             style={[styles.textInput, textStyle]}
//             {...props}
//           />
//         </View>

//         {RightView && (
//           <TouchableOpacity
//             style={{padding: responsiveWidth(2)}}
//             onPress={() => setPasswordVisible(!isPasswordVisible)}>
//             <Feather
//               name={isPasswordVisible ? 'eye' : 'eye-off'}
//               size={20}
//               color={Colors.black}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

const MyTextInput = ({
  inputStyle = {},
  textStyle = {},
  placeholder,
  onChangeText,
  value,
  placeholderTextColor = Colors.gray,
  RightView = false,
  LeftView = null,
  multiline = false, // add this line
  fieldName,
  ...rest // use rest for spreading other props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <View>
      {fieldName && (
        <MyText
          color={Colors.black}
          fontWeight="500"
          fontSize={responsiveFontSize(2.2)}
          text={fieldName}
          textStyle={styles.fieldName}
        />
      )}

      <View
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer, // conditionally apply multiline style
          inputStyle,
        ]}>
        <View
          style={[styles.inputInner, multiline && {alignItems: 'flex-start'}]}>
          {LeftView && <View>{LeftView}</View>}
          <TextInput
            allowFontScaling={false}
            secureTextEntry={RightView && !isPasswordVisible}
            cursorColor={Colors.black}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            placeholderTextColor={placeholderTextColor}
            style={[
              styles.textInput,
              multiline && styles.textAreaStyle,
              textStyle,
            ]}
            multiline={multiline}
            {...rest}
          />
        </View>

        {RightView && !multiline && (
          <TouchableOpacity
            style={{padding: responsiveWidth(2)}}
            onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={20}
              color={Colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: responsiveWidth(0.4),
  },
  inputInner: {
    width: responsiveWidth(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: responsiveWidth(50),
    flex: 1,
    color: Colors.black,
  },
  fieldName: {
    fontWeight: '500',
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(1),
  },
  multilineContainer: {
    minHeight: responsiveHeight(15),
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'flex-start',
  },
  textAreaStyle: {
    textAlignVertical: 'top',
    height: '100%',
  },
});
