import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const horizontalPadding = 16;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  loadingText: {
    marginTop: 50,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#101419',
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

  content: {
    paddingHorizontal: horizontalPadding,
    paddingTop: 60,
    paddingBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pawIcon: {
    width: 32,
    height: 32,
    tintColor: '#A15E49',
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',   // igual que petName
    color: '#A15E49',                // mismo color que petName
  },
  petName: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
    textAlign: 'center',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
    marginTop: 24,
  },

  fieldBox: {
    width: width - horizontalPadding * 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A15E49',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  fieldText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#30C5FF',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  confirmText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  cancelText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
});
