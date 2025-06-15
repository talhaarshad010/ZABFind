import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const TextInputDropdown = ({
  defaultValue,
  data = [],
  onSelect,
  isOpen,
  onToggle,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = item => {
    setSelectedValue(item);
    onSelect?.(item);
    onToggle?.(); // close dropdown
  };

  const ITEM_HEIGHT = responsiveHeight(5.5);
  const MAX_VISIBLE_ITEMS = 5;
  const dropdownHeight = Math.min(
    data.length * ITEM_HEIGHT,
    ITEM_HEIGHT * MAX_VISIBLE_ITEMS,
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.8}
        style={styles.inputContainer}>
        <Text style={styles.inputText}>{selectedValue || 'Select'}</Text>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={responsiveFontSize(2.5)}
          color="#888"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.dropdown, {maxHeight: dropdownHeight}]}>
          <FlatList
            data={data}
            scrollEnabled={data.length > MAX_VISIBLE_ITEMS}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default TextInputDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: responsiveFontSize(2),
    color: '#000',
    flex: 1,
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(2),
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  option: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: responsiveFontSize(2),
    color: '#333',
  },
});
