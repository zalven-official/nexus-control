import eel
import logging
from src.dependency import service_container

# Initialize Eel
eel.init("web")

@eel.expose
def synthesize(text: str):
    services = service_container.get_services()
    return services["tts"].synthesize(text)

@eel.expose
def recognize(audio: str):
    services = service_container.get_services()
    return services["stt"].recognize(audio)

@eel.expose
def chat_complete(prompt: str):
    services = service_container.get_services()
    return services["chat"].complete(prompt)

@eel.expose
def vision_complete(image_data: str):
    services = service_container.get_services()
    return services["vision"].analyze(image_data)

@eel.expose
def ping():
    return "pong"

if __name__ == "__main__":
    service_container.get_services()  # Ensure services are initialized once
    logging.info("Starting Eel app...")
    eel.start("index.html",app_mode=False, size=(800, 600))
