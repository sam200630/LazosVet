import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const TAB_BAR_HEIGHT = 60;
const PAW_SIZE = width * 0.7;
const PAW_OFFSET = PAW_SIZE * 0.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
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
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#A15E49',
    textAlign: 'center',
    marginTop: height * 0.08,
    marginBottom: 16,
  },

  // Foto
  profilePicContainer: {
    alignItems: 'center',
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
    right: (width - 120)/2 - 16,
    backgroundColor: '#30C5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addPhotoText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFF',
  },

  form: {
    paddingHorizontal: 16,
    paddingBottom: 24,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    color: '#101419',
    marginBottom: 16,
  },

  // Selector de género
  selectorWrapper: {
    marginBottom: 16,
    position: 'relative',
  },
  selectorContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
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

  // Edad con unidades
  ageRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ageLeftInput: {
    flex: 1,
    height: 44,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
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

  // Botón
  button: {
    height: 48,
    backgroundColor: '#30C5FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  buttonDisabled: {
    backgroundColor: '#A0D9FF',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
  },

  // Error
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },

  // Tab bar
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
});
