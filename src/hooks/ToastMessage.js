import Toast from 'react-native-toast-message';

const ToastMessage = () => {
  const Toasts = (text1, text2, type, visibilityTime) => {
    Toast.show({
      autoHide: true,
      text1: text1,
      text2: text2,
      type: type,
      visibilityTime: visibilityTime,
      swipeable: true,
    });
  };

  return {Toasts};
};

export default ToastMessage;
