from flask import Flask, request, jsonify
from faster_whisper import WhisperModel
import os

app = Flask(__name__)

# Whisper 모델 로딩 (처음엔 자동 다운로드됨)
model = WhisperModel("small")  # or "tiny", "base", "medium", "large-v3"

@app.route("/whisper", methods=["POST"])
def transcribe():
    try:
        audio = request.files["audio"]
        save_path = "./temp_audio.wav"
        audio.save(save_path)


        # Whisper로 음성 인식
        segments, info = model.transcribe(save_path,  language="ko")
        os.remove(save_path)

        # 인식된 텍스트 전체 합치기
        result_text = " ".join([seg.text for seg in segments])
        print(result_text)
        return jsonify({"text": result_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

