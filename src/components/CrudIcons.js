import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../styles/Colors';
const CrudIcons = () => (
  <View style={styles.crudIcons}>
    <TouchableOpacity>
      <MaterialIcons name="edit" size={20} color={Colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity>
      <MaterialIcons name="delete" size={20} color="red" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  crudIcons: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default CrudIcons;
