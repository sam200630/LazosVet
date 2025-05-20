import { StyleSheet, Platform, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
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

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: height * 0.08,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
  },
  editPhotoButton: {
    backgroundColor: '#30C5FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  editPhotoText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
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

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: '#F2E8E2',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },

  /* Nuevos estilos de inline-edit */
  editIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
    borderBottomWidth: 1,
    borderColor: '#A15E49',
    paddingVertical: 2,
  },
  saveText: {
    color: '#30C5FF',
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
  cancelText: {
    color: '#FF3B30',
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },

  petsCard: {
    backgroundColor: '#F2E8E2',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  petRowIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  petName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },
  addPetButton: {
    height: 48,
    backgroundColor: '#30C5FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  addPetText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },

  logoutButton: {
    height: 48,
    backgroundColor: '#FF3B30',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },

  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FFF',
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabIcon: { width: 24, height: 24 },
  tabLabel: {
    marginTop: 4,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
  },
});
