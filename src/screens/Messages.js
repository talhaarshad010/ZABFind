import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  View,
  RefreshControl,
  Image,
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

  // Mark chat as read
  const markChatAsRead = useCallback(
    async roomId => {
      try {
        await axios.post(
          `${BaseUrl}/student/chat/${roomId}/read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.roomId === roomId ? {...chat, unreadCount: 0} : chat,
          ),
        );
      } catch (error) {
        console.error('Error marking chat as read:', error);
      }
    },
    [user.token],
  );

  // Handle new messages via Socket.IO
  useEffect(() => {
    fetchChats();

    socket.emit('join_user_chats', {userId: user._id});

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
        senderProfileImage,
        receiverProfileImage,
        isRead,
      } = messageData;
      const otherUserId = senderId === user._id ? receiverId : senderId;
      const otherUserName = senderId === user._id ? receiverName : senderName;
      const otherUserProfileImage =
        senderId === user._id ? receiverProfileImage : senderProfileImage;

      setChats(prevChats => {
        const existingChatIndex = prevChats.findIndex(
          chat => chat.roomId === roomId,
        );
        const updatedChat = {
          roomId,
          receiverId: otherUserId,
          receiverName: otherUserName || 'Unknown',
          lastMessage: message,
          timestamp: new Date(timestamp), // Ensure timestamp is a Date object
          profileImage: otherUserProfileImage || '',
          unreadCount:
            existingChatIndex >= 0
              ? prevChats[existingChatIndex].unreadCount || 0
              : 0,
        };

        // Increment unreadCount for new messages where user is receiver
        if (receiverId === user._id && !isRead) {
          updatedChat.unreadCount += 1;
        }

        let updatedChats;
        if (existingChatIndex >= 0) {
          updatedChats = [...prevChats];
          updatedChats[existingChatIndex] = updatedChat;
        } else {
          updatedChats = [updatedChat, ...prevChats];
        }

        // Sort chats by timestamp to ensure latest message appears at the top
        return updatedChats.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
      });
    });

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

  const renderChat = useCallback(
    ({item}) => (
      <Pressable
        style={({pressed}) => [
          styles.chatItem,
          pressed && styles.chatItemPressed,
        ]}
        onPress={() => {
          markChatAsRead(item.roomId);
          navigation.navigate('ChatScreen', {
            receiverId: item.receiverId,
            receiverName: item.receiverName,
            profileImage: item.profileImage,
          });
        }}>
        <View style={styles.chatContent}>
          {item.profileImage ? (
            <Image
              source={{uri: item.profileImage}}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <Icon
                name="user"
                size={responsiveFontSize(2.5)}
                color={Colors.white}
              />
            </View>
          )}
          <View style={styles.textContainer}>
            <MyText
              text={item.receiverName}
              fontSize={responsiveFontSize(1.9)}
              fontWeight="600"
              style={styles.chatName}
            />
            <MyText
              text={item.lastMessage}
              fontSize={responsiveFontSize(1.6)}
              style={styles.chatMessage}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <View style={styles.timeContainer}>
            <MyText
              text={new Date(item.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              fontSize={responsiveFontSize(1.4)}
              style={styles.chatTime}
            />
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <MyText
                  text={item.unreadCount}
                  fontSize={responsiveFontSize(1.4)}
                  style={styles.unreadText}
                />
              </View>
            )}
          </View>
        </View>
      </Pressable>
    ),
    [markChatAsRead, navigation],
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
              colors={['#0C54A3']}
              progressBackgroundColor={Colors.white}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MyText
                text="No chats yet"
                fontSize={responsiveFontSize(2)}
                style={styles.emptyText}
              />
            </View>
          }
        />
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderBottomWidth: 0,
    zIndex: 10,
  },
  chatItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: responsiveHeight(0.8),
    padding: responsiveHeight(1.5),
    elevation: responsiveWidth(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  chatItemPressed: {
    transform: [{scale: 0.98}],
    opacity: 0.9,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    marginRight: responsiveWidth(3),
    borderWidth: 1,
    borderColor: '#E6ECF5',
  },
  placeholderImage: {
    backgroundColor: '#0C54A3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    color: '#E6ECF5',
    marginBottom: responsiveHeight(0.3),
  },
  chatMessage: {
    color: '#B3C7E8',
    opacity: 0.8,
  },
  timeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  chatTime: {
    color: '#A1B8E0',
    opacity: 0.6,
  },
  unreadBadge: {
    backgroundColor: '#4A83D8',
    borderRadius: 12,
    minWidth: responsiveWidth(5),
    height: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  unreadText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(20),
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.darkGray,
    opacity: 0.7,
  },
});

export default Messages;
