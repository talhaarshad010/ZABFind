import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MyHeader from '../components/Header';
import WrapperContainer from '../components/WrapperContainer';
import Colors from '../styles/Colors';
import MyText from '../components/textcomponent';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MyTextInput from '../components/TextInputComponent';
import TextInputDropdown from '../components/Dropdown';
import MyButton from '../components/CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';

const Reportitem = () => {
  const [selected, setSelected] = useState('lost');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const categoryOptions = [
    'Electronics',
    'Clothing',
    'Documents',
    'Accessories',
    'Others',
  ];

  const locationOptions = [
    'Main Gate',
    'Cafeteria',
    'Library',
    'Parking Lot',
    'Admin Block',
    'Auditorium',
    'Other',
  ];

  const resetForm = () => {
    setItemName('');
    setCategory('');
    setDescription('');
    setSelected('lost');
    setImageUri(null);
    setLocation('');
    setContactInfo('');
  };

  const handleSubmit = () => {
    if (!itemName.trim()) {
      alert('Please enter the item name.');
      return;
    }
    if (!category) {
      alert('Please select a category.');
      return;
    }
    if (!description.trim()) {
      alert('Please provide a description.');
      return;
    }
    if (!location) {
      alert('Please select a location.');
      return;
    }
    if (!contactInfo.trim()) {
      alert('Please enter contact information.');
      return;
    }

    console.log({
      itemName,
      category,
      description,
      selected,
      location,
      contactInfo,
    });
    alert('Report submitted successfully!');
    setTimeout(resetForm, 100);
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
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
    <WrapperContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <MyHeader
            ScreenName={'Report Item'}
            style={styles.header}
            rightView={
              <View>
                <Image
                  style={styles.logo}
                  source={require('../assets/logo.png')}
                />
              </View>
            }
          />

          <View style={styles.container}>
            <View style={styles.topSection}>
              <MyText
                color={Colors.black}
                fontSize={responsiveFontSize(3.5)}
                fontWeight={'600'}
                text={'Report an item'}
              />
              <MyText
                text={
                  'Help others find their lost belongings or report items you have found.'
                }
              />
            </View>

            <View style={styles.container_02}>
              <MyText
                text="What are you reporting?"
                fontSize={responsiveFontSize(2)}
                fontWeight="600"
                color={Colors.black}
                textStyle={{marginBottom: responsiveHeight(2)}}
              />

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={[
                    styles.card,
                    selected === 'lost' && styles.selectedCardLost,
                  ]}
                  onPress={() => setSelected('lost')}>
                  <MyText
                    text="🙁"
                    fontSize={responsiveFontSize(4)}
                    textStyle={{marginBottom: responsiveHeight(1)}}
                  />
                  <MyText
                    text="I Lost Something"
                    fontSize={responsiveFontSize(2)}
                    fontWeight="600"
                    color={Colors.black}
                    textStyle={{textAlign: 'center'}}
                  />
                  <MyText
                    text="Report a lost item"
                    fontSize={responsiveFontSize(1.6)}
                    color={Colors.gray}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: responsiveHeight(0.5),
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.card,
                    selected === 'found' && styles.selectedCardFound,
                  ]}
                  onPress={() => setSelected('found')}>
                  <MyText
                    text="🎉"
                    fontSize={responsiveFontSize(4)}
                    textStyle={{marginBottom: responsiveHeight(1)}}
                  />
                  <MyText
                    text="I Found Something"
                    fontSize={responsiveFontSize(2)}
                    fontWeight="600"
                    color={Colors.black}
                    textStyle={{textAlign: 'center'}}
                  />
                  <MyText
                    text="Report a found item"
                    fontSize={responsiveFontSize(1.6)}
                    color={Colors.gray}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: responsiveHeight(0.5),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <MyTextInput
                fieldName="Item Name *"
                placeholder="e.g., iPhone 14, Blue Backpack, Car Keys"
                value={itemName}
                onChangeText={setItemName}
              />

              <MyText
                text="Category *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TextInputDropdown
                defaultValue={category}
                data={categoryOptions}
                onSelect={setCategory}
                isOpen={isCategoryDropdownOpen}
                onToggle={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsLocationDropdownOpen(false);
                }}
              />

              <MyTextInput
                fieldName="Description *"
                placeholder="Provide a detailed description including color, brand, size, distinctive features, etc."
                value={description}
                onChangeText={setDescription}
                inputStyle={styles.descriptionInput}
                props={{
                  multiline: true,
                  numberOfLines: 4,
                  textAlignVertical: 'top',
                }}
              />

              <MyText
                text="Location *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TextInputDropdown
                defaultValue={location}
                data={locationOptions}
                onSelect={setLocation}
                isOpen={isLocationDropdownOpen}
                onToggle={() => {
                  setIsLocationDropdownOpen(!isLocationDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
              />

              <MyTextInput
                fieldName="Contact Information *"
                placeholder="e.g., your phone number, email, or social handle"
                value={contactInfo}
                onChangeText={setContactInfo}
              />

              <MyText
                text="Attach Image (optional)"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />

              <TouchableOpacity
                onPress={pickImage}
                style={styles.imagePickerButton}>
                <MyText text="Choose Image" />
              </TouchableOpacity>

              {imageUri && (
                <Image source={{uri: imageUri}} style={styles.previewImage} />
              )}

              <View style={styles.buttonRow}>
                <View style={styles.buttonWrapper}>
                  <MyButton
                    backgroundColor={Colors.gray}
                    text="Cancel"
                    onPress={resetForm}
                    textStyle={{color: Colors.black}}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <MyButton
                    backgroundColor={Colors.primary}
                    text="Submit"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(3),
  },
  topSection: {
    paddingVertical: responsiveHeight(3),
  },
  container_02: {
    marginVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    borderWidth: responsiveWidth(0.4),
    borderColor: Colors.lightGray,
    padding: responsiveWidth(3),
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(3),
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  selectedCardLost: {
    borderColor: '#ff4d4d',
    backgroundColor: '#ffecec',
  },
  selectedCardFound: {
    borderColor: '#0fbcf9',
    backgroundColor: '#e5f7ff',
  },
  fieldLabel: {
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  descriptionInput: {
    height: responsiveHeight(18),
  },
  imagePickerButton: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  previewImage: {
    width: responsiveWidth(60),
    height: responsiveHeight(20),
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
  },

  buttonWrapper: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(3),
    marginTop: responsiveHeight(3),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  submitButton: {
    flex: 1,
  },
});

export default Reportitem;
