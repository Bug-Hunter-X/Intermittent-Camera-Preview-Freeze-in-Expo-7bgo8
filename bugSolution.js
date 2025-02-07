// bugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraError = (error) => {
    setCameraError(error);
    console.error('Camera error:', error);
    // Consider implementing retry mechanism or fallback UI here
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
        onCameraReady={() => console.log('Camera ready!')}
        onError={handleCameraError}
      >
        {/* UI elements here */}
      </Camera>
      <Button title="Switch Camera" onPress={() => {
          setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          );
          if(cameraRef) {
            cameraRef.resumePreview(); //Resume Preview
          }
        }} />
    </View>
  );
};

export default App;