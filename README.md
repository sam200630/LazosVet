# 🐾 LazosVet

**LazosVet** es una aplicación móvil multiplataforma desarrollada con **React Native + Expo Router** para brindar a los dueños de mascotas una solución integral para el cuidado veterinario. La app permite gestionar mascotas, agendar y confirmar citas, recibir recordatorios, interactuar con un chatbot inteligente y compartir experiencias en una red social interna. Incluye además un panel exclusivo para administradores con funciones avanzadas como escaneo de QR para validación de citas.

---

## 🚀 Características Principales

### 👥 Usuarios (clientes)
- **Autenticación con Firebase**: Registro e inicio de sesión con validaciones.
- **Gestión de Mascotas**: Añadir, editar y visualizar datos y fotos de las mascotas.
- **Agenda de Citas**:
  - Tipos de cita: Baño, Consulta, Control.
  - Selección de fecha con calendario y horarios disponibles sin conflictos.
  - Generación automática de código QR para validación posterior.
- **Próximas Citas**:
  - Visualización de la cita más cercana y acceso a QR y detalles.
  - Opción para expandir y ver todas las futuras citas.
- **Chatbot (PetBot)**:
  - Integración con Gemini API para respuestas inteligentes sobre cuidado animal.
- **Sección Social (Media)**:
  - Compartir imágenes y descripciones.
  - Feed ordenado por fecha con usuario y foto.
- **Perfil**:
  - Visualizar información personal y mascotas registradas.
- **Notificaciones Locales**:
  - Recordatorios automáticos 24h antes de cada cita.

### 🛡️ Administradores
- **Login diferenciado (`@admin`)**.
- **Panel exclusivo de navegación**.
- **Escáner QR**:
  - Verifica citas agendadas escaneando el código generado por el usuario.
  - Redirección automática a pantalla de detalles.
- **Control de publicaciones y citas desde Home admin**.
- **Navegación y pantallas totalmente separadas de usuarios normales**.

---

## 🗂 Estructura del Proyecto

```
app/
├── admin/             → Rutas exclusivas para administrador
├── user/              → Rutas del usuario normal
├── screensShared/     → Pantallas compartidas (media, perfil, mascota)
├── components/        → Reutilizables: BottomTabs, CameraModal, etc.
├── context/           → Proveedores de estado global
├── services/          → API externas, notificaciones, Gemini
├── interfaces/        → Tipado TS para respuestas, mensajes, etc.
├── utils/             → FirebaseConfig, traducciones de razas
├── route.ts           → Todas las rutas centralizadas
└── _layout.tsx        → Layout raíz con providers y fuentes
```

---

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/lazosvet.git
cd lazosvet
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` o usa `Constants.expoConfig.extra` para definir:

```
GEMINI_API_KEY=TU_CLAVE_SECRETA
```

### 4. Iniciar el proyecto con Expo

```bash
npx expo start
```

> Requiere Android/iOS Emulator o Expo Go en físico.

---

## 📡 APIs Externas Integradas

| API                            | Descripción                                                          |
|-------------------------------|----------------------------------------------------------------------|
| [Dog CEO API](https://dog.ceo/)        | Lista completa de razas de perros para el formulario de mascotas. |
| [TheCatAPI](https://thecatapi.com/)    | Lista completa de razas de gatos.                                  |
| [Gemini API (Google AI)]               | Respuestas inteligentes del chatbot PetBot.                        |
| `expo-notifications`                  | Recordatorios locales para citas.                                  |

---

## 🔐 Autenticación y Roles

La app utiliza **Firebase Auth**. El rol del usuario se determina automáticamente:

- Cuentas con `@admin` en el correo → acceso como **administrador**.
- Cualquier otro correo → acceso como **usuario normal**.

---

## 📦 Dependencias Clave

- `expo-router`
- `firebase`
- `expo-camera`, `expo-image-picker`
- `expo-notifications`
- `react-native-qrcode-svg`
- `react-native-calendars`
- `@react-native-async-storage/async-storage`

---

## ✅ Funcionalidades Evaluadas

| Criterio                         | Estado     |
|----------------------------------|------------|
| Autenticación con Firebase       | ✅ Completa |
| Navegación separada por rol      | ✅ Completa |
| Chatbot PetBot (Gemini API)      | ✅ Completo |
| Escáner QR para citas            | ✅ Completo |
| Manejo offline parcial           | 🔄 Implementado parcialmente con Context y Cache |
| Uso de APIs externas             | ✅ Completo |
| Recordatorios/Notificaciones     | ✅ Completo |
| Código modular, mantenible       | ✅ Cumplido |
| Documentación de uso             | ✅ Incluida |

---

## 📱 Capturas (opcional)

<p float="left">
  <img src="./assets/screenshots/login.png" width="200" />
  <img src="./assets/screenshots/add_pet.png" width="200" />
  <img src="./assets/screenshots/qr.png" width="200" />
  <img src="./assets/screenshots/petbot.png" width="200" />
</p>

---

## 👨‍💻 Autor

- **Andrea Julieth  Sosa Rodriguez y Samuel Andres Rodriguez Ulloa**  
  Estudiante de Ingeniería de Sistemas  
  Proyecto académico de desarrollo móvil (2025)

---


---
