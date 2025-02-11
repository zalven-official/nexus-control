from __future__ import annotations

import logging
import os

import eel
from src.dependency import service_container


@eel.expose
def text_to_speech(text: str):
    return service_container.text_to_speech.run(text)


@eel.expose
def speech_to_text(audio: str):
    return service_container.speech_to_text.run(audio)


@eel.expose
def text_chat_completion(prompt: str):
    return service_container.text_chat_completion.run(prompt)


@eel.expose
def vision_chat_completion(image_data: str):
    return service_container.vision_chat_completion.run(image_data)


@eel.expose
def ping():
    return 'pong'


def main():

    resource_path = os.path.join(os.path.dirname(__file__), 'web')
    eel.init(resource_path)

    logging.basicConfig(level=logging.INFO)
    logging.info('Starting Eel app...')
    logging.info(f"Web resource: {resource_path}")

    eel.start('index.html', size=(800, 600))


if __name__ == '__main__':
    main()
