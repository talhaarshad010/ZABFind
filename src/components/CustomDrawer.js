import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyText from './textcomponent';
import Colors from '../styles/Colors';
import WrapperContainer from './WrapperContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InfoComponent from './InfoComponent';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearAuth} from '../store/slices/Auth';

const CustomDrawerContent = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoData = [
    {label: 'Full Name', value: 'Talha Arshad'},
    {label: 'Student ID', value: 'BCS-123456'},
    {label: 'Email', value: 'talha@example.com'},
    {label: 'Phone', value: '+92 300 1234567'},
    {label: 'Address', value: 'Main Campus Hostel, ABC University'},
    {label: 'Bio', value: 'Passionate learner and developer.'},
  ];

  return (
    <WrapperContainer>
      <DrawerContentScrollView {...props} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View>
              <Image
                source={{
                  uri: 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg',
                }}
                style={styles.profileImage}
              />
              <Text
                onPress={() => {
                  dispatch(clearAuth());
                }}>
                Logout
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MyProfile');
                }}
                style={styles.editIconContainer}>
                <Icon name="edit" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <MyText
              text="Talha Arshad"
              fontSize={responsiveFontSize(2.5)}
              fontWeight="bold"
              color={Colors.black}
              textStyle={{marginTop: responsiveHeight(1)}}
            />
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, {backgroundColor: '#e5f4ff'}]}>
              <MyText
                text="Items Reported"
                fontSize={responsiveFontSize(2)}
                fontWeight="600"
                color={Colors.black}
              />
              <MyText
                text="12"
                fontSize={responsiveFontSize(2.5)}
                fontWeight="bold"
                color={Colors.primary}
              />
            </View>
            <View style={[styles.statBox, {backgroundColor: '#e8f9e9'}]}>
              <MyText
                text="Successful Returns"
                fontSize={responsiveFontSize(2)}
                fontWeight="600"
                color={Colors.black}
              />
              <MyText
                text="7"
                fontSize={responsiveFontSize(2.5)}
                fontWeight="bold"
                color="green"
              />
            </View>
          </View>

          {/* Member Since */}
          <MyText
            text="Member since 2022"
            fontSize={responsiveFontSize(1.8)}
            color={Colors.gray}
            textStyle={{marginVertical: responsiveHeight(2)}}
          />

          {/* Personal Info Component */}
          <InfoComponent info={infoData} />
        </View>
      </DrawerContentScrollView>
    </WrapperContainer>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(4),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  profileImage: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: responsiveWidth(12),
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: responsiveWidth(1),
    borderWidth: 1,
    borderColor: Colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: responsiveWidth(4),
    marginBottom: responsiveHeight(1),
  },
  statBox: {
    flex: 1,
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
