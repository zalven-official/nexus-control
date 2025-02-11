from __future__ import annotations

from injector import inject


class VisionChatCompletion:
    @inject
    def __init__(self):
        pass

    def run(self, message: str) -> str:
        return f"Chat: '{message}'"
