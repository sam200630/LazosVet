// components/CameraModal.tsx

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";

// Iconos de tu carpeta assets
import goBackIcon from "../assets/images/goBack.png";

interface CameraModalProps {
  isVisible: boolean;
  setImage: (image: any) => void;
  closeModal: () => void;
}

export function CameraModal(props: CameraModalProps) {
  const { isVisible, setImage, closeModal } = props;
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const flip = () => {
    setFacing((f) => (f === "back" ? "front" : "back"));
  };

  const take = async () => {
    const result = await cameraRef.current?.takePictureAsync({
      quality: 1,
      base64: true,
    });
    if (result?.uri) {
      setImage(result);
      closeModal();
    }
  };

  const open = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length) {
      setImage(result.assets[0]);
      closeModal();
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Necesitamos permiso para usar la cámara
        </Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={requestPermission}
        >
          <Text style={styles.actionText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal visible={isVisible} transparent={false} animationType="slide">
      <View style={styles.fullscreen}>
        {/* Botón volver */}
        <TouchableOpacity style={styles.backBtn} onPress={closeModal}>
          <Image source={goBackIcon} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Vista de cámara */}
        <CameraView
          style={styles.fullscreen}
          facing={facing}
          ref={cameraRef}
        />

        {/* Controles inferiores */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn} onPress={take}>
            <Text style={styles.controlText}>Tomar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={open}>
            <Text style={styles.controlText}>Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={flip}>
            <Text style={styles.controlText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: "#000",
  },
  backBtn: {
    position: "absolute",
    top: Platform.OS === "android" ? 25 : 10,
    left: 16,
    zIndex: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFF",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  permissionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#101419",
    marginBottom: 12,
    textAlign: "center",
  },
  actionButton: {
    backgroundColor: "#30C5FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  actionText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
  },
  controls: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  controlBtn: {
    backgroundColor: "#30C5FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  controlText: {
    color: "#FFF",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});
