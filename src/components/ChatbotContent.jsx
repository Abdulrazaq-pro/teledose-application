import React, { useState, useEffect, useRef } from "react";
import { Search, Copy, Share, Check } from "lucide-react";

const ChatbotContent = ({
  messages,
  inputValue,
  handleInputChange,
  handleSendMessage,
}) => {
  const [headingText, setHeadingText] = useState("");
  const fullHeadingText = "Welcome to Our Telemedicine BOT 👋";
  const messagesEndRef = useRef(null); // Ref for scrolling to bottom
  const [copied, setCopied] = useState(null); // State to track copied message index

  // Typing effect for heading with faster speed
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullHeadingText.length) {
        setHeadingText(fullHeadingText.slice(0, index + 1));
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 100); // Decreased interval to make typing faster (100 ms)

    return () => clearInterval(interval);
  }, [fullHeadingText]);

  // Scroll to bottom with slower scroll animation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [messages]);

  const handleCopyText = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopied(index); // Set the copied message index
    setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
  };

  const handleShareText = (text) => {
    if (navigator.share) {
      navigator
        .share({ title: "Chatbot Message", text })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="flex flex-col relative overflow-hidden h-full">
      {/* Header and Chat Area */}
      <div className="flex-grow max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="text-center">
          <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-lg p-5 bg-green-600">
            <span className="text-sm font-medium text-white leading-none">
              TD
            </span>
          </span>

          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl pt-4">
            {headingText}
          </h1>
          <p className="mt-3 text-gray-600">
            Empowering your AI-driven health solution
          </p>
        </div>

        {/* Messages */}
        <ul className="mt-16 space-y-5 overflow-y-auto max-h-[70vh] scrollbar-hidden">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`max-w-2xl flex ${
                message.sender === "user"
                  ? "ms-auto justify-end"
                  : "justify-start"
              } gap-x-2 sm:gap-x-4`}
            >
              {message.sender === "bot" && (
                <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-green-600">
                  <span className="text-sm font-medium text-white leading-none">
                    C
                  </span>
                </span>
              )}
              <div
                className={`${
                  message.sender === "user" ? "text-end" : "text-start"
                } grow space-y-3`}
              >
                <div
                  className={`inline-block ${
                    message.sender === "user"
                      ? "bg-green-600 text-white rounded-tr-lg rounded-tl-lg rounded-bl-lg"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tr-lg rounded-br-lg rounded-bl-lg"
                  } p-4 shadow-sm`}
                >
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        message.sender === "bot"
                          ? message.text
                          : message.text.replace(/\n/g, "<br />"),
                    }}
                  ></p>
                  {message.sender === "bot" && (
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => handleCopyText(message.text, index)}
                        className={`py-1 px-2 text-xs rounded-lg border ${
                          copied === index
                            ? "bg-green-500 text-white border-green-500"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {copied === index ? (
                          <Check size={14} className="inline-block mr-1" />
                        ) : (
                          <Copy size={14} className="inline-block mr-1" />
                        )}
                        {copied === index ? "Copied" : "Copy"}
                      </button>
                      <button
                        onClick={() => handleShareText(message.text)}
                        className="py-1 px-2 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                      >
                        <Share size={14} className="inline-block mr-1" />
                        Share
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {message.sender === "user" && (
                <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white leading-none">
                    ME
                  </span>
                </span>
              )}
            </li>
          ))}
          <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
        </ul>
      </div>
    </div>
  );
};

export default ChatbotContent;
