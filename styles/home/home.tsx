import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#101419',
  },

  icon: {
    width: 24,
    height: 24,
  },

  // Carrusel manual
  bannerContainer: {
    alignSelf: 'center',
    marginHorizontal: 16,
    position: 'relative',
  },
  bannerPlaceholder: {
    height: 160,
    borderRadius: 12,
  },
  navButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
  },
  navLeft: {
    left: 0,
  },
  navRight: {
    right: 0,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#101419',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },

  petsList: {
    paddingLeft: 16,
  },

  petCard: {
    width: 80,
    marginRight: 16,
    alignItems: 'center',
  },

  petPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 4,
  },

  petName: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#101419',
  },

  petType: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A15E49',
  },

  card: {
    backgroundColor: '#F2E8E2',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  cardIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#101419',
  },

  cardDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
    marginBottom: 12,
  },

  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardButton: {
    flex: 1,
    backgroundColor: '#30C5FF',
    borderRadius: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },

  cardButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FFF',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
  },

  tabIcon: {
    width: 24,
    height: 24,
  },

  tabLabel: {
    marginTop: 4,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },
});
