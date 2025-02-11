from __future__ import annotations

from injector import inject


class TextToSpeech:
    @inject
    def __init__(self):
        pass

    def run(self, text: str) -> str:
        return f"TTS: Synthesized '{text}'"
