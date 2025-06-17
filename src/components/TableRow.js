import React from 'react';
import {View, StyleSheet} from 'react-native';
import CrudIcons from './CrudIcons';
import FoundTag from './FoundTag';
import MyText from './textcomponent';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';

const TableRow = ({title, detail, showTag}) => (
  <View style={styles.tableRow}>
    <View style={styles.tableColLarge}>
      <MyText text={title} textStyle={styles.tableText} />
    </View>
    <View style={styles.tableColSmall}>
      {showTag ? (
        <FoundTag />
      ) : (
        <MyText text={detail} textStyle={styles.tableText} />
      )}
    </View>
    <View style={styles.tableColIcon}>
      <CrudIcons />
    </View>
  </View>
);

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  tableColLarge: {
    flex: 2,
  },
  tableColSmall: {
    flex: 1,
  },
  tableColIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tableText: {
    fontSize: responsiveFontSize(1.6),
    color: Colors.black,
  },
});

export default TableRow;
