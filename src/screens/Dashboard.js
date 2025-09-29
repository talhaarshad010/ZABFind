// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   FlatList,
//   Modal,
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
// import ItemCard from '../components/ItemCard';
// import {useSelector} from 'react-redux';
// import ToastMessage from '../hooks/ToastMessage';
// import {useGetLostFoundItemsQuery} from '../store/Api/Auth';

// const Dashboard = () => {
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All Categories');
//   const [statusFilter, setStatusFilter] = useState('All Items');
//   const [dropdownModal, setDropdownModal] = useState({
//     visible: false,
//     field: '',
//     options: [],
//     title: '',
//   });
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
//       await refetch();
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
//         itemId: item._id,
//         imageUri: item.image || 'https://via.placeholder.com/150',
//         studentId: item.reportedBy?.studentId,
//         studentBackId: item.reportedBy?._id,
//         emailAddress: item.reportedBy?.email,
//         phoneNumber: item.reportedBy?.phoneNumber,
//         title: item.title,
//         description: item.description,
//         location: item.location,
//         date: new Date(item.date).toLocaleDateString('en-US', {
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric',
//         }),
//         username: item.reportedBy?.name || 'Admin',
//         status: item.type.charAt(0).toUpperCase() + item.type.slice(1),
//         category: item.category || 'Other',
//       })) || [];
//   console.log('Filtered Data:', filteredData);

//   const openDropdown = (field, options, title) => {
//     setDropdownModal({visible: true, field, options, title});
//   };

//   const handleDropdownSelect = value => {
//     if (dropdownModal.field === 'category') {
//       setCategoryFilter(value);
//     } else if (dropdownModal.field === 'status') {
//       setStatusFilter(value);
//     }
//     setDropdownModal({visible: false, field: '', options: [], title: ''});
//   };

//   return (
//     <WrapperContainer>
//       <MyHeader
//         ScreenName={'Dashboard'}
//         style={{backgroundColor: Colors.white, elevation: 10}}
//         leftView={true}
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
//               : `${filteredData.length} items. Help reunite them with their owners!`
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
//         keyExtractor={item => item.itemId.toString()}
//         contentContainerStyle={styles.scrollContainer}
//         refreshing={refreshing}
//         onRefresh={onRefresh}
//         ListHeaderComponent={
//           <View style={styles.searchSection}>
//             <MyTextInput
//               inputStyle={{paddingTop: responsiveHeight(0.5)}}
//               placeholder={'Search items by name, description, or ...'}
//               placeholderTextColor={Colors.gray}
//               LeftView={<Icon name="search" size={20} color={Colors.gray} />}
//               value={searchText}
//               onChangeText={setSearchText}
//               keyboardType="default" // General text input for search
//               autoCapitalize="none" // No capitalization for search terms
//               autoCorrect={false} // Disable auto-correct for search
//             />

//             <View style={styles.dropdownWrapper}>
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown(
//                     'category',
//                     [
//                       'All Categories',
//                       'Electronics',
//                       'Personal Items',
//                       'Keys',
//                       'Accessories',
//                       'Books',
//                       'Documents',
//                       'Clothing',
//                       'Sports Equipment',
//                       'Other',
//                     ],
//                     'Select Category',
//                   )
//                 }>
//                 <MyText
//                   text={categoryFilter || 'Select Category'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={categoryFilter ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown(
//                     'status',
//                     ['All Items', 'Lost', 'Found'],
//                     'Select Status',
//                   )
//                 }>
//                 <MyText
//                   text={statusFilter || 'Select Status'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={statusFilter ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         }
//         renderItem={({item}) => (
//           console.log('item in flat list:', item),
//           (
//             <ItemCard
//               itemId={item.itemId}
//               imageUri={item.imageUri}
//               title={item.title}
//               description={item.description}
//               location={item.location}
//               date={item.date}
//               category={item.category}
//               username={item.username}
//               status={item.status}
//               highlight={searchText}
//               studentId={item.studentId}
//               studentBackId={item.studentBackId}
//               emailAddress={item.emailAddress}
//               phoneNumber={item.phoneNumber}
//             />
//           )
//         )}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <MyText
//               text="No listings available"
//               fontSize={responsiveFontSize(2.2)}
//               fontWeight="500"
//               color={Colors.gray}
//               textStyle={{textAlign: 'center'}}
//             />
//           </View>
//         }
//         ListFooterComponent={<View style={{height: responsiveHeight(10)}} />}
//       />

//       <Modal
//         transparent
//         animationType="fade"
//         visible={dropdownModal.visible}
//         onRequestClose={() =>
//           setDropdownModal({visible: false, field: '', options: [], title: ''})
//         }>
//         <View style={styles.modalOverlay}>
//           <View style={styles.dropdownModal}>
//             <MyText
//               text={dropdownModal.title}
//               fontSize={responsiveFontSize(2.5)}
//               fontWeight="600"
//               color={Colors.black}
//               textStyle={{
//                 marginBottom: responsiveHeight(2),
//                 textAlign: 'center',
//               }}
//             />
//             <FlatList
//               data={dropdownModal.options}
//               keyExtractor={item => item}
//               showsVerticalScrollIndicator={false}
//               renderItem={({item}) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.dropdownItem,
//                     (dropdownModal.field === 'category' &&
//                       item === categoryFilter) ||
//                     (dropdownModal.field === 'status' && item === statusFilter)
//                       ? {backgroundColor: Colors.primaryLight}
//                       : null,
//                   ]}
//                   onPress={() => handleDropdownSelect(item)}>
//                   <MyText
//                     text={item}
//                     fontSize={responsiveFontSize(2)}
//                     color={
//                       (dropdownModal.field === 'category' &&
//                         item === categoryFilter) ||
//                       (dropdownModal.field === 'status' &&
//                         item === statusFilter)
//                         ? Colors.primary
//                         : Colors.black
//                     }
//                     fontWeight={
//                       (dropdownModal.field === 'category' &&
//                         item === categoryFilter) ||
//                       (dropdownModal.field === 'status' &&
//                         item === statusFilter)
//                         ? '600'
//                         : '500'
//                     }
//                   />
//                 </TouchableOpacity>
//               )}
//               style={{maxHeight: responsiveHeight(30)}}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() =>
//                 setDropdownModal({
//                   visible: false,
//                   field: '',
//                   options: [],
//                   title: '',
//                 })
//               }>
//               <MyText
//                 text="Cancel"
//                 color={Colors.darkGray}
//                 fontSize={responsiveFontSize(2)}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
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
//   inputContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//     borderRadius: responsiveWidth(2.5),
//     paddingHorizontal: responsiveWidth(3),
//     paddingVertical: responsiveHeight(1.5),
//     backgroundColor: '#f9f9f9',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dropdownModal: {
//     backgroundColor: Colors.white,
//     borderRadius: responsiveWidth(3),
//     padding: responsiveWidth(4),
//     width: responsiveWidth(80),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   dropdownItem: {
//     paddingVertical: responsiveHeight(1.5),
//     paddingHorizontal: responsiveWidth(3),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.lightGray,
//   },
//   modalButton: {
//     width: '100%',
//     backgroundColor: '#f9f9f9',
//     paddingVertical: responsiveHeight(1.5),
//     borderRadius: responsiveWidth(3),
//     alignItems: 'center',
//     marginTop: responsiveHeight(1),
//   },
//   emptyContainer: {
//     paddingVertical: responsiveHeight(5),
//     alignItems: 'center',
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
import Svg, {Path, Circle, Rect} from 'react-native-svg';

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
        itemId: item._id,
        imageUri: item.image || 'https://via.placeholder.com/150',
        studentId: item.reportedBy?.studentId,
        studentBackId: item.reportedBy?._id,
        emailAddress: item.reportedBy?.email,
        phoneNumber: item.reportedBy?.phoneNumber,
        title: item.title,
        description: item.description,
        location: item.location,
        date: new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        username: item.reportedBy?.name || 'Admin',
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

  // Colorful SVG for empty state
  const EmptyStateSVG = () => (
    <Svg
      width={responsiveWidth(50)}
      height={responsiveWidth(50)}
      viewBox="0 0 200 200"
      style={styles.emptySvg}>
      {/* Background Circle */}
      <Circle cx="100" cy="100" r="90" fill="#E6F0FA" />
      {/* Magnifying Glass */}
      <Path
        d="M150 150 L170 170"
        stroke="#FF6B6B"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <Circle
        cx="120"
        cy="120"
        r="30"
        fill="none"
        stroke="#FF6B6B"
        strokeWidth="8"
      />
      {/* Box */}
      <Rect x="60" y="80" width="80" height="60" fill="#4ECDC4" rx="5" />
      {/* Key */}
      <Path
        d="M80 100 L90 100 A10 10 0 0 1 100 110 L110 110"
        fill="none"
        stroke="#FFD93D"
        strokeWidth="6"
      />
      <Circle cx="80" cy="100" r="5" fill="#FFD93D" />
      {/* Phone */}
      <Rect x="110" y="90" width="20" height="30" fill="#FF9F43" rx="3" />
      {/* Wallet */}
      <Rect x="70" y="110" width="30" height="20" fill="#1A936F" rx="3" />
    </Svg>
  );

  return (
    <WrapperContainer>
      <MyHeader
        ScreenName={'Dashboard'}
        style={{backgroundColor: Colors.white, elevation: 10}}
        leftView={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{
                height: responsiveHeight(5),
                width: responsiveWidth(10),
                borderRadius: responsiveWidth(5),
              }}
              source={{uri: user.profileImage}}
            />
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
              : `${filteredData.length} items. Help reunite them with their owners!`
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
        keyExtractor={item => item.itemId.toString()}
        contentContainerStyle={styles.scrollContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View style={styles.searchSection}>
            <MyTextInput
              inputStyle={{paddingTop: responsiveHeight(0.5)}}
              placeholder={'Search items by name, description, or ...'}
              placeholderTextColor={Colors.gray}
              LeftView={<Icon name="search" size={20} color={Colors.gray} />}
              value={searchText}
              onChangeText={setSearchText}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
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
          console.log('item in flat list:', item),
          (
            <ItemCard
              itemId={item.itemId}
              imageUri={item.imageUri}
              title={item.title}
              description={item.description}
              location={item.location}
              date={item.date}
              category={item.category}
              username={item.username}
              status={item.status}
              highlight={searchText}
              studentId={item.studentId}
              studentBackId={item.studentBackId}
              emailAddress={item.emailAddress}
              phoneNumber={item.phoneNumber}
            />
          )
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmptyStateSVG />
            <MyText
              text="No lost or found items yet!"
              fontSize={responsiveFontSize(2.2)}
              fontWeight="500"
              color={Colors.gray}
              textStyle={{textAlign: 'center', marginTop: responsiveHeight(2)}}
            />
            <MyText
              text="Be the first to report an item."
              fontSize={responsiveFontSize(1.8)}
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
              showsVerticalScrollIndicator={false}
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
    justifyContent: 'center',
  },
  emptySvg: {
    marginBottom: responsiveHeight(2),
  },
});
