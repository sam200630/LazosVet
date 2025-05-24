import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
const BOX_SIZE = width * 0.8;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  // 1. Overlay que ocupa toda la pantalla para el BlurView
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  // 2. Centrar el contenido sobre el overlay
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 3. Caja azul que contendrá el QR
  box: {
    width: BOX_SIZE,
    backgroundColor: '#8AD8FF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },

  // 4. Placeholder blanco para el QR
  placeholderQR: {
    width: BOX_SIZE * 0.6,
    height: BOX_SIZE * 0.6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  placeholderText: {
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  // 5. Botón Cerrar con icono y texto
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonIcon: {
    width: 18,
    height: 18,
    tintColor: '#000000',
    marginRight: 8,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000000',
  },
});
