from __future__ import annotations

from injector import inject
from src.services.speech_to_text import SpeechToText


class TextChatCompletion:
    @inject
    def __init__(self, stt: SpeechToText):
        self.stt = stt

    def run(self, message: str) -> str:
        return f"Chat: '{message}'"
