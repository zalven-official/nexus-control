from __future__ import annotations

from injector import inject
from src.types.chat_types import ChatMessageFormat
from src.services.speech_to_text import SpeechToText
from langchain_openai import ChatOpenAI
from typing import Any
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from typing import AsyncGenerator


class TextChatCompletion:
    @inject
    def __init__(self, stt: SpeechToText):
        self.stt = stt

    async def run(self, message: ChatMessageFormat) -> AsyncGenerator[str, Any]:
        model = ChatOpenAI(
          model=message['model'],
          streaming=True,
          verbose=True,
          max_tokens=message['max_tokens'],
          temperature=0,
        )
        parser = StrOutputParser()
        prompt =  ChatPromptTemplate.from_messages(message)

        chain = prompt | model | parser
        async for chunk in chain.astream(input={}):
          yield chunk
          print(chunk)

