import eel
import time
import logging
from src.dependency import injector
from src.services.text_to_speech import TextToSpeech
from src.services.speech_to_text import SpeechToText
from src.services.text_chat_completion import TextChatCompletion
from src.services.vision_chat_completion import VisionChatCompletion

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("app.log"), logging.StreamHandler()]
)

# Initialize Eel
eel.init("web")

# Service container
services = {}

def initialize_services():
    logging.info("Initializing services...")
    start_time = time.time()
    try:
        global services
        services = {
            "tts": injector.get(TextToSpeech),
            "stt": injector.get(SpeechToText),
            "chat": injector.get(TextChatCompletion),
            "vision": injector.get(VisionChatCompletion)
        }
        logging.info(f"All services initialized successfully in {time.time() - start_time:.2f} seconds.")
    except Exception as e:
        logging.error(f"Service initialization failed: {e}", exc_info=True)

@eel.expose
def synthesize(text: str):
    logging.info(f"Processing TTS request: {text}")
    return services["tts"].synthesize(text)

@eel.expose
def recognize(audio: str):
    logging.info("Processing STT request")
    return services["stt"].recognize(audio)

@eel.expose
def chat_complete(prompt: str):
    logging.info(f"Processing Chat request: {prompt}")
    return services["chat"].complete(prompt)

@eel.expose
def vision_complete(image_data: str):
    logging.info("Processing Vision request")
    return services["vision"].analyze(image_data)

@eel.expose
def ping():
    logging.info("Ping received")
    return "pong"

if __name__ == "__main__":
    initialize_services()
    logging.info("Starting Eel app...")
    eel.start("index.html", size=(800, 600))