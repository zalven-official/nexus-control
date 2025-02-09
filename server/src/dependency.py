from injector import Injector, Module, provider, singleton
from src.services.text_to_speech import TextToSpeech
from src.services.speech_to_text import SpeechToText
from src.services.text_chat_completion import TextChatCompletion
from src.services.vision_chat_completion import VisionChatCompletion

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
    def provide_text_chat(self) -> TextChatCompletion:
        return TextChatCompletion()

    @singleton
    @provider
    def provide_vision_chat(self) -> VisionChatCompletion:
        return VisionChatCompletion()

# Create Injector
injector = Injector([ServiceModule()])
