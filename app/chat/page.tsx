"use client";

import { Fragment, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputMessage,
  PromptInputBody,
} from "@/components/ai-elements/prompt-input";

import { Loader } from "@/components/ai-elements/loader";

export default function RAGChatBot() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text.trim()) return;
    sendMessage({ text: message.text });
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                title="Start a conversation"
                description="Type a message below to begin"
              />
            ) : (
              messages?.map((message) => (
                <Message key={message?.id} from={message?.role}>
                  <MessageContent>
                    {message?.parts?.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Fragment key={`${message?.id}-${i}`}>
                              <Message from={message?.role}>
                                <MessageContent>{part.text}</MessageContent>
                              </Message>
                            </Fragment>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              ))
            )}

            {(status === "submitted" || status === "streaming") && <Loader />}
          </ConversationContent>
        </Conversation>
        <div className="border-t p-4">
          <PromptInput
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto flex gap-2 items-end"
          >
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              rows={1}
              className="flex-1"
            />
            <PromptInputSubmit disabled={isLoading} />
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
