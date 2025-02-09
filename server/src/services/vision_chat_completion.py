from injector import inject

class VisionChatCompletion:
    @inject
    def __init__(self):
      pass

    def chat(self, message: str) -> str:
        return f"Chat: '{message}'"
