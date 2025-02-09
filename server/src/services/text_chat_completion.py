from injector import inject

class TextChatCompletion:
    @inject
    def __init__(self):
      pass

    def chat(self, message: str) -> str:
        return f"Chat: '{message}'"
