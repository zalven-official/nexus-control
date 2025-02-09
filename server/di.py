from injector import Injector, Module, provider, singleton
from src.services.text_to_speech import TextToSpeech
from src.services.speech_to_text import SpeechToText

class TTSModule(Module):
    @singleton
    @provider
    def provide(self) -> TextToSpeech:
        return TextToSpeech()

class STTModule(Module):
    @singleton
    @provider
    def provide(self) -> SpeechToText:
        return SpeechToText()

# Create a DI container with both modules
injector = Injector([TTSModule(), STTModule()])