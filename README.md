# Expo Go에서 테스트 가능한 STT

## 실행을 위해 준비해야 할일
1. flask 폴더 만들고 가상화 진행하기
cmd에서 진행

2. 가상화 진행하기

3. 필요한 것들 다운받기

```shell
pip install flask
pip install faster-whisper flask
```

4. 서버 실행시키고 ip받아서 프론트와 연결하기
   로그 보면서 200으로 잘 되는지 확인

## 구성 흐름
앱: React Native + Expo Go -> 음성 녹음 (expo-av) -> 서버로 전송 (FormData) -> Flask 서버: Whisper small -> (음성 → 텍스트 변환) -> 결과를 프론트에서 안내(글자 혹은 TTS)
