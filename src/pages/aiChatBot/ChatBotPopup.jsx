import React, { useState } from "react";
import Chatbot from "./ChatBot.jsx";
import { Headset } from "lucide-react";

const ChatBotPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-900 text-white shadow-lg hover:bg-blue-700"
      >
        <Headset size={28} />
      </button>

      {/* Pass state to ChatBot */}
      <Chatbot isOpen={open} onOpenChange={setOpen} />
    </>
  );
};

export default ChatBotPopup;
