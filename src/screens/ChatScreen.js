// // src/screens/ChatScreen.js
// import React, {useState, useEffect, useCallback} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import io from 'socket.io-client';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import Colors from '../styles/Colors';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import axios from 'axios';
// import {BaseUrl, SocketUrl} from '../config/Urls';
// import {useSelector} from 'react-redux';

// const socket = io(SocketUrl); // Replace with your server URL

// const ChatScreen = () => {
//   const {user} = useSelector(state => state.Auth);
//   console.log('user from selector in chat screen', user);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {itemId, receiverId, receiverName} = route.params || {};
//   console.log(
//     'data from route in chat screen',
//     itemId,
//     ' ',
//     receiverId,
//     ' ',
//     receiverName,
//   );
//   const [messages, setMessages] = useState([]);

//   // Generate a unique roomId (e.g., combine itemId and sorted user IDs)
//   const roomId = [itemId, user._id, receiverId].sort().join('-');

//   console.log('itemId in chatscreen:', itemId);
//   console.log('receiverId in chatscreen:', receiverId);
//   console.log('roomId in chatscreen:', roomId);

//   // Fetch chat history
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await axios.get(`${BaseUrl}/student/chat/${roomId}`);
//         console.log('responce of fetch chats:', response);
//         const chatHistory = response.data.map(msg => ({
//           _id: msg._id,
//           text: msg.message,
//           createdAt: new Date(msg.timestamp),
//           user: {
//             _id: msg.senderId,
//             name: msg.senderId === user._id ? user.fullName : receiverName,
//           },
//         }));
//         setMessages(chatHistory.reverse()); // Latest messages first
//       } catch (error) {
//         console.error('Error fetching chat history:', error);
//       }
//     };

//     fetchChatHistory();

//     // Join the chat room
//     socket.emit('join_room', {roomId, userId: user._id});

//     // Listen for incoming messages
//     socket.on('receive_message', messageData => {
//       console.log('receive_message', messageData);
//       setMessages(previousMessages =>
//         GiftedChat.append(previousMessages, [
//           {
//             _id: Math.random().toString(),
//             text: messageData.message,
//             createdAt: new Date(messageData.timestamp),
//             user: {
//               _id: messageData.senderId,
//               name:
//                 messageData.senderId === user._id
//                   ? user.fullName
//                   : receiverName,
//             },
//           },
//         ]),
//       );
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off('receive_message');
//     };
//   }, [roomId, user._id, user.fullName, receiverName]);

//   // Send message
//   const onSend = useCallback(
//     (newMessages = []) => {
//       const message = newMessages[0];
//       socket.emit('send_message', {
//         roomId,
//         message: message.text,
//         senderId: user._id,
//         receiverId,
//       });
//       setMessages(previousMessages =>
//         GiftedChat.append(previousMessages, newMessages),
//       );
//     },
//     [roomId, user._id, receiverId],
//   );

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName={`Chat with ${receiverName}`}
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         onPressleft={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <GiftedChat
//           messages={messages}
//           onSend={messages => onSend(messages)}
//           user={{
//             _id: user._id,
//             name: user.fullName,
//           }}
//           placeholder="Type a message..."
//           showUserAvatar={false}
//           renderAvatar={null}
//         />
//       </View>
//     </WrapperContainer>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
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
// });

// // src/screens/ChatScreen.js
// import React, {useState, useEffect, useCallback} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import io from 'socket.io-client';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import Colors from '../styles/Colors';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import axios from 'axios';
// import {BaseUrl, SocketUrl} from '../config/Urls';
// import {useSelector} from 'react-redux';

// const socket = io(SocketUrl); // Replace with your server URL

// const ChatScreen = () => {
//   const {user} = useSelector(state => state.Auth);
//   console.log('user from selector in chat screen', user);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {itemId, receiverId, receiverName} = route.params || {};
//   console.log(
//     'data from route in chat screen',
//     itemId,
//     ' ',
//     receiverId,
//     ' ',
//     receiverName,
//   );
//   const [messages, setMessages] = useState([]);

//   // Generate a unique roomId (e.g., combine itemId and sorted user IDs)
//   const roomId = [itemId, user._id, receiverId].sort().join('-');

//   console.log('itemId in chatscreen:', itemId);
//   console.log('user._id in chatscreen:', user._id);
//   console.log('receiverId in chatscreen:', receiverId);
//   console.log('roomId in chatscreen:', roomId);

//   // Fetch chat history
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await axios.get(`${BaseUrl}/student/chat/${roomId}`);
//         console.log('responce of fetch chats:', response);
//         const chatHistory = response.data.map(msg => ({
//           _id: msg._id,
//           text: msg.message,
//           createdAt: new Date(msg.timestamp),
//           user: {
//             _id: msg.senderId._id || msg.senderId, // Handle populated or string
//             name:
//               (msg.senderId._id || msg.senderId).toString() === user._id
//                 ? user.fullName
//                 : receiverName,
//           },
//         }));
//         setMessages(chatHistory.reverse()); // Latest messages first
//       } catch (error) {
//         console.error('Error fetching chat history:', error);
//       }
//     };

//     fetchChatHistory();

//     // Join the chat room
//     socket.emit('join_room', {roomId, userId: user._id});

//     // Listen for incoming messages
//     socket.on('receive_message', messageData => {
//       console.log('receive_message', messageData);
//       // Only append if not from self (prevents duplicate for sender)
//       if (messageData.senderId !== user._id) {
//         setMessages(previousMessages =>
//           GiftedChat.append(previousMessages, [
//             {
//               _id: messageData._id || Math.random().toString(),
//               text: messageData.message,
//               createdAt: new Date(messageData.timestamp),
//               user: {
//                 _id: messageData.senderId,
//                 name: receiverName, // From the other user
//               },
//             },
//           ]),
//         );
//       }
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off('receive_message');
//     };
//   }, [roomId, user._id, user.fullName, receiverName]);

//   // Send message
//   const onSend = useCallback(
//     (newMessages = []) => {
//       const message = newMessages[0];
//       socket.emit('send_message', {
//         roomId,
//         message: message.text,
//         senderId: user._id,
//         receiverId,
//       });
//       setMessages(previousMessages =>
//         GiftedChat.append(previousMessages, newMessages),
//       );
//     },
//     [roomId, user._id, receiverId],
//   );

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName={`Chat with ${receiverName}`}
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         onPressleft={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <GiftedChat
//           messages={messages}
//           onSend={messages => onSend(messages)}
//           user={{
//             _id: user._id,
//             name: user.fullName,
//           }}
//           placeholder="Type a message..."
//           showUserAvatar={false}
//           renderAvatar={null}
//         />
//       </View>
//     </WrapperContainer>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
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
// });

// // src/screens/ChatScreen.js
// import React, {useState, useEffect, useCallback} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import io from 'socket.io-client';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import Colors from '../styles/Colors';
// import WrapperContainer from '../components/WrapperContainer';
// import MyHeader from '../components/Header';
// import Icon from 'react-native-vector-icons/Feather';
// import axios from 'axios';
// import {BaseUrl, SocketUrl} from '../config/Urls';
// import {useSelector} from 'react-redux';

// const socket = io(SocketUrl);

// const ChatScreen = () => {
//   const {user} = useSelector(state => state.Auth);
//   console.log('user from selector in chat screen', user);
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {receiverId, receiverName} = route.params || {};
//   console.log('data from route in chat screen', receiverId, receiverName);
//   const [messages, setMessages] = useState([]);

//   const canonicalRoomId = [user._id, receiverId].sort().join('-');
//   console.log('canonicalRoomId in chatscreen:', canonicalRoomId);

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await axios.get(
//           `${BaseUrl}/student/chat/${receiverId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           },
//         );
//         console.log('response of fetch chats:', response.data);
//         const chatHistory = response.data.map(msg => ({
//           _id: msg._id,
//           text: msg.message,
//           createdAt: new Date(msg.timestamp),
//           user: {
//             _id: (msg.senderId._id || msg.senderId).toString(),
//             name:
//               (msg.senderId._id || msg.senderId).toString() === user._id
//                 ? user.fullName
//                 : receiverName,
//           },
//         }));
//         setMessages(chatHistory.reverse());
//       } catch (error) {
//         console.error('Error fetching chat history:', error);
//       }
//     };

//     if (receiverId) {
//       fetchChatHistory();
//     }

//     socket.emit('join_room', {roomId: canonicalRoomId, userId: user._id});

//     socket.on('receive_message', messageData => {
//       console.log('receive_message', messageData);
//       if (messageData.senderId !== user._id) {
//         setMessages(previousMessages => {
//           if (previousMessages.some(msg => msg._id === messageData._id)) {
//             return previousMessages;
//           }
//           return GiftedChat.append(previousMessages, [
//             {
//               _id: messageData._id,
//               text: messageData.message,
//               createdAt: new Date(messageData.timestamp),
//               user: {
//                 _id: messageData.senderId,
//                 name: receiverName,
//               },
//             },
//           ]);
//         });
//       }
//     });

//     return () => {
//       socket.off('receive_message');
//     };
//   }, [
//     canonicalRoomId,
//     user._id,
//     user.fullName,
//     receiverName,
//     receiverId,
//     user.token,
//   ]);

//   const onSend = useCallback(
//     (newMessages = []) => {
//       const message = newMessages[0];
//       socket.emit('send_message', {
//         roomId: canonicalRoomId,
//         message: message.text,
//         senderId: user._id,
//         receiverId,
//       });
//       setMessages(previousMessages =>
//         GiftedChat.append(previousMessages, newMessages),
//       );
//     },
//     [canonicalRoomId, user._id, receiverId],
//   );

//   return (
//     <WrapperContainer>
//       <MyHeader
//         style={styles.header}
//         ScreenName={`Chat with ${receiverName}`}
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         onPressleft={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <GiftedChat
//           messages={messages}
//           onSend={messages => onSend(messages)}
//           user={{
//             _id: user._id,
//             name: user.fullName,
//           }}
//           placeholder="Type a message..."
//           showUserAvatar={false}
//           renderAvatar={null}
//         />
//       </View>
//     </WrapperContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
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
// });

// export default ChatScreen;

// src/screens/ChatScreen.js
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {GiftedChat, Message} from 'react-native-gifted-chat';
import io from 'socket.io-client';
import {useNavigation, useRoute} from '@react-navigation/native';
import Colors from '../styles/Colors';
import WrapperContainer from '../components/WrapperContainer';
import MyHeader from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {BaseUrl, SocketUrl} from '../config/Urls';
import {useSelector} from 'react-redux';

const socket = io(SocketUrl);

const ChatScreen = () => {
  const {user} = useSelector(state => state.Auth);
  console.log('user from selector in chat screen', user);
  const navigation = useNavigation();
  const route = useRoute();
  const {receiverId, receiverName} = route.params || {};
  console.log('data from route in chat screen', receiverId, receiverName);
  const [messages, setMessages] = useState([]);

  const canonicalRoomId = [user._id, receiverId].sort().join('-');
  console.log('canonicalRoomId in chatscreen:', canonicalRoomId);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/student/chat/${receiverId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        console.log('response of fetch chats:', response.data);
        const chatHistory = response.data.map(msg => ({
          _id: msg._id,
          text: msg.message,
          createdAt: new Date(msg.timestamp),
          user: {
            _id: (msg.senderId._id || msg.senderId).toString(),
            name:
              (msg.senderId._id || msg.senderId).toString() === user._id
                ? user.fullName
                : receiverName,
          },
        }));
        setMessages(chatHistory.reverse());
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (receiverId) {
      fetchChatHistory();
    }

    socket.emit('join_room', {roomId: canonicalRoomId, userId: user._id});

    socket.on('receive_message', messageData => {
      console.log('receive_message', messageData);
      if (messageData.senderId !== user._id) {
        setMessages(previousMessages => {
          if (previousMessages.some(msg => msg._id === messageData._id)) {
            return previousMessages;
          }
          return GiftedChat.append(previousMessages, [
            {
              _id: messageData._id,
              text: messageData.message,
              createdAt: new Date(messageData.timestamp),
              user: {
                _id: messageData.senderId,
                name: receiverName,
              },
            },
          ]);
        });
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [
    canonicalRoomId,
    user._id,
    user.fullName,
    receiverName,
    receiverId,
    user.token,
  ]);

  const onSend = useCallback(
    (newMessages = []) => {
      const message = newMessages[0];
      socket.emit('send_message', {
        roomId: canonicalRoomId,
        message: message.text,
        senderId: user._id,
        receiverId,
      });
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
    },
    [canonicalRoomId, user._id, receiverId],
  );

  // Custom renderMessage to avoid key prop warning
  const renderMessage = props => {
    const {currentMessage, ...messageProps} = props;
    return (
      <Message
        key={currentMessage._id} // Explicitly pass key
        {...messageProps}
        currentMessage={currentMessage}
      />
    );
  };

  return (
    <WrapperContainer>
      <MyHeader
        style={styles.header}
        ScreenName={`Chat with ${receiverName}`}
        leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
        onPressleft={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: user._id,
            name: user.fullName,
          }}
          placeholder="Type a message..."
          showUserAvatar={false}
          renderAvatar={null}
          renderMessage={renderMessage} // Add custom renderMessage
        />
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default ChatScreen;
