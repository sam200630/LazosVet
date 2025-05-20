import { StyleSheet, Platform, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const SMALL_FACTOR = isWeb ? 0.2 : 0.5;
const CROP_FACTOR   = 0.3;
const SMALL_SIZE   = height * SMALL_FACTOR;
const SMALL_OFFSET = SMALL_SIZE * CROP_FACTOR;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },

  logo: {
    position: 'absolute',
    width: SMALL_SIZE,
    height: SMALL_SIZE,
    top: -SMALL_OFFSET,
    right: -SMALL_OFFSET,
    opacity: 0.5,
    resizeMode: 'contain',
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

  // SECCIÓN 1: TÍTULO + FOTO
  headerSection: {
    alignItems: 'center',
    marginTop: SMALL_SIZE * 0.2,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: '#A15E49',
    marginBottom: 12,
  },
  imageWrapper: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#A15E49',
  },
  petImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  noImagePlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F2F2F2',
  },

  // SECCIÓN 2: DATOS (ScrollView)
  dataContainer: {
    flex: 1,
    backgroundColor: '#8AD8FF',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  dataContent: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },

  // FILA CAMPO
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // reparte espacio
    marginBottom: 10,                // más separación debajo
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
    marginLeft: 20,                // espacio extra a la derecha
  },
  value: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#101419',          // espacio antes del icono
  },
  editIcon: {
    width: 18,
    height: 18,
    marginRight: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
    borderBottomWidth: 1,
    borderColor: '#A15E49',
    paddingVertical: 2,
    marginRight: 12,
  },

  // BOTONES GUARDAR/CANCELAR
  editRow: {
    flexDirection: 'row',
    marginBottom: 12,
    marginLeft: 16,
  },
  saveText: {
    color: '#30C5FF',
    fontFamily: 'Poppins-Medium',
    marginRight: 16,
  },
  cancelText: {
    color: '#FF3B30',
    fontFamily: 'Poppins-Medium',
  },

  sectionSeparator: {
    marginTop: 16,
    marginBottom: 8,
  },

  // CONDICIONES
  conditionsBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  conditionsText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  // CITAS
  appointmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
  },
  appointmentIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#101419',
  },
  appointmentDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },

  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
