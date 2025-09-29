import React, {useState, forwardRef} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Colors from '../styles/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import MyText from './textcomponent';

// Use forwardRef to pass the ref to the TextInput
const MyTextInput = forwardRef(
  (
    {
      inputStyle = {},
      textStyle = {},
      placeholder,
      onChangeText,
      value,
      placeholderTextColor = Colors.gray,
      RightView = false,
      LeftView = null,
      multiline = false,
      fieldName,
      onSubmitEditing, // Add onSubmitEditing prop
      error = false,
      ...rest
    },
    ref, // Receive the forwarded ref
  ) => {
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
            multiline && styles.multilineContainer,
            error && {borderColor: Colors.errorBorder || '#FF4500'},
            inputStyle,
          ]}>
          <View
            style={[
              styles.inputInner,
              multiline && {alignItems: 'flex-start'},
            ]}>
            {LeftView && <View>{LeftView}</View>}
            <TextInput
              ref={ref} // Attach the ref to TextInput
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
              onSubmitEditing={onSubmitEditing} // Handle Enter key press
              {...rest}
            />
          </View>

          {RightView && !multiline && (
            <TouchableOpacity
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
  },
);

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
    width: responsiveWidth(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: responsiveWidth(10),
    flex: 1,
    color: Colors.black,
    fontSize: responsiveFontSize(1.7),
  },
  fieldName: {
    fontWeight: '500',
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(1),
  },
  multilineContainer: {
    minHeight: responsiveHeight(15),
    borderRadius: responsiveWidth(2),
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: responsiveWidth(0.4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
  },
  textAreaStyle: {
    textAlignVertical: 'top',
    paddingVertical: responsiveHeight(1),
    flex: 1,
    fontSize: responsiveFontSize(1.7),
    color: Colors.black,
  },
});
