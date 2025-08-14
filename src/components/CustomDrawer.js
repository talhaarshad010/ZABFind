import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {clearAuth} from '../store/slices/Auth';
import MyButton from './CustomButton';

const CustomDrawerContent = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.Auth);
  console.log('User in Drawer:', user);
  const infoData = [
    {label: 'Full Name', value: user?.fullName || 'N/A'},
    {label: 'Student ID', value: user?.studentId || 'N/A'},
    {label: 'Email', value: user?.emailAddress || 'N/A'},
    {label: 'Phone', value: user?.phoneNumber || 'N/A'},
    {
      label: 'Address',
      value:
        user?.address?.street + ', ' + (user?.address?.city || 'N/A') || 'N/A',
    },
    {label: 'Bio', value: user?.bio || 'N/A'},
  ];

  return (
    <WrapperContainer>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View style={styles.container}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View>
              {user?.profileImage ? (
                <Image
                  source={{uri: user.profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg',
                  }}
                  style={styles.profileImage}
                />
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('MyProfile')}
                style={styles.editIconContainer}>
                <Icon name="edit" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <MyText
              text={user?.fullName || 'Guest User'}
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
                text={user?.itemsReported?.length || 0}
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
            text={`Member since ${new Date(
              user?.registeredAt || Date.now(),
            ).getFullYear()}`}
            fontSize={responsiveFontSize(1.8)}
            color={Colors.gray}
            textStyle={{marginVertical: responsiveHeight(2)}}
          />

          {/* Personal Info Component */}
          <InfoComponent info={infoData} />
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <MyButton
            text="Logout"
            backgroundColor={Colors.red || '#FF0000'}
            textColor={Colors.white}
            fontWeight="600"
            onPress={() => dispatch(clearAuth())}
            style={{
              width: '100%',
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
            textstyle={{fontSize: responsiveFontSize(2.3)}}
            leftIcon={
              <Icon
                name="power-settings-new"
                size={responsiveFontSize(2.5)}
                color={Colors.white}
                style={{marginRight: responsiveWidth(2)}}
              />
            }
          />
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
    bottom: responsiveHeight(0),
    right: responsiveWidth(1),
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
  logoutContainer: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(2),
    alignItems: 'center',
  },
});
