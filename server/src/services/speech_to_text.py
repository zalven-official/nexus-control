from __future__ import annotations

from injector import inject


class SpeechToText:
    @inject
    def __init__(self):
        pass

    def run(self, audio: str) -> str:
        return f"STT: Recognized'{audio}'"
