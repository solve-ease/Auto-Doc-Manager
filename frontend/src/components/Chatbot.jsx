import { useState } from "react";
import { motion } from "framer-motion";
import {Client }  from "@gradio/client"
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import ChatFooter from "./ChatFooter";


const Chatbot = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async (message) => {
    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: "user", message }]);

       // AI activity endpoint
       const client = await Client.connect("AiActivity/AI-Assistant");
       const rolePrompt = "You role is chatbot assistant with good conversational skills, Keep the output short (30 to 40) words maximum and You're working on AutoDoc : Decentralized Document Verification using Avalance Blockchain and AI. Built by Team Solve-Ease  "
 
       const finalPrompt = `Role: ${rolePrompt}    
       User : ${message}
       `
       
       const result = await client.predict("/chat", { message: { text: finalPrompt, files: [] } });
       console.log(result)
       const botResponse = result.data[0]
    // const data = await response.json();
    setChatHistory([...chatHistory, { sender: "user", message }, { sender: "bot", message: botResponse }]);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-lg flex flex-col"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ChatHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput onSendMessage={handleSendMessage} />
      <ChatFooter activeTab={activeTab} setActiveTab={setActiveTab} />
    </motion.div>
  );
};

export default Chatbot;