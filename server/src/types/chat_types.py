
from typing import TypedDict, Literal, List, Union


class TextMessage(TypedDict):
    type: Literal["text"]
    text: str

class ImageURLPayload(TypedDict):
    url: str

class ImageURL(TypedDict):
    type: Literal["image_url"]
    image_url: ImageURLPayload

class AudioURLPayload(TypedDict):
    url: str

class AudioMessage(TypedDict):
    type: Literal["audio"]
    audio_url: AudioURLPayload

class CodeMessage(TypedDict):
    type: Literal["code"]
    code: str

MessageContent = Union[TextMessage, ImageURL, AudioMessage, CodeMessage]

class ChatMessage(TypedDict):
    role: Literal["user", "assistant", "developer"]
    content: List[MessageContent]


class ChatMessageFormat(TypedDict):
    model: str
    messages: List[ChatMessage]
    max_tokens: int
    store: bool

