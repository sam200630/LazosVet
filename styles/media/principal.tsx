import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#101419',
  },

  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
    overflow: 'hidden',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  tabButtonActive: {
    backgroundColor: '#30C5FF',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },

  feed: {
    paddingHorizontal: 12,
    paddingBottom: TAB_BAR_HEIGHT + 12,
  },
  post: {
    marginBottom: 24,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DDD',
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },

  postImagePlaceholder: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },

  overlay: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    width: 80,
    height: 80,
    opacity: 0.8,
  },

  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  description: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
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
