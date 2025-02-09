from injector import inject
from .services.text_to_speech import TextToSpeech
from .services.speech_to_text import SpeechToText

class AppService:
    @inject
    def __init__(self, tts: TextToSpeech, stt: SpeechToText):
        self.tts = tts
        self.stt = stt

    def synthesize_text(self, text: str):
        return self.tts.synthesize(text)

    def recognize_audio(self, audio: str):
        return self.stt.recognize(audio)