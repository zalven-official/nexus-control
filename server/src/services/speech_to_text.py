from injector import inject

class SpeechToText:
    @inject
    def __init__(self):
      pass

    def recognize(self, audio: str) -> str:
        return f"STT: Recognized '{audio}'"
