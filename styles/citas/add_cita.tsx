import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const PAW_SIZE   = width * 0.7;
const PAW_OFFSET = PAW_SIZE * 0.5;
const TAB_BAR_HEIGHT = 60;

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
  goBackIcon: {
    width: 24,
    height: 24,
  },

  paw: {
    position: 'absolute',
    width: PAW_SIZE,
    height: PAW_SIZE,
    top: -PAW_OFFSET,
    right: -PAW_OFFSET,
    opacity: 0.5,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
    textAlign: 'center',
    marginTop: height * 0.08,
  },

  form: {
    flexGrow: 1,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: TAB_BAR_HEIGHT + 24,
  },

  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
    marginBottom: 4,
  },

  // inputs estándar
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
  },

  // Row para Fecha y Hora
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },

  // Selector custom
  selectorWrapper: {
    marginBottom: 16,
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

  // Botón
  button: {
    height: 48,
    backgroundColor: '#30C5FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#A0D9FF',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
  },

  // Barra de pestañas inferior
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
