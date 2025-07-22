import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import WrapperContainer from '../components/WrapperContainer';
import MyHeader from '../components/Header';
import Colors from '../styles/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import MyText from '../components/textcomponent';
import MyButton from '../components/CustomButton';
import MyTextInput from '../components/TextInputComponent';
import TextInputDropdown from '../components/Dropdown';
import ItemCard from '../components/ItemCard';
import {lostItems} from '../data/LostItems';
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Items');
  const [filteredData, setFilteredData] = useState(lostItems);
  const [openDropdown, setOpenDropdown] = useState(null);

  const {user} = useSelector(state => state.Auth);
  console.log('User in Dashboard:', user);

  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();

    const filtered = lostItems.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch) ||
        item.location.toLowerCase().includes(lowerSearch) ||
        item.username.toLowerCase().includes(lowerSearch);

      const matchesCategory =
        categoryFilter === 'All Categories' ||
        item.category.toLowerCase() === categoryFilter.toLowerCase();

      const matchesStatus =
        statusFilter === 'All Items' || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    setFilteredData(filtered);
  }, [searchText, categoryFilter, statusFilter]);

  return (
    <WrapperContainer>
      <MyHeader
        ScreenName={'Dashboard'}
        style={{backgroundColor: Colors.white, elevation: 10}}
        leftView={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="person-circle-outline" size={30} color={Colors.black} />
          </TouchableOpacity>
        }
        rightView={
          <View>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
          </View>
        }
      />

      <View style={styles.topSection}>
        <MyText
          color={Colors.black}
          fontSize={responsiveFontSize(3.5)}
          fontWeight={'600'}
          text={'Lost & Found Items'}
        />
        <MyText
          text={`${filteredData.length} items found. Help reunite them with their owners!`}
        />
        <MyButton
          style={{marginVertical: responsiveHeight(2)}}
          backgroundColor={Colors.primary}
          text="Report Item"
          onPress={() => navigation.navigate('ReportItem')}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        ListHeaderComponent={
          <View style={styles.searchSection}>
            <MyTextInput
              placeholder={'Search for items by their names '}
              placeholderTextColor={Colors.gray}
              LeftView={<Icon name="search" size={20} color={Colors.gray} />}
              value={searchText}
              onChangeText={setSearchText}
            />

            <View style={styles.dropdownWrapper}>
              <View
                style={{flex: 1, zIndex: openDropdown === 'category' ? 2 : 1}}>
                <TextInputDropdown
                  defaultValue={categoryFilter}
                  data={[
                    'All Categories',
                    'Electronics',
                    'Clothing',
                    'Books',
                    'Keys',
                    'Documents',
                    'Other',
                  ]}
                  onSelect={item => {
                    setCategoryFilter(item);
                    setOpenDropdown(null);
                  }}
                  isOpen={openDropdown === 'category'}
                  onToggle={() =>
                    setOpenDropdown(
                      openDropdown === 'category' ? null : 'category',
                    )
                  }
                />
              </View>

              <View
                style={{flex: 1, zIndex: openDropdown === 'status' ? 2 : 1}}>
                <TextInputDropdown
                  defaultValue={statusFilter}
                  data={['All Items', 'Lost', 'Found']}
                  onSelect={item => {
                    setStatusFilter(item);
                    setOpenDropdown(null);
                  }}
                  isOpen={openDropdown === 'status'}
                  onToggle={() =>
                    setOpenDropdown(openDropdown === 'status' ? null : 'status')
                  }
                />
              </View>
            </View>
          </View>
        }
        renderItem={({item}) => (
          <ItemCard
            imageUri={item.imageUri}
            title={item.title}
            description={item.description}
            location={item.location}
            date={item.date}
            category={item.category}
            username={item.username}
            status={item.status}
            highlight={searchText}
          />
        )}
        ListFooterComponent={<View style={{height: responsiveHeight(10)}} />}
      />
    </WrapperContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  logo: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: responsiveWidth(3),
  },
  topSection: {
    justifyContent: 'center',
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(3),
  },
  searchSection: {
    paddingVertical: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightGray,
    borderWidth: responsiveWidth(0.4),
    borderRadius: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(3),
    marginBottom: responsiveHeight(2),
  },
  dropdownWrapper: {
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
    gap: responsiveWidth(2),
    width: '100%',
  },
});
