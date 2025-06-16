import {Image, StyleSheet, View, Linking} from 'react-native';
import React from 'react';
import WrapperContainer from '../components/WrapperContainer';
import MyHeader from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/Colors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MyText from '../components/textcomponent';
import MyButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Viewdetails = () => {
  const navigation = useNavigation();

  // Dummy data (replace with actual props or Redux)
  const item = {
    name: 'Lost Wallet',
    imageUri:
      'https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2023/08/52421386363_8747a89956_o.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5', // change to actual URI
    description: 'Black leather wallet with important cards.',
    location: 'Library - Main Campus',
    date: '2025-06-14',
    username: 'Talha Arshad',
    studentId: 'BSCS-12345',
    phone: '03123456789',
    email: 'talha@example.com',
  };

  return (
    <WrapperContainer>
      <MyHeader
        style={styles.header}
        ScreenName="Item Details"
        leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
        rightView={
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        }
        onPressleft={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Item Info Box */}
        <View style={styles.box}>
          <MyText
            text={item.name}
            fontSize={responsiveFontSize(3)}
            fontWeight="600"
          />
          <Image source={{uri: item.imageUri}} style={styles.itemImage} />

          <MyText
            text={`Description: ${item.description}`}
            style={styles.infoText}
          />
          <MyText
            text={`Last Seen: ${item.location}`}
            style={styles.infoText}
          />
          <MyText
            text={`Date Reported: ${item.date}`}
            style={styles.infoText}
          />
        </View>

        {/* Contact Info Box */}
        <View style={styles.box}>
          <MyText
            text="Contact Information"
            fontSize={responsiveFontSize(2.5)}
            fontWeight="600"
            style={{marginBottom: 10}}
          />
          <MyText text={`Name: ${item.username}`} style={styles.infoText} />
          <MyText
            text={`Student ID: ${item.studentId}`}
            style={styles.infoText}
          />

          <MyButton
            backgroundColor={Colors.primary}
            onPress={() => Linking.openURL(`tel:${item.phone}`)}
            style={styles.iconButton}
            text={
              <View style={styles.iconRow}>
                <Icon
                  name="phone"
                  size={20}
                  color={Colors.white}
                  style={{marginRight: 8}}
                />
                <MyText text="Call" color={Colors.white} fontWeight="bold" />
              </View>
            }
          />

          <MyButton
            backgroundColor={Colors.secondary}
            onPress={() => Linking.openURL(`mailto:${item.email}`)}
            style={[styles.iconButton, {marginTop: responsiveHeight(1.5)}]}
            text={
              <View style={styles.iconRow}>
                <Icon
                  name="mail"
                  size={20}
                  color={Colors.white}
                  style={{marginRight: 8}}
                />
                <MyText
                  text="Send Email"
                  color={Colors.white}
                  fontWeight="bold"
                />
              </View>
            }
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Viewdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(3.5),
    paddingTop: responsiveHeight(2),
    gap: responsiveHeight(2),
  },
  header: {
    backgroundColor: Colors.white,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    zIndex: 10,
  },
  logo: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    resizeMode: 'contain',
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(4),
    backgroundColor: Colors.white,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: responsiveHeight(25),
    resizeMode: 'contain',
    marginVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
  },
  infoText: {
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    color: Colors.darkGray,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    marginTop: responsiveHeight(2),
    paddingVertical: responsiveHeight(1),
  },
});
