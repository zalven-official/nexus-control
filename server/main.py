import eel
import logging
from src.dependency import service_container
import argparse
import os

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

def main():
  

    resource_path = os.path.join(os.path.dirname(__file__), 'web')
    eel.init(resource_path)

    logging.basicConfig(level=logging.INFO)
    logging.info("Starting Eel app...")
    logging.info(f"Web resource: {resource_path}")

    eel.start("index.html", size=(800, 600))

if __name__ == "__main__":
    main()

