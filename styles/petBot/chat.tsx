import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },

  // Header
  header: {
    alignItems: 'center',
    marginTop: isWeb ? 16 : 32,
    marginBottom: 16,
  },
  headerIcon: {
    width: 40,
    height: 40,
    tintColor: '#A15E49',
  },
  headerTitle: {
    marginTop: 8,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
  },

  // Mensajes (flexible)
  messagesContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Poppins-Regular',
    marginTop: 32,
  },
  bubble: {
    backgroundColor: '#F2E8E2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  bubbleText: {
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  // Input fijo encima del tabBar
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#A15E49',
    borderRadius: 24,
    marginBottom: 8,
  },
  iconButton: {
    padding: 4,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#A15E49',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 8,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
    height: '100%',
  },

  // Bottom Tabs
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
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
