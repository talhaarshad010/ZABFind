import {StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';
import MyText from './textcomponent';
import TableRow from './TableRow';

const FoundItems = () => (
  <View style={styles.fullWidthContainer}>
    <MyText fontWeight={'bold'} text="Found Items" textStyle={styles.heading} />
    <MyText text="All items marked as found" textStyle={styles.subheading} />
    <View style={styles.tableHeader}>
      <MyText
        fontWeight={'bold'}
        text="Item"
        textStyle={[styles.tableText, styles.tableColLarge]}
      />
      <MyText
        fontWeight={'bold'}
        text="Status"
        textStyle={[
          styles.tableText,
          styles.tableColSmall,
          {textAlign: 'center'},
        ]}
      />
      <MyText
        fontWeight={'bold'}
        text="Actions"
        textStyle={[
          styles.tableText,
          styles.tableColIcon,
          {textAlign: 'center'},
        ]}
      />
    </View>
    <TableRow title="Found Phone" detail="" showTag />
    <TableRow title="Found Bag" detail="" showTag />
  </View>
);

const styles = StyleSheet.create({
  heading: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: responsiveHeight(1),
    textAlign: 'center',
  },
  subheading: {
    fontSize: responsiveFontSize(1.8),
    color: 'gray',
    marginBottom: responsiveHeight(3),
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  tableColLarge: {
    flex: 2,
    fontWeight: 'bold',
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

export default FoundItems;
