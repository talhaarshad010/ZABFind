import {View} from 'react-native';
import MyText from './textcomponent';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const FoundTag = () => (
  <View
    style={{
      backgroundColor: '#D9FDD3',
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 2,
    }}>
    <MyText
      text="Found"
      textStyle={{
        color: '#34C759',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center',
      }}
    />
  </View>
);
export default FoundTag;
