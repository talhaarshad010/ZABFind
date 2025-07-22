// --- AdminDashboard.js ---
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import WrapperContainer from '../components/WrapperContainer';
import MyHeader from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import StatBoxComponent from '../components/StatBoxComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MyText from '../components/textcomponent';
import ManageItems from '../components/ManageItems';
import FoundItems from '../components/FoundItems';
import ManageUsers from '../components/ManageUsers';
import {useNavigation} from '@react-navigation/native';

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigation = useNavigation();
  return (
    <WrapperContainer>
      <View>
        <MyHeader
          ScreenName={'Admin Dashboard'}
          style={{backgroundColor: Colors.white, elevation: 10}}
          leftView={
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                name="person-circle-outline"
                size={30}
                color={Colors.black}
              />
            </TouchableOpacity>
          }
          rightView={
            <View>
              <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
              />
            </View>
          }
        />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.tabBar}>
            {['overview', 'manageItems', 'foundItems', 'manageUsers'].map(
              tab => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabItem,
                    activeTab === tab && styles.activeTabItem,
                  ]}
                  onPress={() => setActiveTab(tab)}>
                  <MyText
                    text={
                      tab === 'overview'
                        ? 'Overview'
                        : tab === 'manageItems'
                        ? 'Items'
                        : tab === 'manageUsers'
                        ? 'Users'
                        : 'Found'
                    }
                    textStyle={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  />
                </TouchableOpacity>
              ),
            )}
          </View>

          {activeTab === 'overview' && (
            <>
              <MyText text="Admin Dashboard" textStyle={styles.heading} />
              <MyText
                text="Manage lost & found items, users, and system settings"
                textStyle={styles.subheading}
              />

              <View style={styles.columnStatsGrid}>
                <StatBoxComponent
                  title="Total Items"
                  count="3"
                  backgroundColor="#D0E8FF"
                  icon={
                    <MaterialIcons name="inventory" size={30} color="#007AFF" />
                  }
                />
                <StatBoxComponent
                  title="Active Users"
                  count="8"
                  backgroundColor="#FFF5CC"
                  icon={
                    <FontAwesome5 name="user-check" size={30} color="#FFD700" />
                  }
                />
                <StatBoxComponent
                  title="Found Items"
                  count="5"
                  backgroundColor="#D9FDD3"
                  icon={
                    <MaterialIcons
                      name="check-circle"
                      size={30}
                      color="#34C759"
                    />
                  }
                />
                <StatBoxComponent
                  title="Total Users"
                  count="12"
                  backgroundColor="#E8D9FF"
                  icon={<FontAwesome5 name="users" size={30} color="#A55EEA" />}
                />
              </View>
            </>
          )}

          {activeTab === 'manageItems' && <ManageItems />}
          {activeTab === 'foundItems' && <FoundItems />}
          {activeTab === 'manageUsers' && <ManageUsers />}
        </ScrollView>
      </View>
    </WrapperContainer>
  );
};

export default Admindashboard;

const styles = StyleSheet.create({
  logo: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  container: {
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(10),
  },
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: responsiveHeight(2),
  },
  columnStatsGrid: {
    flexDirection: 'column',
    gap: responsiveHeight(2),
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: responsiveHeight(2),
    padding: responsiveHeight(1),
    elevation: 4,
    justifyContent: 'space-around',
  },
  tabItem: {
    minWidth: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.2),
    marginVertical: responsiveHeight(0.5),
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  activeTabItem: {
    backgroundColor: '#e6f0ff',
  },
  tabText: {
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
    color: 'gray',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  tabContent: {
    paddingTop: responsiveHeight(2),
  },
  placeholder: {
    color: 'gray',
    fontSize: responsiveFontSize(1.6),
    paddingTop: responsiveHeight(1),
  },
  tableContainer: {
    marginTop: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: responsiveHeight(2),
    backgroundColor: '#fff',
  },
  fullWidthContainer: {
    marginTop: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: responsiveHeight(2),
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
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
  crudIcons: {
    flexDirection: 'row',
    gap: 10,
  },
});
