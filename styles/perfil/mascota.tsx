// styles/perfil/mascota.ts

import { StyleSheet, Platform, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const SMALL = height * (Platform.OS==='web'?0.2:0.5);
const OFFSET = SMALL * 0.3;

export default StyleSheet.create({
  container:{ flex:1, backgroundColor:'#FFF', paddingTop:Platform.OS==='android'?25:0 },
  logo:{ position:'absolute', width:SMALL, height:SMALL, top:-OFFSET, right:-OFFSET, opacity:0.3 },
  goBack:{ position:'absolute', top:Platform.OS==='android'?25:10, left:16, zIndex:2 },
  goBackIcon:{ width:24, height:24 },

  headerSection:{
    alignItems:'center',
    marginTop: SMALL*0.15,
    marginBottom:16,
  },
  title:{
    fontSize:26,
    fontFamily:'Poppins-SemiBold',
    color:'#A15E49',
    marginBottom:8,
  },
  imageWrapper:{ width:160, height:160, borderRadius:80, overflow:'hidden', marginBottom:4 },
  imageBackground:{ ...StyleSheet.absoluteFillObject, backgroundColor:'#A15E49' },
  petImage:{ flex:1, borderRadius:80 },
  noImage:{ flex:1, backgroundColor:'#EEE', borderRadius:80 },

  dataContainer:{
    flex:1,
    backgroundColor:'#F0F9FF',
    borderTopLeftRadius:80,
    borderTopRightRadius:80,
  },
  dataContent:{ padding:24, paddingBottom:40 },

  fieldRow:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:14,
  },
  label:{ flex:1, fontSize:14, fontFamily:'Poppins-Medium', color:'#333' },
  value:{ flex:1, fontSize:14, fontFamily:'Poppins-Regular', color:'#333' },
  editIcon:{ width:18, height:18, tintColor:'#A15E49' },
  textInput:{
    flex:1, borderBottomWidth:1, borderColor:'#A15E49',
    fontSize:14, paddingVertical:2, fontFamily:'Poppins-Regular', color:'#333'
  },

  editRow:{ flexDirection:'row', marginBottom:12, justifyContent:'flex-end' },
  saveText:{ marginRight:16, color:'#30C5FF', fontFamily:'Poppins-Medium' },
  cancelText:{ color:'#FF3B30', fontFamily:'Poppins-Medium' },

  sectionSeparator:{ marginTop:24, marginBottom:8 },
  conditionsBox:{
    backgroundColor:'#FFF', borderRadius:12, padding:12, marginBottom:16,
  },
  conditionsText:{ fontSize:13, fontFamily:'Poppins-Regular', color:'#555' },

  appointmentBox:{
    flexDirection:'row', alignItems:'center',
    backgroundColor:'#FFF', borderRadius:12, padding:12,
  },
  appointmentIcon:{ width:24, height:24, marginRight:12 },
  appointmentInfo:{ flex:1 },
  appointmentTitle:{ fontSize:14, fontFamily:'Poppins-Medium', color:'#333' },
  appointmentDate:{ fontSize:12, fontFamily:'Poppins-Regular', color:'#555' },

  errorText:{ textAlign:'center', color:'red', marginTop:20, fontFamily:'Poppins-Medium' },

  loading:{ flex:1, justifyContent:'center', alignItems:'center' },
});
