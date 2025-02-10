import eel
import logging
from src.dependency import service_container
import argparse


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

parser = argparse.ArgumentParser(description="Eel GUI Application")
parser.add_argument("--app-mode", action="store_true", default=False, help="Enable app mode")
args = parser.parse_args()

if __name__ == "__main__":
    service_container.get_services()
    logging.info("Starting Eel apsp...")
    print(args.app_mode)
    eel.start("index.html", app_mode=args.app_mode, size=(800, 600))