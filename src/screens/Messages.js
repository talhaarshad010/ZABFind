// // src/screens/Messages.js
// import React, {useEffect, useState} from 'react';
// import {StyleSheet, FlatList, Pressable, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import axios from 'axios';
// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import {useNavigation} from '@react-navigation/native';
// import {BaseUrl} from '../config/Urls';

// const Messages = () => {
//   const {user} = useSelector(state => state.Auth);
//   console.log('user from selector in Messages screen', user);
//   const navigation = useNavigation();
//   const [chats, setChats] = useState([]);
//   const userToken = useSelector(state => state.Auth.token);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         // Fetch all chats where the user is either sender or receiver
//         const response = await axios.get(`${BaseUrl}/student/chats`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         console.log('all chat responce:', response);
//         const userChats = response.data.filter(
//           chat => chat.senderId === user._id || chat.receiverId === user._id,
//         );

//         console.log('userChats:', userChats);

//         // Group chats by roomId and get the latest message
//         const groupedChats = Object.values(
//           userChats.reduce((acc, chat) => {
//             if (!acc[chat.roomId]) {
//               acc[chat.roomId] = {
//                 roomId: chat.roomId,
//                 receiverId:
//                   chat.receiverId === user._id
//                     ? chat.receiverId
//                     : chat.senderId,
//                 receiverName:
//                   chat.receiverId === user._id
//                     ? chat.receiverName
//                     : 'Guest User',
//                 lastMessage: chat.lastMessage,
//                 timestamp: chat.timestamp,
//               };
//             }
//             return acc;
//           }, {}),
//         );
//         console.log('groupedChats', groupedChats);
//         setChats(groupedChats);
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       }
//     };

//     fetchChats();
//   }, [user._id]);

//   const renderChat = ({item}) => (
//     <Pressable
//       style={styles.chatItem}
//       onPress={() =>
//         navigation.navigate('ChatScreen', {
//           itemId: item.roomId.split('-')[0], // Extract itemId from roomId
//           receiverId: item.receiverId,
//           receiverName: item.receiverName,
//         })
//       }>
//       <MyText
//         text={item.receiverName}
//         fontSize={responsiveFontSize(2)}
//         fontWeight="bold"
//         style={styles.chatName}
//       />
//       <MyText
//         text={item.lastMessage}
//         fontSize={responsiveFontSize(1.8)}
//         style={styles.chatMessage}
//       />
//       <MyText
//         text={new Date(item.timestamp).toLocaleTimeString()}
//         fontSize={responsiveFontSize(1.5)}
//         style={styles.chatTime}
//       />
//     </Pressable>
//   );

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName="Messages"
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         onPressleft={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <FlatList
//           data={chats}
//           renderItem={renderChat}
//           keyExtractor={item => item.roomId}
//           ListEmptyComponent={
//             <MyText
//               text="No chats yet"
//               fontSize={responsiveFontSize(2)}
//               style={styles.emptyText}
//             />
//           }
//         />
//       </View>
//     </WrapperContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: responsiveWidth(3.5),
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
//   chatItem: {
//     padding: responsiveHeight(2),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.lightGray,
//     marginBottom: responsiveHeight(1),
//   },
//   chatName: {
//     color: Colors.black,
//   },
//   chatMessage: {
//     color: Colors.darkGray,
//   },
//   chatTime: {
//     color: Colors.grayInput,
//     alignSelf: 'flex-end',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: responsiveHeight(20),
//     color: Colors.darkGray,
//   },
// });
// export default Messages;

// // src/screens/Messages.js
// import React, {useEffect, useState} from 'react';
// import {StyleSheet, FlatList, Pressable, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import axios from 'axios';
// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import {useNavigation} from '@react-navigation/native';
// import {BaseUrl} from '../config/Urls';

// const Messages = () => {
//   const {user} = useSelector(state => state.Auth);
//   console.log('user from selector in Messages screen', user);
//   const navigation = useNavigation();
//   const [chats, setChats] = useState([]);
//   const userToken = useSelector(state => state.Auth.token);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         // Fetch all chats where the user is either sender or receiver (backend already filters self-chats)
//         const response = await axios.get(`${BaseUrl}/student/chats`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         console.log('all chat responce:', response);
//         let userChats = response.data; // Backend returns user's messages only

//         // Sort all messages by timestamp descending to process latest first
//         userChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//         // Group by roomId and get the latest message per room
//         const groupedChats = {};
//         userChats.forEach(chat => {
//           const roomId = chat.roomId;
//           if (
//             !groupedChats[roomId] ||
//             new Date(chat.timestamp) > new Date(groupedChats[roomId].timestamp)
//           ) {
//             const isUserSender = chat.senderId._id.toString() === user._id;
//             groupedChats[roomId] = {
//               roomId: roomId,
//               receiverId: isUserSender
//                 ? chat.receiverId._id.toString()
//                 : chat.senderId._id.toString(),
//               receiverName: isUserSender
//                 ? chat.receiverId.fullName
//                 : chat.senderId.fullName,
//               lastMessage: chat.message,
//               timestamp: chat.timestamp,
//             };
//           }
//         });

//         const chatsList = Object.values(groupedChats);
//         console.log('groupedChats', chatsList);
//         setChats(chatsList);
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       }
//     };

//     fetchChats();
//   }, [user._id]);

//   const renderChat = ({item}) => (
//     <Pressable
//       style={styles.chatItem}
//       onPress={() =>
//         navigation.navigate('ChatScreen', {
//           itemId: item.roomId.split('-')[0], // Extract itemId from roomId (assumes format)
//           receiverId: item.receiverId,
//           receiverName: item.receiverName,
//         })
//       }>
//       <MyText
//         text={item.receiverName}
//         fontSize={responsiveFontSize(2)}
//         fontWeight="bold"
//         style={styles.chatName}
//       />
//       <MyText
//         text={item.lastMessage}
//         fontSize={responsiveFontSize(1.8)}
//         style={styles.chatMessage}
//       />
//       <MyText
//         text={new Date(item.timestamp).toLocaleTimeString()}
//         fontSize={responsiveFontSize(1.5)}
//         style={styles.chatTime}
//       />
//     </Pressable>
//   );

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName="Messages"
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         onPressleft={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <FlatList
//           data={chats}
//           renderItem={renderChat}
//           keyExtractor={item => item.roomId}
//           ListEmptyComponent={
//             <MyText
//               text="No chats yet"
//               fontSize={responsiveFontSize(2)}
//               style={styles.emptyText}
//             />
//           }
//         />
//       </View>
//     </WrapperContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: responsiveWidth(3.5),
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
//   chatItem: {
//     padding: responsiveHeight(2),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.lightGray,
//     marginBottom: responsiveHeight(1),
//   },
//   chatName: {
//     color: Colors.black,
//   },
//   chatMessage: {
//     color: Colors.darkGray,
//   },
//   chatTime: {
//     color: Colors.grayInput,
//     alignSelf: 'flex-end',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: responsiveHeight(20),
//     color: Colors.darkGray,
//   },
// });
// export default Messages;
// src/screens/Messages.js

// import React, {useEffect, useState} from 'react';
// import {StyleSheet, FlatList, Pressable, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import axios from 'axios';
// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import {useNavigation} from '@react-navigation/native';
// import {BaseUrl} from '../config/Urls';

// const Messages = () => {
//   const {user} = useSelector(state => state.Auth);
//   console.log('user from selector in Messages screen', user);
//   const navigation = useNavigation();
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get(`${BaseUrl}/student/chats`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         console.log('all chat response:', response.data);
//         setChats(response.data);
//       } catch (error) {
//         console.error('Error fetching chats:', error);
//       }
//     };

//     fetchChats();
//   }, [user._id, user.token]);

//   const renderChat = ({item}) => (
//     <Pressable
//       style={styles.chatItem}
//       onPress={() =>
//         navigation.navigate('ChatScreen', {
//           receiverId: item.receiverId,
//           receiverName: item.receiverName,
//         })
//       }>
//       <MyText
//         text={item.receiverName}
//         fontSize={responsiveFontSize(2)}
//         fontWeight="bold"
//         style={styles.chatName}
//       />
//       <MyText
//         text={item.lastMessage}
//         fontSize={responsiveFontSize(1.8)}
//         style={styles.chatMessage}
//       />
//       <MyText
//         text={new Date(item.timestamp).toLocaleTimeString()}
//         fontSize={responsiveFontSize(1.5)}
//         style={styles.chatTime}
//       />
//     </Pressable>
//   );

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName="Messages"
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         onPressleft={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <FlatList
//           data={chats}
//           renderItem={renderChat}
//           keyExtractor={item => item.roomId}
//           ListEmptyComponent={
//             <MyText
//               text="No chats yet"
//               fontSize={responsiveFontSize(2)}
//               style={styles.emptyText}
//             />
//           }
//         />
//       </View>
//     </WrapperContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: responsiveWidth(3.5),
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
//   chatItem: {
//     padding: responsiveHeight(2),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.lightGray,
//     marginBottom: responsiveHeight(1),
//   },
//   chatName: {
//     color: Colors.black,
//   },
//   chatMessage: {
//     color: Colors.darkGray,
//   },
//   chatTime: {
//     color: Colors.grayInput,
//     alignSelf: 'flex-end',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: responsiveHeight(20),
//     color: Colors.darkGray,
//   },
// });

// export default Messages;

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   StyleSheet,
//   FlatList,
//   Pressable,
//   View,
//   RefreshControl,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import axios from 'axios';
// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import {useNavigation} from '@react-navigation/native';
// import {BaseUrl} from '../config/Urls';

// const Messages = () => {
//   const {user} = useSelector(state => state.Auth);
//   const navigation = useNavigation();

//   const [chats, setChats] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   // fetch chats function
//   const fetchChats = useCallback(async () => {
//     try {
//       const response = await axios.get(`${BaseUrl}/student/chats`, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
//       console.log('all chat response:', response.data);
//       setChats(response.data);
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//     }
//   }, [user.token]);

//   // initial load
//   useEffect(() => {
//     fetchChats();
//   }, [fetchChats]);

//   // pull to refresh handler
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchChats();
//     setRefreshing(false);
//   };

//   const renderChat = ({item}) => (
//     <Pressable
//       style={styles.chatItem}
//       onPress={() =>
//         navigation.navigate('ChatScreen', {
//           receiverId: item.receiverId,
//           receiverName: item.receiverName,
//         })
//       }>
//       <MyText
//         text={item.receiverName}
//         fontSize={responsiveFontSize(2)}
//         fontWeight="bold"
//         style={styles.chatName}
//       />
//       <MyText
//         text={item.lastMessage}
//         fontSize={responsiveFontSize(1.8)}
//         style={styles.chatMessage}
//       />
//       <MyText
//         text={new Date(item.timestamp).toLocaleTimeString()}
//         fontSize={responsiveFontSize(1.5)}
//         style={styles.chatTime}
//       />
//     </Pressable>
//   );

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName="Messages"
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         onPressleft={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <FlatList
//           data={chats}
//           renderItem={renderChat}
//           keyExtractor={item => item.roomId}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           ListEmptyComponent={
//             <MyText
//               text="No chats yet"
//               fontSize={responsiveFontSize(2)}
//               style={styles.emptyText}
//             />
//           }
//         />
//       </View>
//     </WrapperContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: responsiveWidth(3.5),
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
//   chatItem: {
//     padding: responsiveHeight(2),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.lightGray,
//     marginBottom: responsiveHeight(1),
//   },
//   chatName: {
//     color: Colors.black,
//   },
//   chatMessage: {
//     color: Colors.darkGray,
//   },
//   chatTime: {
//     color: Colors.grayInput,
//     alignSelf: 'flex-end',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: responsiveHeight(20),
//     color: Colors.darkGray,
//   },
// });

// export default Messages;

import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import WrapperContainer from '../components/WrapperContainer';
import MyHeader from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {BaseUrl, SocketUrl} from '../config/Urls';

const socket = io(SocketUrl);

const Messages = () => {
  const {user} = useSelector(state => state.Auth);
  console.log('user from selector in Messages screen', user);
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch chats function
  const fetchChats = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(`${BaseUrl}/student/chats`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log('all chat response:', response.data);
      setChats(
        response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        ),
      );
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setRefreshing(false);
    }
  }, [user.token]);

  // Initial load and Socket.IO setup
  useEffect(() => {
    fetchChats();

    // Join all relevant chat rooms for the user
    socket.emit('join_user_chats', {userId: user._id});

    // Listen for new messages
    socket.on('receive_message', messageData => {
      console.log('receive_message in Messages:', messageData);
      const {
        roomId,
        senderId,
        receiverId,
        message,
        timestamp,
        senderName,
        receiverName,
      } = messageData;
      const otherUserId = senderId === user._id ? receiverId : senderId;
      const otherUserName = senderId === user._id ? receiverName : senderName;

      setChats(prevChats => {
        const existingChatIndex = prevChats.findIndex(
          chat => chat.roomId === roomId,
        );
        const updatedChat = {
          roomId,
          receiverId: otherUserId,
          receiverName: otherUserName || 'Unknown',
          lastMessage: message,
          timestamp,
        };

        if (existingChatIndex >= 0) {
          const updatedChats = [...prevChats];
          updatedChats[existingChatIndex] = updatedChat;
          return updatedChats.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
          );
        } else {
          return [updatedChat, ...prevChats].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
          );
        }
      });
    });

    // Cleanup on unmount
    return () => {
      socket.off('receive_message');
    };
  }, [user._id, fetchChats]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchChats();
    setRefreshing(false);
  }, [fetchChats]);

  const renderChat = ({item}) => (
    <Pressable
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('ChatScreen', {
          receiverId: item.receiverId,
          receiverName: item.receiverName,
        })
      }>
      <MyText
        text={item.receiverName}
        fontSize={responsiveFontSize(2)}
        fontWeight="bold"
        style={styles.chatName}
      />
      <MyText
        text={item.lastMessage}
        fontSize={responsiveFontSize(1.8)}
        style={styles.chatMessage}
      />
      <MyText
        text={new Date(item.timestamp).toLocaleTimeString()}
        fontSize={responsiveFontSize(1.5)}
        style={styles.chatTime}
      />
    </Pressable>
  );

  return (
    <WrapperContainer>
      <MyHeader
        style={styles.header}
        ScreenName="Messages"
        leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
        onPressleft={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <FlatList
          data={chats}
          renderItem={renderChat}
          keyExtractor={item => item.roomId}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              progressBackgroundColor={Colors.white}
            />
          }
          ListEmptyComponent={
            <MyText
              text="No chats yet"
              fontSize={responsiveFontSize(2)}
              style={styles.emptyText}
            />
          }
        />
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(3.5),
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
  chatItem: {
    padding: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    marginBottom: responsiveHeight(1),
  },
  chatName: {
    color: Colors.black,
  },
  chatMessage: {
    color: Colors.darkGray,
  },
  chatTime: {
    color: Colors.grayInput,
    alignSelf: 'flex-end',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: responsiveHeight(20),
    color: Colors.darkGray,
  },
});

export default Messages;
