import {StyleSheet, View} from 'react-native';
import MyText from './textcomponent';
import TableRow from './TableRow';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';

const ManageItems = () => (
  <View style={styles.fullWidthContainer}>
    <MyText
      fontWeight={'bold'}
      text="Manage Items"
      textStyle={styles.heading}
    />
    <MyText
      text="View and control all lost & found items"
      textStyle={styles.subheading}
    />
    <View style={styles.tableHeader}>
      <MyText
        fontWeight={'bold'}
        text="Item"
        textStyle={[styles.tableText, styles.tableColLarge]}
      />
      <MyText
        fontWeight={'bold'}
        text="Reported"
        textStyle={[styles.tableText, styles.tableColSmall]}
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
    <TableRow title="Lost Wallet" detail="3 days ago" />
    <TableRow title="Found Umbrella" detail="1 day ago" />
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

export default ManageItems;
