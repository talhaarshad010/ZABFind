import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import MyTextInput from '../components/TextInputComponent';
import MyHeader from '../components/Header';
import MyButton from '../components/CustomButton';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyText from '../components/textcomponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditProfileScreen = ({navigation}) => {
  const [form, setForm] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
  });
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handleChange = (field, value) => {
    setForm({...form, [field]: value});
  };

  const posts = [
    {item: 'Black Wallet', status: 'Returned', date: 'June 10, 2025'},
    {item: 'USB Drive', status: 'Active', date: 'June 13, 2025'},
    {item: 'Water Bottle', status: 'Found', date: 'June 14, 2025'},
  ];

  const getStatusStyle = status => {
    switch (status) {
      case 'Active':
        return {bgColor: '#D0E8FF', textColor: '#005EAD'};
      case 'Found':
        return {bgColor: '#D2F5C7', textColor: '#218C00'};
      case 'Returned':
      default:
        return {bgColor: '#D0E8FF', textColor: '#005EAD'};
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS handles via Info.plist
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your photo library.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.warn('Camera permission denied');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      response => {
        setImagePickerModalVisible(false);
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const openGallery = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      console.warn('Storage permission denied');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        setImagePickerModalVisible(false);
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Colors.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <MyHeader
        style={styles.header}
        ScreenName="Profile"
        leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
        rightView={
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        }
        onPressleft={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: imageUri
                  ? imageUri
                  : 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg',
              }}
              style={styles.profileImage}
            />

            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setImagePickerModalVisible(true)}>
              <Icon name="edit" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <Modal
            transparent
            animationType="slide"
            visible={imagePickerModalVisible}
            onRequestClose={() => setImagePickerModalVisible(false)}>
            <Pressable
              onPress={() => setImagePickerModalVisible(false)}
              style={styles.modalOverlay}
            />

            <View style={styles.modalContainer}>
              <MyText
                text="Upload Image"
                fontSize={responsiveFontSize(2.5)}
                fontWeight="600"
                color={Colors.black}
                textStyle={{marginBottom: responsiveHeight(2)}}
              />

              <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
                <MyText
                  text="📷 Open Camera"
                  color={Colors.black}
                  fontWeight="500"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={openGallery}>
                <MyText
                  text="🖼️ Choose from Gallery"
                  color={Colors.black}
                  fontWeight="500"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {backgroundColor: Colors.lightGray},
                ]}
                onPress={() => setImagePickerModalVisible(false)}>
                <MyText text="Cancel" color={Colors.darkGray} />
              </TouchableOpacity>
            </View>
          </Modal>

          <MyText
            text="John Doe"
            fontSize={responsiveFontSize(2.2)}
            fontWeight="600"
            color={Colors.black}
            textStyle={styles.centerText}
          />
          <MyText
            text="Student ID: 123456"
            fontSize={responsiveFontSize(1.8)}
            color={Colors.gray}
            textStyle={styles.centerTextMargin}
          />

          <View style={styles.statsRow}>
            <View style={styles.statBoxRed}>
              <MyText
                text="5"
                fontSize={responsiveFontSize(2.5)}
                fontWeight="600"
                color={Colors.red}
                textStyle={styles.centerText}
              />
              <MyText
                text="Items Reported"
                fontSize={responsiveFontSize(1.6)}
                color={Colors.black}
                textStyle={styles.centerText}
              />
            </View>
            <View style={styles.statBoxGreen}>
              <MyText
                text="3"
                fontSize={responsiveFontSize(2.5)}
                fontWeight="600"
                color={Colors.green}
                textStyle={styles.centerText}
              />
              <MyText
                text="Successfully Returned"
                fontSize={responsiveFontSize(1.6)}
                color={Colors.black}
                textStyle={styles.centerText}
              />
            </View>
          </View>

          <MyText
            text="Member since 2024"
            fontSize={responsiveFontSize(1.6)}
            color={Colors.gray}
            textStyle={styles.centerTextMargin}
          />
        </View>

        <View style={styles.inputSection}>
          <MyText
            text="Personal Information"
            fontSize={responsiveFontSize(2.2)}
            fontWeight="600"
            color={Colors.black}
            textStyle={{marginBottom: responsiveHeight(1)}}
          />
          {Object.entries({
            name: 'Full Name',
            studentId: 'Student ID',
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            bio: 'Bio',
          }).map(([key, label]) => (
            <MyTextInput
              key={key}
              fieldName={label}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={form[key]}
              onChangeText={val => handleChange(key, val)}
              multiline={key === 'bio'}
              textStyle={{fontSize: responsiveFontSize(1.9)}}
            />
          ))}
        </View>

        <View style={styles.recentPostsBox}>
          <MyText
            text="Recent Activities"
            fontSize={responsiveFontSize(2.2)}
            fontWeight="600"
            color={Colors.black}
            textStyle={{marginBottom: responsiveHeight(1)}}
          />

          {posts.map((post, index) => {
            const {bgColor, textColor} = getStatusStyle(post.status);

            return (
              <View key={index} style={styles.postItem}>
                <View style={styles.postTopRow}>
                  <MyText
                    text={post.item}
                    fontSize={responsiveFontSize(2)}
                    fontWeight="500"
                    color={Colors.black}
                  />
                  <View
                    style={[
                      styles.statusBox,
                      {backgroundColor: bgColor, borderColor: textColor},
                    ]}>
                    <MyText
                      text={post.status}
                      fontSize={responsiveFontSize(1.6)}
                      fontWeight="500"
                      color={textColor}
                    />
                  </View>
                </View>
                <MyText
                  text={`Posted on ${post.date}`}
                  fontSize={responsiveFontSize(1.6)}
                  color={Colors.gray}
                  textStyle={{marginTop: 2}}
                />
                {index < posts.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

        <MyButton
          backgroundColor={Colors.primary}
          text="Save Changes"
          onPress={() => {}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  content: {
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(4),
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  profileImage: {
    width: responsiveWidth(28),
    height: responsiveWidth(28),
    borderRadius: responsiveWidth(14),
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: responsiveWidth(2),
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: responsiveWidth(1.5),
    borderWidth: 1,
    borderColor: Colors.white,
  },
  profileCard: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(3),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(3),
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  centerTextMargin: {
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
  statBoxRed: {
    backgroundColor: '#ffe5e5',
    borderRadius: responsiveWidth(2),
    padding: responsiveHeight(1.5),
    width: '48%',
    alignItems: 'center',
  },
  statBoxGreen: {
    backgroundColor: '#e6ffea',
    borderRadius: responsiveWidth(2),
    padding: responsiveHeight(1.5),
    width: '48%',
    alignItems: 'center',
  },
  inputSection: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    backgroundColor: Colors.white,
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(3),
    height: responsiveHeight(90),
  },
  recentPostsBox: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(3),
  },
  postItem: {
    marginBottom: responsiveHeight(1.5),
  },
  postTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBox: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.4),
    borderRadius: responsiveWidth(5),
    borderWidth: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    padding: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
    alignItems: 'center',
  },

  modalButton: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
});
