// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   FlatList,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Colors from '../styles/Colors';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import MyText from '../components/textcomponent';
// import MyButton from '../components/CustomButton';
// import MyTextInput from '../components/TextInputComponent';
// import TextInputDropdown from '../components/Dropdown';
// import ItemCard from '../components/ItemCard';
// import {useSelector} from 'react-redux';
// import ToastMessage from '../hooks/ToastMessage';
// import {useGetLostFoundItemsQuery} from '../store/Api/Auth';

// const Dashboard = () => {
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All Categories');
//   const [statusFilter, setStatusFilter] = useState('All Items');
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const {Toasts} = ToastMessage();
//   const {user} = useSelector(state => state.Auth);
//   console.log('User in Dashboard:', user);
//   const [refreshing, setRefreshing] = useState(false);
//   // Fetch data using RTK Query
//   const {data, error, isLoading, isFetching, refetch} =
//     useGetLostFoundItemsQuery();
//   const onRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await refetch(); // Call the API again
//     } catch (err) {
//       console.error('Refresh Error:', err);
//     }
//     setRefreshing(false);
//   };
//   console.log('Data from API:', data);

//   // Log query state for debugging
//   useEffect(() => {
//     console.log('Query State:', {
//       data,
//       error,
//       isLoading,
//       isFetching,
//     });
//   }, [data, error, isLoading, isFetching]);

//   // Handle API errors
//   useEffect(() => {
//     if (error) {
//       let errorMessage = 'Failed to fetch items. Please try again.';
//       if (error.status === 401) {
//         errorMessage = 'Unauthorized. Please log in again.';
//       } else if (error.status === 500) {
//         errorMessage = 'Server error. Please try again later.';
//       } else if (error.status === 'FETCH_ERROR') {
//         errorMessage =
//           'No response from server. Check your network connection.';
//       }
//       Toasts('Error', errorMessage, 'error', 4000);
//       console.error('API Error:', error);
//     }
//   }, [error]);

//   // Map API data to the format expected by ItemCard
//   const filteredData =
//     data?.data
//       ?.filter(item => {
//         console.log('items:', item);
//         const lowerSearch = searchText.toLowerCase();
//         const matchesSearch =
//           item.title.toLowerCase().includes(lowerSearch) ||
//           item.description.toLowerCase().includes(lowerSearch) ||
//           item.location.toLowerCase().includes(lowerSearch) ||
//           item.reportedBy?.name?.toLowerCase().includes(lowerSearch) ||
//           false;

//         const matchesCategory =
//           categoryFilter === 'All Categories' ||
//           item.category?.toLowerCase() === categoryFilter.toLowerCase();

//         const matchesStatus =
//           statusFilter === 'All Items' ||
//           item.type.charAt(0).toUpperCase() + item.type.slice(1) ===
//             statusFilter;

//         return matchesSearch && matchesCategory && matchesStatus;
//       })
//       .map(item => ({
//         id: item._id,
//         imageUri: item.image || 'https://via.placeholder.com/150',
//         title: item.title,
//         description: item.description,
//         location: item.location,
//         date: new Date(item.date).toLocaleDateString('en-US', {
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric',
//         }),
//         username: item.reportedBy?.name || 'Unknown',
//         status: item.type.charAt(0).toUpperCase() + item.type.slice(1),
//         category: item.category || 'Other',
//       })) || [];
//   console.log('Filtered Data:', filteredData);
//   return (
//     <WrapperContainer>
//       <MyHeader
//         ScreenName={'Dashboard'}
//         style={{backgroundColor: Colors.white, elevation: 10}}
//         leftView={
//           <TouchableOpacity onPress={() => navigation.openDrawer()}>
//             <Icon name="person-circle-outline" size={30} color={Colors.black} />
//           </TouchableOpacity>
//         }
//         rightView={
//           <View>
//             <Image style={styles.logo} source={require('../assets/logo.png')} />
//           </View>
//         }
//       />

//       <View style={styles.topSection}>
//         <MyText
//           color={Colors.black}
//           fontSize={responsiveFontSize(3.5)}
//           fontWeight={'600'}
//           text={'Lost & Found Items'}
//         />
//         <MyText
//           text={
//             isLoading || isFetching
//               ? 'Loading items...'
//               : `${filteredData.length} items found. Help reunite them with their owners!`
//           }
//         />
//         <MyButton
//           style={{marginVertical: responsiveHeight(2)}}
//           backgroundColor={Colors.primary}
//           text="Report Item"
//           onPress={() => navigation.navigate('ReportItem')}
//         />
//       </View>

//       <FlatList
//         showsVerticalScrollIndicator={false}
//         data={filteredData}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.scrollContainer}
//         refreshing={refreshing} // 👈 Pull-to-refresh loader state
//         onRefresh={onRefresh}
//         ListHeaderComponent={
//           <View style={styles.searchSection}>
//             <MyTextInput
//               placeholder={'Search for items by their names '}
//               placeholderTextColor={Colors.gray}
//               LeftView={<Icon name="search" size={20} color={Colors.gray} />}
//               value={searchText}
//               onChangeText={setSearchText}
//             />

//             <View style={styles.dropdownWrapper}>
//               <View
//                 style={{flex: 1, zIndex: openDropdown === 'category' ? 2 : 1}}>
//                 <TextInputDropdown
//                   defaultValue={categoryFilter}
//                   data={[
//                     'All Categories',
//                     'Electronics',
//                     'Personal Items',
//                     'Keys',
//                     'Accessories',
//                     'Books',
//                     'Documents',
//                     'Clothing',
//                     'Sports Equipment',
//                     'Other',
//                   ]}
//                   onSelect={item => {
//                     setCategoryFilter(item);
//                     setOpenDropdown(null);
//                   }}
//                   isOpen={openDropdown === 'category'}
//                   onToggle={() =>
//                     setOpenDropdown(
//                       openDropdown === 'category' ? null : 'category',
//                     )
//                   }
//                 />
//               </View>

//               <View
//                 style={{flex: 1, zIndex: openDropdown === 'status' ? 2 : 1}}>
//                 <TextInputDropdown
//                   defaultValue={statusFilter}
//                   data={['All Items', 'Lost', 'Found']}
//                   onSelect={item => {
//                     setStatusFilter(item);
//                     setOpenDropdown(null);
//                   }}
//                   isOpen={openDropdown === 'status'}
//                   onToggle={() =>
//                     setOpenDropdown(openDropdown === 'status' ? null : 'status')
//                   }
//                 />
//               </View>
//             </View>
//           </View>
//         }
//         renderItem={({item}) => (
//           <ItemCard
//             imageUri={item.imageUri}
//             title={item.title}
//             description={item.description}
//             location={item.location}
//             date={item.date}
//             category={item.category}
//             username={item.username}
//             status={item.status}
//             highlight={searchText}
//           />
//         )}
//         ListFooterComponent={<View style={{height: responsiveHeight(10)}} />}
//       />
//     </WrapperContainer>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   logo: {
//     width: responsiveWidth(10),
//     height: responsiveWidth(10),
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//     paddingHorizontal: responsiveWidth(3),
//   },
//   topSection: {
//     justifyContent: 'center',
//     paddingVertical: responsiveHeight(3),
//     paddingHorizontal: responsiveWidth(3),
//   },
//   searchSection: {
//     paddingVertical: responsiveHeight(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: Colors.lightGray,
//     borderWidth: responsiveWidth(0.4),
//     borderRadius: responsiveWidth(2),
//     paddingHorizontal: responsiveWidth(3),
//     marginBottom: responsiveHeight(2),
//   },
//   dropdownWrapper: {
//     flexDirection: 'row',
//     marginTop: responsiveHeight(2),
//     gap: responsiveWidth(2),
//     width: '100%',
//   },
// });

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
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
import ItemCard from '../components/ItemCard';
import {useSelector} from 'react-redux';
import ToastMessage from '../hooks/ToastMessage';
import {useGetLostFoundItemsQuery} from '../store/Api/Auth';

const Dashboard = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Items');
  const [dropdownModal, setDropdownModal] = useState({
    visible: false,
    field: '',
    options: [],
    title: '',
  });
  const {Toasts} = ToastMessage();
  const {user} = useSelector(state => state.Auth);
  console.log('User in Dashboard:', user);
  const [refreshing, setRefreshing] = useState(false);
  // Fetch data using RTK Query
  const {data, error, isLoading, isFetching, refetch} =
    useGetLostFoundItemsQuery();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.error('Refresh Error:', err);
    }
    setRefreshing(false);
  };
  console.log('Data from API:', data);

  // Log query state for debugging
  useEffect(() => {
    console.log('Query State:', {
      data,
      error,
      isLoading,
      isFetching,
    });
  }, [data, error, isLoading, isFetching]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      let errorMessage = 'Failed to fetch items. Please try again.';
      if (error.status === 401) {
        errorMessage = 'Unauthorized. Please log in again.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.status === 'FETCH_ERROR') {
        errorMessage =
          'No response from server. Check your network connection.';
      }
      Toasts('Error', errorMessage, 'error', 4000);
      console.error('API Error:', error);
    }
  }, [error]);

  // Map API data to the format expected by ItemCard
  const filteredData =
    data?.data
      ?.filter(item => {
        console.log('items:', item);
        const lowerSearch = searchText.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(lowerSearch) ||
          item.description.toLowerCase().includes(lowerSearch) ||
          item.location.toLowerCase().includes(lowerSearch) ||
          item.reportedBy?.name?.toLowerCase().includes(lowerSearch) ||
          false;

        const matchesCategory =
          categoryFilter === 'All Categories' ||
          item.category?.toLowerCase() === categoryFilter.toLowerCase();

        const matchesStatus =
          statusFilter === 'All Items' ||
          item.type.charAt(0).toUpperCase() + item.type.slice(1) ===
            statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .map(item => ({
        id: item._id,
        imageUri: item.image || 'https://via.placeholder.com/150',
        title: item.title,
        description: item.description,
        location: item.location,
        date: new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        username: item.reportedBy?.name || 'Unknown',
        status: item.type.charAt(0).toUpperCase() + item.type.slice(1),
        category: item.category || 'Other',
      })) || [];
  console.log('Filtered Data:', filteredData);

  const openDropdown = (field, options, title) => {
    setDropdownModal({visible: true, field, options, title});
  };

  const handleDropdownSelect = value => {
    if (dropdownModal.field === 'category') {
      setCategoryFilter(value);
    } else if (dropdownModal.field === 'status') {
      setStatusFilter(value);
    }
    setDropdownModal({visible: false, field: '', options: [], title: ''});
  };

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
          text={
            isLoading || isFetching
              ? 'Loading items...'
              : `${filteredData.length} items found. Help reunite them with their owners!`
          }
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
        refreshing={refreshing}
        onRefresh={onRefresh}
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
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown(
                    'category',
                    [
                      'All Categories',
                      'Electronics',
                      'Personal Items',
                      'Keys',
                      'Accessories',
                      'Books',
                      'Documents',
                      'Clothing',
                      'Sports Equipment',
                      'Other',
                    ],
                    'Select Category',
                  )
                }>
                <MyText
                  text={categoryFilter || 'Select Category'}
                  fontSize={responsiveFontSize(1.9)}
                  color={categoryFilter ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown(
                    'status',
                    ['All Items', 'Lost', 'Found'],
                    'Select Status',
                  )
                }>
                <MyText
                  text={statusFilter || 'Select Status'}
                  fontSize={responsiveFontSize(1.9)}
                  color={statusFilter ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MyText
              text="No listings available"
              fontSize={responsiveFontSize(2.2)}
              fontWeight="500"
              color={Colors.gray}
              textStyle={{textAlign: 'center'}}
            />
          </View>
        }
        ListFooterComponent={<View style={{height: responsiveHeight(10)}} />}
      />

      <Modal
        transparent
        animationType="fade"
        visible={dropdownModal.visible}
        onRequestClose={() =>
          setDropdownModal({visible: false, field: '', options: [], title: ''})
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
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    (dropdownModal.field === 'category' &&
                      item === categoryFilter) ||
                    (dropdownModal.field === 'status' && item === statusFilter)
                      ? {backgroundColor: Colors.primaryLight}
                      : null,
                  ]}
                  onPress={() => handleDropdownSelect(item)}>
                  <MyText
                    text={item}
                    fontSize={responsiveFontSize(2)}
                    color={
                      (dropdownModal.field === 'category' &&
                        item === categoryFilter) ||
                      (dropdownModal.field === 'status' &&
                        item === statusFilter)
                        ? Colors.primary
                        : Colors.black
                    }
                    fontWeight={
                      (dropdownModal.field === 'category' &&
                        item === categoryFilter) ||
                      (dropdownModal.field === 'status' &&
                        item === statusFilter)
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
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(2.5),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
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
  emptyContainer: {
    paddingVertical: responsiveHeight(5),
    alignItems: 'center',
  },
});
