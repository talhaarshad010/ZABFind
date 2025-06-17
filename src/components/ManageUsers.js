import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';
import {StyleSheet, View} from 'react-native';
import MyText from './textcomponent';
import TableRow from './TableRow';

const ManageUsers = () => (
  <View style={styles.fullWidthContainer}>
    <MyText
      fontWeight={'bold'}
      text="Manage Users"
      textStyle={styles.heading}
    />
    <MyText
      text="All registered users in the system"
      textStyle={styles.subheading}
    />
    <View style={styles.tableHeader}>
      <MyText
        fontWeight={'bold'}
        text="Name"
        textStyle={[styles.tableText, styles.tableColLarge]}
      />
      <MyText
        fontWeight={'bold'}
        text="Role"
        textStyle={[styles.tableText, styles.tableColSmall]}
      />
      <MyText
        fontWeight={'bold'}
        text="Actions"
        textStyle={[styles.tableText, styles.tableColIcon]}
      />
    </View>
    <TableRow title="John Doe" detail="User" />
    <TableRow title="Jane Smith" detail="User" />
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

export default ManageUsers;
