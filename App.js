import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech'; 

export default function App() {
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState('');

  const startRecording = async () => {
    try {
      console.log('🎙️ 녹음 권한 요청...');
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert('마이크 권한이 필요합니다.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('🔴 녹음 시작');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('녹음 시작 실패:', err);
    }
  };

  const stopRecording = async () => {
    try {
      console.log('⏹️ 녹음 중지');
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      console.log('📤 서버로 전송 중...', uri);

      const formData = new FormData();
      formData.append('audio', {
        uri,
        name: 'audio.wav',
        type: 'audio/wav',
      });

      const response = await fetch('본인 IP/whisper', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log('결과:', data);
      setTranscript(data.text || '인식 실패');
      Speech.speak(data.text, {
        language: 'ko',  // 한글 설정
      });

    } catch (err) {
      console.error('서버 전송 실패:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={recording ? '⏹️ 녹음 중지' : '🎙️ 녹음 시작'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text style={{ marginTop: 30, fontSize: 16 }}>
        📄 인식 결과: {transcript}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
});
