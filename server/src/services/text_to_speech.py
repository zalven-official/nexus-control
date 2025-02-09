from injector import inject

class TextToSpeech:
    @inject
    def __init__(self):
        pass  

    def synthesize(self, text: str) -> str:
        return f"TTS: Synthesized '{text}'"