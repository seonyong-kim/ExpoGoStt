# Expo Go에서 테스트 가능한 STT

## 실행을 위해 준비해야 할일
1. expo 폴더 만들기 다만, 위의 파일들을 이용하면 진행 안해도 된다.
cmd에서 진행

```shell
expo init 폴더이름 --template blank
```

2. 폴더 변경하기

```shell
cd 폴더이름
```

3. 필요한 것들 다운받기

```shell
npx expo install expo-av # 이거는 필수
npx expo install expo-speech # TTS까지 하고 싶으면 진행
```

4. 서버코드 준비되면 expo go로 테스트하기

## 구성 흐름
앱: React Native + Expo Go -> 음성 녹음 (expo-av) -> 서버로 전송 (FormData) -> Flask 서버: Whisper small -> (음성 → 텍스트 변환) -> 결과를 프론트에서 안내(글자 혹은 TTS)
