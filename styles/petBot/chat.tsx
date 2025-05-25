// styles/petBot/chat.ts

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

  // Mensajes
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

  // Fila de bubble
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  bubbleUserRow: {
    justifyContent: 'flex-start',
  },
  bubbleBotRow: {
    justifyContent: 'flex-end',
  },

  // Avatar user
  userAvatar: {
    width: 32,
    height: 32,
    marginRight: 8,
  },

  // Bubble general
  bubble: {
    maxWidth: width * 0.75,
    borderRadius: 12,
    padding: 12,
  },
  bubbleContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bubbleMeta: {
    marginTop: 4,
    fontSize: 10,
  },

  // Usuario
  bubbleUser: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#A15E49',
  },
  bubbleMetaUser: {
    color: '#A15E49',
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
  },

  // Bot
  bubbleBot: {
    backgroundColor: '#8AD8FF',
  },
  bubbleMetaBot: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderWidth: 1,
    borderColor: '#A15E49',
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 48,
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
    fontFamily: 'Poppins-Regular',
    color: '#101419',
    height: '100%',
  },

  // TabBar
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
    tintColor: '#A15E49',
  },
});
