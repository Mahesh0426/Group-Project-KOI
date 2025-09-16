// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Card, CardContent } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from "lucide-react";

// const ChatBot = ({ isOpen, onOpenChange }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const scrollRef = useRef(null);

//   const getInitialBotMessage = () => ({
//     from: "bot",
//     text: `Hello 👋 I’m your AI assistant. How can I help you today?`,
//     time: new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//   });

//   useEffect(() => {
//     setMessages([getInitialBotMessage()]);
//   }, []);

//   const getBotResponse = (userText) => {
//     const lower = userText.toLowerCase();
//     if (lower.includes("hello") || lower.includes("hi"))
//       return "Hi there! How can I assist you?";
//     if (lower.includes("project"))
//       return "Your group project sounds interesting! What do you need help with?";
//     if (lower.includes("thank"))
//       return "You're welcome! Let me know if you have more questions.";
//     return "Sorry, I’m just a demo bot and don’t understand that yet.";
//   };

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     const timeNow = new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     const newUserMessage = { from: "user", text: input, time: timeNow };
//     setMessages((prev) => [...prev, newUserMessage]);
//     setInput("");
//     setLoading(true);

//     setTimeout(() => {
//       const botReply = getBotResponse(input);
//       const botMessage = {
//         from: "bot",
//         text: botReply,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setMessages((prev) => [...prev, botMessage]);
//       setLoading(false);
//     }, 700);
//   };

//   useLayoutEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);

//   const clearChat = () => setMessages([getInitialBotMessage()]);

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[420px] p-0 rounded-2xl overflow-hidden">
//         <DialogHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4">
//           <DialogTitle className="text-center text-lg font-semibold">
//             🤖 AI Assistant
//           </DialogTitle>
//         </DialogHeader>

//         <Card className="border-0 shadow-none bg-gray-50">
//           <CardContent className="p-0">
//             <div
//               ref={scrollRef}
//               className="h-[320px] p-4 overflow-y-auto flex flex-col gap-4"
//             >
//               {messages.map((msg, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex ${
//                     msg.from === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   {msg.from === "bot" && (
//                     <Avatar className="w-8 h-8 mr-2">
//                       <AvatarImage
//                         src="https://api.dicebear.com/7.x/bottts/svg?seed=stem-bot"
//                         alt="STEM AI Bot"
//                       />
//                       <AvatarFallback>🤖</AvatarFallback>
//                     </Avatar>
//                   )}

//                   <div className="flex flex-col max-w-[70%]">
//                     <div
//                       className={`px-3 py-2 rounded-2xl text-sm shadow-sm ${
//                         msg.from === "user"
//                           ? "bg-blue-600 text-white rounded-br-none"
//                           : "bg-white text-gray-900 border rounded-bl-none"
//                       }`}
//                     >
//                       {msg.text}
//                     </div>
//                     <span
//                       className={`text-[10px] mt-1 ${
//                         msg.from === "user"
//                           ? "text-right text-gray-400"
//                           : "text-left text-gray-400"
//                       }`}
//                     >
//                       {msg.time}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Input Area */}
//         <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-center p-4">
//           <div className="relative w-full max-w-2xl">
//             <Textarea
//               placeholder="Type a message..."
//               className="w-full pr-12 resize-none rounded-full border border-gray-300  leading-[2.35rem] h-9"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               rows={1}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   sendMessage();
//                 }
//               }}
//               disabled={loading}
//             />
//             <Button
//               onClick={sendMessage}
//               disabled={loading}
//               className="absolute right-3 bottom-2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
//             >
//               {loading ? "..." : <Send size={18} />}
//             </Button>
//           </div>
//         </div>

//         <div className="p-3 flex justify-between bg-gray-100 border-t">
//           <Button variant="destructive" size="sm" onClick={clearChat}>
//             Clear
//           </Button>
//           <DialogClose asChild>
//             <Button variant="outline" size="sm">
//               End
//             </Button>
//           </DialogClose>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ChatBot;
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import TypingIndicator from "./TypingIndicator";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const systemPromptSTEM = `
You are the AI assistant for STEM Explorers Club, dedicated to providing excellent customer support.Always answer in friendly clear and conversational tone.
Your role includes answering questions about STEM programs, memberships, schedules, events, and technical support.

Here is important info from the About page:
STEM Explorers Club is a community designed for children aged 8 to 14 who are passionate about Science, Technology, Engineering, and Mathematics.
 We aim to make STEM education fun and accessible through various programs, workshops, and events. Our mission is to inspire innovation, creativity, 
 and problem-solving skills among young learners.

 if someone asks about the website go to the about page and then reply about the website.
this is a app link:  [https://group-project-koi.vercel.app/] (https://group-project-koi.vercel.app/)

if some one  ask about this website go to about page and then reply about the website.
this club is specially designe for age group 8 to 14 only.

parents or the kid both can ask about the club. if they ask about the program go to program page and suggest 
only the program that is available in the website in program page . if user  ask about other program  simple say sorry in a polite way.

**rules to follow:**
1.Add emojis where appropriate.
2. Always respond clearly and concisely. Use bullet points to list features or key points, and keep language friendly and engaging.
3.Be friendly, clear, concise, and helpful with a focus on encouraging STEM learning and exploration.
Use a warm and professional tone.
4. if some one ask about the website do not answer like this Based on the info from the About page. Give answer that you are real customer support assistant.
5. if some one ask about the program do not answer like this Based on the info from the Program page. Give answer that you are real customer support assistant.

`;

const ChatBot = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const getInitialBotMessage = () => ({
    from: "bot",
    text: `Hello 👋 I’m your STEM Explorers Club AI assistant. How can I help you today?`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  useEffect(() => {
    setMessages([getInitialBotMessage()]);
  }, []);

  // Function to call Gemini AI model to get response for user input
  const getBotResponse = async (userInput) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPromptSTEM,
    });

    try {
      const result = await model.generateContent(userInput);
      const text = result.response.text();
      return text;
    } catch (error) {
      console.error("Failed to get AI response:", error);
      return "Sorry, I am having trouble responding right now. Please try again later.";
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newUserMessage = { from: "user", text: input, time: timeNow };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    const botReply = await getBotResponse(input);

    const botMessage = {
      from: "bot",
      text: botReply,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const clearChat = () => setMessages([getInitialBotMessage()]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 rounded-2xl overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4">
          <DialogTitle className="text-center text-lg font-semibold">
            🤖 STEM Explorers AI Assistant
          </DialogTitle>
        </DialogHeader>

        <CardContent className="p-0">
          <div
            ref={scrollRef}
            className="h-[410px] p-4 overflow-y-auto flex flex-col gap-4"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.from === "bot" && (
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=stem-bot"
                      alt="STEM AI Bot"
                    />
                    <AvatarFallback>🤖</AvatarFallback>
                  </Avatar>
                )}

                <div className="flex flex-col max-w-[70%]">
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm shadow-sm ${
                      msg.from === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-900 border rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`text-[10px] mt-1 ${
                      msg.from === "user"
                        ? "text-right text-gray-400"
                        : "text-left text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && <TypingIndicator />}
          </div>
        </CardContent>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <Textarea
              placeholder="Type a message..."
              className="w-full pr-12 resize-none rounded-full border border-gray-300 leading-[2.35rem] h-9"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              disabled={loading}
              className="absolute right-3 bottom-2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              {loading ? "..." : <Send size={18} />}
            </Button>
          </div>
        </div>

        <div className="p-3 flex justify-between bg-gray-100 border-t">
          <Button variant="destructive" size="sm" onClick={clearChat}>
            Clear
          </Button>
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              End
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
