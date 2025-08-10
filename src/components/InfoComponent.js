import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';
import MyText from './textcomponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const InfoComponent = ({info}) => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.Auth);
  console.log('User in Drawer InfoComponent:', user);
  return (
    <View style={styles.infoBox}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: responsiveHeight(2),
        }}>
        <MyText
          text="Personal Information"
          fontSize={responsiveFontSize(2.2)}
          fontWeight="600"
          color={Colors.black}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyProfile');
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="edit"
            size={20}
            color={Colors.primary}
            style={{marginRight: 4}}
          />
          <MyText
            text="Edit"
            fontSize={responsiveFontSize(2)}
            fontWeight="500"
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      {info.map((item, index) => (
        <View key={index} style={styles.infoColumn}>
          <MyText
            text={item.label}
            fontSize={responsiveFontSize(1.8)}
            fontWeight="600"
            color={Colors.gray}
            textStyle={{marginBottom: responsiveHeight(0.5)}}
          />
          <MyText
            text={item.value}
            fontSize={responsiveFontSize(1.8)}
            color={Colors.black}
            textStyle={{marginBottom: responsiveHeight(1.5)}}
          />
        </View>
      ))}
    </View>
  );
};

export default InfoComponent;

const styles = StyleSheet.create({
  infoBox: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(4),
    width: '100%',
    marginTop: responsiveHeight(2),
    backgroundColor: Colors.white,
  },
  infoColumn: {
    marginBottom: responsiveHeight(1),
  },
});
