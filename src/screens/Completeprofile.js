import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  FlatList,
  Keyboard,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import MyTextInput from '../components/TextInputComponent';
import WrapperContainer from '../components/WrapperContainer';
import AuthHeader from '../components/AuthHeader';
import MyButton from '../components/CustomButton';
import ToastMessage from '../hooks/ToastMessage';
import {useCompleteProfileMutation} from '../store/Api/Auth';
import {updateUserProfile} from '../store/slices/Auth';

const CompleteProfile = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: 'Pakistan',
    zipcode: '',
  });
  const [gender, setGender] = useState('');
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [studentCardImage, setStudentCardImage] = useState(null);
  const [dropdownModal, setDropdownModal] = useState({
    visible: false,
    field: '',
    options: [],
    title: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {Toasts} = ToastMessage();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [completeProfile, {isLoading}] = useCompleteProfileMutation();

  const genderOptions = ['Male', 'Female', 'Other'];
  const semesterOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const departmentOptions = ['BSCS', 'BBA'];
  const cityOptions = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
  ];
  const stateOptions = [
    'Sindh',
    'Punjab',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Azad Jammu and Kashmir',
  ];

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your photos',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImagePick = async setter => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Toasts('Error', 'Permission denied to access gallery', 'error', 2000);
      return;
    }

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response?.assets?.length) {
        setter(response.assets[0]);
      }
    });
  };

  const openDropdown = (field, options, title) => {
    Keyboard.dismiss();
    setDropdownModal({visible: true, field, options, title});
  };

  const handleDropdownSelect = value => {
    if (dropdownModal.field === 'gender') {
      setGender(value);
    } else if (dropdownModal.field === 'semester') {
      setSemester(value);
    } else if (dropdownModal.field === 'department') {
      setDepartment(value);
    } else if (dropdownModal.field === 'city') {
      setAddress({...address, city: value});
    } else if (dropdownModal.field === 'state') {
      setAddress({...address, state: value});
    }
    setDropdownModal({visible: false, field: '', options: [], title: ''});
  };

  const handleSubmit = async () => {
    if (
      !phoneNumber ||
      !gender ||
      !semester ||
      !department ||
      !dateOfBirth ||
      !bio ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipcode
    ) {
      return Toasts('Error', 'Please fill all required fields', 'error', 2000);
    }

    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('gender', gender);
    formData.append('semester', semester);
    formData.append('department', department);
    formData.append('bio', bio);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('address', JSON.stringify(address));

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName || `profile_${Date.now()}.jpg`,
      });
    }

    if (studentCardImage) {
      formData.append('studentCardImage', {
        uri: studentCardImage.uri,
        type: studentCardImage.type,
        name: studentCardImage.fileName || `studentCard_${Date.now()}.jpg`,
      });
    }

    try {
      const result = await completeProfile(formData).unwrap();
      console.log('Profile update result:', result);
      dispatch(updateUserProfile(result.user));
      Toasts('Success', 'Profile Updated', 'success', 2000);
    } catch (err) {
      Toasts('Error', err?.data?.message || 'Update failed', 'error', 2000);
    }
  };

  return (
    <WrapperContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <AuthHeader />
            <MyText
              textStyle={{textAlign: 'center'}}
              fontSize={responsiveFontSize(3)}
              fontWeight={'500'}
              color={Colors.black}
              text={'Complete Your Profile'}
            />
            <View style={styles.InputBox}>
              <MyTextInput
                fieldName="Phone Number"
                placeholder="03xxxxxxxxx"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <MyTextInput
                placeholder={'Street Address'}
                fieldName="Street Address"
                value={address.street}
                onChangeText={text => setAddress({...address, street: text})}
              />
              <MyText
                text="City"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown('city', cityOptions, 'Select City')
                }>
                <MyText
                  text={address.city || 'Select City'}
                  fontSize={responsiveFontSize(1.9)}
                  color={address.city ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>
              <MyText
                text="State"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown('state', stateOptions, 'Select State')
                }>
                <MyText
                  text={address.state || 'Select State'}
                  fontSize={responsiveFontSize(1.9)}
                  color={address.state ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>
              <MyTextInput
                placeholder={'Zipcode'}
                fieldName="Zipcode"
                value={address.zipcode}
                onChangeText={text => setAddress({...address, zipcode: text})}
              />
              <MyText
                text="Gender"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown('gender', genderOptions, 'Select Gender')
                }>
                <MyText
                  text={gender || 'Select Gender'}
                  fontSize={responsiveFontSize(1.9)}
                  color={gender ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>
              <MyText
                text="Semester"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown('semester', semesterOptions, 'Select Semester')
                }>
                <MyText
                  text={semester || 'Select Semester'}
                  fontSize={responsiveFontSize(1.9)}
                  color={semester ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>
              <MyText
                text="Department"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown(
                    'department',
                    departmentOptions,
                    'Select Department',
                  )
                }>
                <MyText
                  text={department || 'Select Department'}
                  fontSize={responsiveFontSize(1.9)}
                  color={department ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <MyTextInput
                  fieldName="Date of Birth"
                  value={dateOfBirth}
                  placeholder="YYYY-MM-DD"
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formatted = selectedDate
                        .toISOString()
                        .split('T')[0];
                      setDateOfBirth(formatted);
                    }
                  }}
                />
              )}
              <MyTextInput
                fieldName="Bio"
                placeholder="Tell us about yourself"
                value={bio}
                onChangeText={setBio}
                multiline
                textStyle={{fontSize: responsiveFontSize(1.9)}}
                containerStyle={styles.inputContainer}
              />
              {profileImage && (
                <Image
                  source={{uri: profileImage.uri}}
                  style={styles.imagePreview}
                />
              )}
              <TouchableOpacity
                style={styles.ProfileuploadBtn}
                onPress={() => handleImagePick(setProfileImage)}>
                <MyText
                  color={Colors.white}
                  text={
                    profileImage
                      ? 'Change Profile Image'
                      : 'Upload Profile Image'
                  }
                />
              </TouchableOpacity>
              {studentCardImage && (
                <Image
                  source={{uri: studentCardImage.uri}}
                  style={[
                    styles.imagePreview,
                    {marginTop: responsiveHeight(2)},
                  ]}
                />
              )}
              <TouchableOpacity
                style={styles.CarduploadBtn}
                onPress={() => handleImagePick(setStudentCardImage)}>
                <MyText
                  color={Colors.white}
                  text={
                    studentCardImage
                      ? 'Change Student Card Image'
                      : 'Upload Student Card Image'
                  }
                />
              </TouchableOpacity>
            </View>
            <Modal
              transparent
              animationType="fade"
              visible={dropdownModal.visible}
              onRequestClose={() =>
                setDropdownModal({
                  visible: false,
                  field: '',
                  options: [],
                  title: '',
                })
              }>
              <View style={styles.modalOverlay}>
                <View style={styles.dropdownModal}>
                  <MyText
                    text={dropdownModal.title}
                    fontSize={responsiveFontSize(2.5)}
                    fontWeight="600"
                    color={Colors.black}
                    textStyle={{
                      marginBottom: responsiveHeight(2),
                      textAlign: 'center',
                    }}
                  />
                  <FlatList
                    data={dropdownModal.options}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={[
                          styles.dropdownItem,
                          (dropdownModal.field === 'gender' &&
                            gender === item) ||
                          (dropdownModal.field === 'semester' &&
                            semester === item) ||
                          (dropdownModal.field === 'department' &&
                            department === item) ||
                          (dropdownModal.field === 'city' &&
                            address.city === item) ||
                          (dropdownModal.field === 'state' &&
                            address.state === item)
                            ? {backgroundColor: Colors.primaryLight}
                            : {},
                        ]}
                        onPress={() => handleDropdownSelect(item)}>
                        <MyText
                          text={item}
                          fontSize={responsiveFontSize(2)}
                          color={
                            (dropdownModal.field === 'gender' &&
                              gender === item) ||
                            (dropdownModal.field === 'semester' &&
                              semester === item) ||
                            (dropdownModal.field === 'department' &&
                              department === item) ||
                            (dropdownModal.field === 'city' &&
                              address.city === item) ||
                            (dropdownModal.field === 'state' &&
                              address.state === item)
                              ? Colors.primary
                              : Colors.black
                          }
                          fontWeight={
                            (dropdownModal.field === 'gender' &&
                              gender === item) ||
                            (dropdownModal.field === 'semester' &&
                              semester === item) ||
                            (dropdownModal.field === 'department' &&
                              department === item) ||
                            (dropdownModal.field === 'city' &&
                              address.city === item) ||
                            (dropdownModal.field === 'state' &&
                              address.state === item)
                              ? '600'
                              : '500'
                          }
                        />
                      </TouchableOpacity>
                    )}
                    style={{maxHeight: responsiveHeight(30)}}
                  />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() =>
                      setDropdownModal({
                        visible: false,
                        field: '',
                        options: [],
                        title: '',
                      })
                    }>
                    <MyText
                      text="Cancel"
                      color={Colors.darkGray}
                      fontSize={responsiveFontSize(2)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <MyButton
              isLoading={isLoading}
              text={'Submit'}
              backgroundColor={Colors.primary}
              textColor={Colors.white}
              onPress={handleSubmit}
              disabled={isLoading}
              textstyle={{
                fontSize: responsiveFontSize(2.5),
                width: responsiveWidth(90),
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: responsiveWidth(90),
                padding: responsiveHeight(1.5),
              }}
              leftIcon={
                isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.white}
                    style={{marginRight: responsiveWidth(2)}}
                  />
                ) : null
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: responsiveHeight(5),
  },
  InputBox: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    gap: responsiveHeight(1),
  },
  ProfileuploadBtn: {
    backgroundColor: Colors.primary,
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    marginTop: responsiveHeight(10),
  },
  CarduploadBtn: {
    backgroundColor: Colors.primary,
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  imagePreview: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(10),
  },
  fieldLabel: {
    marginTop: responsiveHeight(1),
    // marginBottom: responsiveHeight(1),
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(2.5),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1.5),
    backgroundColor: '#f9f9f9',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: Colors.white,
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    width: responsiveWidth(80),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
});
