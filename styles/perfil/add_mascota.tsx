import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const TAB_BAR_HEIGHT = 60;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  goBack: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 25 : 0,
    left: 16,
    zIndex: 2,
  },
  goBackIcon: { width: 24, height: 24 },

  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
    textAlign: 'center',
    marginTop: height * 0.08,
  },

  profilePicContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#30C5FF',
    backgroundColor: '#F2F2F2',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: -8,
    right: (width - 120) / 2 - 16,
    backgroundColor: '#30C5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addPhotoText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },

  form: {
    paddingHorizontal: 16,
  },

  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
    marginBottom: 4,
  },

  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    color: '#101419',
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
  },
  extraInput: {
    height: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    color: '#101419',
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
  },

  // Selector custom
  selectorWrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  selectorContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },
  selectorPlaceholder: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999',
  },
  expanderIcon: {
    width: 16,
    height: 16,
    tintColor: '#101419',
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginTop: 4,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  // Edad
  ageRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ageLeftInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 0,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    color: '#101419',
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    width: 1,
    backgroundColor: '#DDD',
    height: 44,
  },
  unitWrapper: {
    flex: 1,
  },
  unitContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    borderLeftWidth: 0,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
  },
  unitText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },
  unitDropdown: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    zIndex: 10,
  },
  unitOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  unitOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },

  button: {
    height: 48,
    backgroundColor: '#30C5FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    marginHorizontal: 16,
  },
  buttonDisabled: {
    backgroundColor: '#A0D9FF',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
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
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },
});
