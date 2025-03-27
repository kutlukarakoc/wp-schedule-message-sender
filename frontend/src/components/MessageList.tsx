import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getMessages, updateMessageStatus } from "../lib/api";

interface Message {
  id: string;
  phoneNumbers: string[];
  message: string;
  schedule: string;
  isActive: boolean;
}

const formatCronExpression = (cron: string): string => {
  const [minute, hour, day, month, weekday] = cron.split(" ");
  
  let frequency = "";
  
  if (minute === "*" && hour === "*") {
    frequency = "Every minute";
  } else if (hour === "*") {
    frequency = `Every hour at minute ${minute}`;
  } else if (day === "*" && month === "*") {
    frequency = `Daily at ${hour}:${minute}`;
  } else if (weekday === "*") {
    frequency = `Monthly on day ${day} at ${hour}:${minute}`;
  } else {
    frequency = `Weekly on ${getWeekdayName(weekday)} at ${hour}:${minute}`;
  }
  
  return frequency;
};

const getWeekdayName = (weekday: string): string => {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays[parseInt(weekday)] || weekday;
};

const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleStatusChange = async (messageId: string, isActive: boolean) => {
    try {
      await updateMessageStatus(messageId, isActive);
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, isActive } : msg
      ));
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Scheduled Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Recipients:</p>
                <p className="text-gray-600">{message.phoneNumbers.join(", ")}</p>
                
                <p className="font-medium mt-2">Message:</p>
                <p className="text-gray-600">{message.message}</p>
                
                <p className="font-medium mt-2">Schedule:</p>
                <p className="text-gray-600">{formatCronExpression(message.schedule)}</p>
                <p className="text-sm text-gray-500 font-mono">{message.schedule}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={message.isActive}
                  onCheckedChange={(checked) => 
                    handleStatusChange(message.id, checked)
                  }
                />
                <Label>
                  {message.isActive ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList; 