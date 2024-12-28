import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

   // useEffect for camera permissions
   useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

   // Complete takePicture function
   const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const tempPath = `${FileSystem.cacheDirectory}temp_mood.jpg`;
      
      await FileSystem.moveAsync({
        from: photo.uri,
        to: tempPath
      });
      
      // TODO: Process OCR here
      
      // Delete temp file after processing
      await FileSystem.deleteAsync(tempPath);
      setShowCamera(false);
    }
  };

  

  return (
    <View style={styles.container}>
      <StatusBar style="light" />





      
      {/* Main Mood Score Circle */}
      <LinearGradient
        colors={['#FFD700', '#4169E1']}
        style={styles.scoreCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.scoreText}>36%</Text>
        <Text style={styles.scoreLabel}>Previews Mood Score</Text>
      </LinearGradient>

      {/* Time Period Buttons */}
      <View style={styles.buttonContainer}>
        {['Last Month', 'Last Week', 'Yesterday'].map((period) => (
          <TouchableOpacity key={period}>
            <LinearGradient
              colors={['#FFD700', '#4169E1']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>{period}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
        
      {showCamera ? (
        <Camera 
        style={styles.camera} 
        ref={ref => setCameraRef(ref)}
        type="back"
         >
          <TouchableOpacity onPress={takePicture}>
            <LinearGradient
              colors={['#FFD700', '#4169E1']}
              style={styles.cameraCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.captureText}>Capture</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Camera>
      ) : (
        <TouchableOpacity onPress={() => setShowCamera(true)}>
          <LinearGradient
            colors={['#FFD700', '#4169E1']}
            style={styles.cameraCircle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.cameraText}>Take picture</Text>
          </LinearGradient>
        </TouchableOpacity>
  )}


        






      {/*Camera Button --- Older code
      <TouchableOpacity style={styles.cameraButton}>
        <LinearGradient
          colors={['#FFD700', '#4169E1']}
          style={styles.cameraCircle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.cameraText}>Take picture</Text>
        </LinearGradient>
      </TouchableOpacity>
      */}


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
  },
  scoreCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  scoreText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: 100,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 120,
  },
  cameraCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -290,
  },
  cameraText: {
    color: '#fff',
    fontSize: 12,
  },
  //Camera
  camera: {
    flex: 1,
    width: '100%',
    position: 'absolute',

  },
  captureText: {
    color: '#fff',
    fontSize: 18,
  },


});