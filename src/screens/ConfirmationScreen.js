import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyText from '../components/textcomponent';
import MyButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Colors from '../styles/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ConfirmationScreen = ({route}) => {
  const {message} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyText
        text="Success!"
        fontSize={24}
        fontWeight="600"
        color={Colors.black}
        textStyle={{marginBottom: responsiveHeight(2)}}
      />
      <MyText
        text={message}
        fontSize={16}
        color={Colors.gray}
        textStyle={{marginBottom: responsiveHeight(4), textAlign: 'center'}}
      />
      <MyButton
        text="Back to Home"
        backgroundColor={Colors.primary}
        textColor={Colors.white}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(5),
    backgroundColor: Colors.white,
  },
});

export default ConfirmationScreen;
