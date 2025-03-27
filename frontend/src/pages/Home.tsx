import MessageList from "@/components/MessageList";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          WhatsApp Mesaj Planlama
        </h1>
        <div className="space-y-8">
          <MessageForm />
          <MessageList />
        </div>
      </div>
    </div>
  );
};

export default Home;
