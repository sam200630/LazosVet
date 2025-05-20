// styles/login.ts

import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const SMALL_FACTOR = isWeb ? 0.4 : 0.5;
const LARGE_FACTOR = isWeb ? 0.4 : 0.7;
const CROP_FACTOR   = 0.3;

const SMALL_SIZE   = height * SMALL_FACTOR;
const SMALL_OFFSET = SMALL_SIZE * CROP_FACTOR;
const LARGE_SIZE   = width * LARGE_FACTOR;
const LARGE_OFFSET = LARGE_SIZE * CROP_FACTOR;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center',
    justifyContent: 'center',   // <--- siempre centrar verticalmente
  },

  huellasInicio: {
    position: 'absolute',
    width: SMALL_SIZE,
    height: SMALL_SIZE,
    top: -SMALL_OFFSET,
    left: -SMALL_OFFSET,
    opacity: 0.5,
  },

  huellaGrande: {
    position: 'absolute',
    width: LARGE_SIZE,
    height: LARGE_SIZE,
    bottom: -LARGE_OFFSET,
    right: -LARGE_OFFSET,
    opacity: 0.5,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },

  logo: {
    width: 40,
    height: 40,
  },

  title: {
    fontSize: 28,
    color: '#101419',
    fontFamily: 'Poppins-Bold',
    marginLeft: 8,
    textAlign: 'center',        // asegurar centrado de texto
  },

  subtitle: {
    fontSize: 18,
    color: '#101419',
    marginTop: 12,
    fontFamily: 'Poppins-ExtraLight',
    textAlign: 'center',        // centrar subtítulo
  },

  form: {
    marginTop: 24,
    alignSelf: 'center',        // centrar el formulario horizontalmente
  },

  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: '#101419',
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },

  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    color: '#101419',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },

  button: {
    height: 48,
    backgroundColor: '#30C5FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1E1E1E',
  },

  registerText: {
    marginTop: 16,
    fontSize: 12,
    color: '#101419',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },

  registerLink: {
    fontFamily: 'Poppins-Light',
    color: '#30C5FF',
  },
});
