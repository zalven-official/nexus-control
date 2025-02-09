from injector import inject

class TextToSpeech:
    def synthesize(self, text: str) -> str:
        return f"TTS: Synthesized '{text}'"