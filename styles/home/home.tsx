import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
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

  // Carrusel
  bannerContainer: {
    alignSelf: 'center',
    marginHorizontal: 16,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: undefined,      // altura automática
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

  // Indicadores del carrusel
  dots: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 12,
    height: 12,
    backgroundColor: '#A15E49',
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },
  addPetCard: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#30C5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addPetIcon: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF',
  },

  // Tarjeta de cita
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
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  cardDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 10,
    fontFamily: 'Poppins-Light',
    color: '#101419',
  },

  detailButton: {
    borderWidth: 1,
    borderColor: '#101419',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  detailButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
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
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },

  // Tab bar
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
    color: '#A15E49',
  },
});
