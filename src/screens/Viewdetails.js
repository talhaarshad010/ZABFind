import {Image, StyleSheet, View, Linking, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
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
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const item = {
    name: 'Lost Wallet',
    imageUri:
      'https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2023/08/52421386363_8747a89956_o.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5',
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
        {/* Image Zoom Modal */}
        <Modal visible={imageModalVisible} transparent={true}>
          <Pressable
            style={styles.modalContainer}
            onPress={() => setImageModalVisible(false)}>
            <Image source={{uri: item.imageUri}} style={styles.modalImage} />
          </Pressable>
        </Modal>

        {/* Item Info Box */}
        <View style={styles.box}>
          <MyText
            text={item.name}
            fontSize={responsiveFontSize(3)}
            fontWeight="700"
            style={{marginBottom: responsiveHeight(1.5)}}
          />

          <Pressable onPress={() => setImageModalVisible(true)}>
            <Image source={{uri: item.imageUri}} style={styles.itemImage} />
          </Pressable>

          <MyText
            text="Description"
            fontWeight="bold"
            style={styles.labelText}
          />
          <MyText text={item.description} style={styles.infoText} />

          <MyText text="Last Seen" fontWeight="bold" style={styles.labelText} />
          <MyText text={item.location} style={styles.infoText} />

          <MyText
            text="Date Reported"
            fontWeight="bold"
            style={styles.labelText}
          />
          <MyText text={item.date} style={styles.infoText} />
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
                <MyText
                  text="Call Now"
                  color={Colors.white}
                  fontWeight="bold"
                />
              </View>
            }
          />

          <MyButton
            backgroundColor={'#16A34A'}
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
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  itemImage: {
    width: '100%',
    height: responsiveHeight(25),
    resizeMode: 'cover',
    marginVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
  },
  labelText: {
    fontSize: responsiveFontSize(1.9),
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(0.5),
    color: Colors.black,
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
    paddingVertical: responsiveHeight(1.2),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
