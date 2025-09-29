// import {
//   Image,
//   StyleSheet,
//   View,
//   Linking,
//   Modal,
//   Pressable,
//   ScrollView,
// } from 'react-native';
// import React, {useState} from 'react';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import Colors from '../styles/Colors';
// import {
//   responsiveWidth,
//   responsiveHeight,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import MyText from '../components/textcomponent';
// import MyButton from '../components/CustomButton';
// import {useNavigation, useRoute} from '@react-navigation/native';

// const Viewdetails = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [imageModalVisible, setImageModalVisible] = useState(false);
//   const {
//     itemId,
//     imageUri,
//     title,
//     description,
//     location,
//     date,
//     username,
//     status,
//     highlight,
//     category,
//     studentId,
//     emailAddress,
//     phoneNumber,
//     studentBackId,
//   } = route.params || {};

//   console.log('Item Details in view details:', {
//     itemId,
//     imageUri,
//     title,
//     description,
//     location,
//     date,
//     username,
//     status,
//     highlight,
//     category,
//     studentId,
//     studentBackId,
//     emailAddress,
//     phoneNumber,
//   });

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName="Item Details"
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         rightView={
//           <Image source={require('../assets/logo.png')} style={styles.logo} />
//         }
//         onPressleft={() => navigation.goBack()}
//       />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{flex: 1, marginBottom: responsiveHeight(2)}}>
//         <View style={styles.container}>
//           {/* Image Zoom Modal */}
//           <Modal visible={imageModalVisible} transparent={true}>
//             <Pressable
//               style={styles.modalContainer}
//               onPress={() => setImageModalVisible(false)}>
//               <Image source={{uri: imageUri}} style={styles.modalImage} />
//             </Pressable>
//           </Modal>

//           {/* Item Info Box */}
//           <View style={styles.box}>
//             <MyText
//               text={title}
//               fontSize={responsiveFontSize(3)}
//               fontWeight="700"
//               style={{marginBottom: responsiveHeight(1.5)}}
//             />

//             <Pressable onPress={() => setImageModalVisible(true)}>
//               <Image source={{uri: imageUri}} style={styles.itemImage} />
//             </Pressable>

//             <MyText
//               text="Description"
//               fontWeight="bold"
//               style={styles.labelText}
//             />
//             <MyText text={description} style={styles.infoText} />

//             <MyText
//               text="Last Seen"
//               fontWeight="bold"
//               style={styles.labelText}
//             />
//             <MyText text={location} style={styles.infoText} />

//             <MyText
//               text="Date Reported"
//               fontWeight="bold"
//               style={styles.labelText}
//             />
//             <MyText text={date} style={styles.infoText} />
//           </View>

//           {/* Contact Info Box */}
//           <View style={styles.box}>
//             <MyText
//               text="Contact Information"
//               fontSize={responsiveFontSize(2.5)}
//               fontWeight="600"
//               style={{marginBottom: 10}}
//             />
//             <MyText text={`Name: ${username}`} style={styles.infoText} />
//             <MyText text={`Student ID: ${studentId}`} style={styles.infoText} />

//             <MyButton
//               backgroundColor={Colors.primary}
//               onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
//               style={styles.iconButton}
//               text={
//                 <View style={styles.iconRow}>
//                   <Icon
//                     name="phone"
//                     size={20}
//                     color={Colors.white}
//                     style={{marginRight: 8}}
//                   />
//                   <MyText
//                     text="Call Now"
//                     color={Colors.white}
//                     fontWeight="bold"
//                   />
//                 </View>
//               }
//             />

//             <MyButton
//               backgroundColor={'#16A34A'}
//               onPress={() => Linking.openURL(`mailto:${emailAddress}`)}
//               style={[styles.iconButton, {marginTop: responsiveHeight(1.5)}]}
//               text={
//                 <View style={styles.iconRow}>
//                   <Icon
//                     name="mail"
//                     size={20}
//                     color={Colors.white}
//                     style={{marginRight: 8}}
//                   />
//                   <MyText
//                     text="Send Email"
//                     color={Colors.white}
//                     fontWeight="bold"
//                   />
//                 </View>
//               }
//             />
//             <MyButton
//               onPress={() =>
//                 navigation.navigate('ChatScreen', {
//                   itemId: route.params.itemId,
//                   receiverId: studentBackId,
//                   receiverName: username,
//                 })
//               }
//               text="Message"
//               backgroundColor={Colors.primary}
//               style={[
//                 styles.iconButton,
//                 {
//                   marginTop: responsiveHeight(1.5),
//                 },
//               ]}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </WrapperContainer>
//   );
// };

// export default Viewdetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: responsiveWidth(3.5),
//     paddingTop: responsiveHeight(2),
//     gap: responsiveHeight(2),
//   },
//   header: {
//     backgroundColor: Colors.white,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ccc',
//     zIndex: 10,
//   },
//   logo: {
//     width: responsiveWidth(10),
//     height: responsiveWidth(10),
//     resizeMode: 'contain',
//   },
//   box: {
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//     borderRadius: responsiveWidth(3),
//     padding: responsiveWidth(4),
//     backgroundColor: Colors.white,
//     elevation: 3,
//     shadowColor: '#999',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 1},
//     shadowRadius: 2,
//   },
//   itemImage: {
//     width: '100%',
//     height: responsiveHeight(25),
//     resizeMode: 'cover',
//     marginVertical: responsiveHeight(2),
//     borderRadius: responsiveWidth(2),
//   },
//   labelText: {
//     fontSize: responsiveFontSize(1.9),
//     marginTop: responsiveHeight(1),
//     marginBottom: responsiveHeight(0.5),
//     color: Colors.black,
//   },
//   infoText: {
//     marginBottom: responsiveHeight(1),
//     fontSize: responsiveFontSize(2),
//     color: Colors.darkGray,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconButton: {
//     marginTop: responsiveHeight(2),
//     paddingVertical: responsiveHeight(1.2),
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#000000aa',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalImage: {
//     width: '90%',
//     height: '70%',
//     resizeMode: 'contain',
//     borderRadius: 10,
//   },
// });

import {
  Image,
  StyleSheet,
  View,
  Linking,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
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
import {useNavigation, useRoute} from '@react-navigation/native';

const Viewdetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const {
    itemId,
    imageUri,
    title,
    description,
    location,
    date,
    username,
    status,
    highlight,
    category,
    studentId,
    emailAddress,
    phoneNumber,
    studentBackId,
  } = route.params || {};

  console.log('Item Details in view details:', {
    itemId,
    imageUri,
    title,
    description,
    location,
    date,
    username,
    status,
    highlight,
    category,
    studentId,
    studentBackId,
    emailAddress,
    phoneNumber,
  });

  return (
    <WrapperContainer>
      {/* Fixed Header */}
      <MyHeader
        style={styles.header}
        ScreenName="Item Details"
        leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
        rightView={
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        }
        onPressleft={() => navigation.goBack()}
      />
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Image Zoom Modal */}
          <Modal visible={imageModalVisible} transparent={true}>
            <Pressable
              style={styles.modalContainer}
              onPress={() => setImageModalVisible(false)}>
              <Image source={{uri: imageUri}} style={styles.modalImage} />
            </Pressable>
          </Modal>

          {/* Item Info Box */}
          <View style={styles.box}>
            <MyText
              text={title}
              fontSize={responsiveFontSize(3)}
              fontWeight="700"
              style={{marginBottom: responsiveHeight(1.5)}}
            />

            <Pressable onPress={() => setImageModalVisible(true)}>
              <Image source={{uri: imageUri}} style={styles.itemImage} />
            </Pressable>

            <MyText
              text="Description"
              fontWeight="bold"
              style={styles.labelText}
            />
            <MyText text={description} style={styles.infoText} />

            <MyText
              text="Last Seen"
              fontWeight="bold"
              style={styles.labelText}
            />
            <MyText text={location} style={styles.infoText} />

            <MyText
              text="Date Reported"
              fontWeight="bold"
              style={styles.labelText}
            />
            <MyText text={date} style={styles.infoText} />
          </View>

          {/* Contact Info Box */}
          <View style={styles.box}>
            <MyText
              text="Contact Information"
              fontSize={responsiveFontSize(2.5)}
              fontWeight="600"
              style={{marginBottom: 10}}
            />
            <MyText text={`Name: ${username}`} style={styles.infoText} />
            <MyText text={`Student ID: ${studentId}`} style={styles.infoText} />

            <MyButton
              backgroundColor={Colors.primary}
              onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
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
              onPress={() => Linking.openURL(`mailto:${emailAddress}`)}
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
            <MyButton
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  itemId: route.params.itemId,
                  receiverId: studentBackId,
                  receiverName: username,
                })
              }
              text="Message"
              backgroundColor={Colors.primary}
              style={[
                styles.iconButton,
                {
                  marginTop: responsiveHeight(1.5),
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: responsiveHeight(2),
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
