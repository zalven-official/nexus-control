from __future__ import annotations

import logging
import time

from injector import Injector
from injector import Module
from injector import provider
from injector import singleton
from src.services.speech_to_text import SpeechToText
from src.services.text_chat_completion import TextChatCompletion
from src.services.text_to_speech import TextToSpeech
from src.services.vision_chat_completion import VisionChatCompletion

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler('app.log'), logging.StreamHandler()],
)

class ServiceModule(Module):
    @singleton
    @provider
    def provide_tts(self) -> TextToSpeech:
        return TextToSpeech()

    @singleton
    @provider
    def provide_stt(self) -> SpeechToText:
        return SpeechToText()

    @singleton
    @provider
    def provide_text_chat(self, stt: SpeechToText) -> TextChatCompletion:
        return TextChatCompletion(stt)

    @singleton
    @provider
    def provide_vision_chat(self) -> VisionChatCompletion:
        return VisionChatCompletion()


class ServiceContainer:
    _instance = None

    def set_services(self):
        self._services = {
            'tts': self._injector.get(TextToSpeech),
            'stt': self._injector.get(SpeechToText),
            'chat': self._injector.get(TextChatCompletion),
            'vision': self._injector.get(VisionChatCompletion),
        }

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._injector = Injector([ServiceModule()])
            cls._instance._services = None
        return cls._instance

    def get_services(self):
        if self._services is None:
            logging.info('Initializing services...')
            start_time = time.time()
            try:
                self.set_services()
                elapsed = f"{time.time() - start_time:.2f}"
                logging.info(
                    f"All services initialized successfully in {
                        elapsed
                    } seconds.",
                )
            except Exception as e:
                logging.error(
                    f"Service initialization failed: {e}",
                    exc_info=True,
                )
                self._services = {}
        return self._services


service_container = ServiceContainer()
