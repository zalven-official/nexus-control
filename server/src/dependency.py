from __future__ import annotations

from injector import Injector
from injector import Module
from injector import provider
from injector import singleton
from src.services.speech_to_text import SpeechToText
from src.services.text_chat_completion import TextChatCompletion
from src.services.text_to_speech import TextToSpeech
from src.services.vision_chat_completion import VisionChatCompletion


class ServiceModule(Module):
    @singleton
    @provider
    def text_to_speech(self) -> TextToSpeech:
        return TextToSpeech()

    @singleton
    @provider
    def speech_to_text(self) -> SpeechToText:
        return SpeechToText()

    @singleton
    @provider
    def text_chat_completion(self, stt: SpeechToText) -> TextChatCompletion:
        return TextChatCompletion(stt)

    @singleton
    @provider
    def vision_chat_completion(self) -> VisionChatCompletion:
        return VisionChatCompletion()


class ServiceContainer:
    def __init__(self):
        self.injector = Injector([ServiceModule()])

        self.text_to_speech: TextToSpeech = self.injector.get(
            TextToSpeech,
        )
        self.speech_to_text: SpeechToText = self.injector.get(
            SpeechToText,
        )
        self.text_chat_completion: TextChatCompletion = self.injector.get(
            TextChatCompletion,
        )
        self.vision_chat_completion: VisionChatCompletion = self.injector.get(
            VisionChatCompletion,
        )


service_container = ServiceContainer()
