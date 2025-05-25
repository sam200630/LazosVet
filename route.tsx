export const Routes = {
  // =====================
  // 🔐 Autenticación
  // =====================
  Login: '/login',
  Register: '/register',

  // =====================
  // 👤 Usuario normal
  // =====================
  Home: '/user/home/home',
  AddAppointment: '/user/citas/add_cita',
  QR: '/user/citas/qr',
  DetallesCita: '/user/citas/detalles',
  Petbot: '/user/petBot/chat',

  // =====================
  // 🛠️ Administrador
  // =====================
  AdminHome: '/admin/home',
  AdminAddCita: '/admin/add-cita',
  AdminScanner: '/admin/qr',

  // =====================
  // 🔁 Rutas compartidas
  // =====================
  Perfil: '/screensShared/perfil/perfil',
  AddMascota: '/screensShared/perfil/add_mascota',
  EditMascota: '/screensShared/perfil/edit_mascota',
  Mascota: '/screensShared/perfil/mascota',

  Media: '/screensShared/media/principal',
  AddMedia: '/screensShared/media/add',
};