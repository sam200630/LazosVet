import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center',           // centra horizontalmente
    justifyContent: 'center',       // 👈 centra todo verticalmente
    paddingHorizontal: 16,
  },

  goBack: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 25 : 10,
    left: 16,
    zIndex: 2,
  },
  goBackIcon: {
    width: 24,
    height: 24,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
    textAlign: 'center',
    marginBottom: 32,
  },

  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 64,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },

  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFF',
    fontFamily: 'Poppins-Regular',
    color: '#101419',
    marginBottom: 32,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  publishButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#30C5FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  publishText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  cancelButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#30C5FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#30C5FF',
  },

  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
