import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import HighlightedText from './HighlightedText';
import {useNavigation} from '@react-navigation/native';

const ItemCard = ({
  imageUri,
  title,
  description,
  location,
  date,
  username,
  status,
  highlight,
  category, // <-- added category
  studentId,
  emailAddress,
  phoneNumber,
}) => {
  const navigation = useNavigation();

  console.log('All Data:', {
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
  });
  let itemDetails = {
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
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ViewDetails', itemDetails);
      }}
      style={styles.card}>
      <Image source={{uri: imageUri}} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.headerRow}>
          <HighlightedText
            text={title}
            highlight={highlight}
            fontSize={responsiveFontSize(2)}
            color={'#000'}
            fontWeight={'bold'}
          />
          <View
            style={[
              styles.statusBadge,
              status === 'Found' && {backgroundColor: '#DCFCE7'},
            ]}>
            <HighlightedText
              text={status}
              highlight={highlight}
              fontSize={responsiveFontSize(1.5)}
              color={status === 'Found' ? '#16A34A' : '#DC2626'}
              fontWeight="bold"
            />
          </View>
        </View>

        <HighlightedText
          text={description}
          highlight={highlight}
          fontSize={responsiveFontSize(1.8)}
          color="#555"
          numberOfLines={2}
        />

        <View style={styles.infoRow}>
          <Icon name="location-outline" size={16} color="#666" />
          <HighlightedText
            text={location}
            highlight={highlight}
            fontSize={responsiveFontSize(1.7)}
            color="#666"
          />
        </View>

        <View style={styles.infoRow}>
          <Icon name="calendar-outline" size={16} color="#666" />
          <HighlightedText
            text={date}
            highlight={highlight}
            fontSize={responsiveFontSize(1.7)}
            color="#666"
          />
        </View>

        <View style={styles.infoRow}>
          <Icon name="person-outline" size={16} color="#666" />
          <HighlightedText
            text={username}
            highlight={highlight}
            fontSize={responsiveFontSize(1.7)}
            color="#666"
          />
        </View>

        <View style={styles.infoRow}>
          <Icon name="pricetag-outline" size={16} color="#666" />
          <HighlightedText
            text={category}
            highlight={highlight}
            fontSize={responsiveFontSize(1.7)}
            color="#666"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(2),
    elevation: 3,
    overflow: 'hidden',
    marginBottom: responsiveHeight(2.5), // increased bottom margin
    width: '100%',
  },
  image: {
    width: '100%',
    height: responsiveHeight(22), // slightly taller
    backgroundColor: '#eee',
    borderTopLeftRadius: responsiveWidth(2),
    borderTopRightRadius: responsiveWidth(2),
  },
  details: {
    padding: responsiveWidth(4.5), // slightly more padding
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.2), // more space
  },
  statusBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(0.7),
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(2),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1), // more vertical space between rows
  },
});
