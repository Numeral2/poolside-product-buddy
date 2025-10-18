import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: any[];
}

interface ChatBotProps {
  onProductsUpdate: (products: any[]) => void;
}

const ChatBot = ({ onProductsUpdate }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialOptions, setShowInitialOptions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionClick = async (option: string) => {
    setShowInitialOptions(false);
    const userMessage = option;
    setMessages([{ role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("pool-chat", {
        body: { message: userMessage },
      });

      if (error) throw error;

      const assistantMessage: Message = { 
        role: "assistant", 
        content: data.response,
        products: data.products || []
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.products && data.products.length > 0) {
        onProductsUpdate(data.products);
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("pool-chat", {
        body: { message: userMessage },
      });

      if (error) throw error;

      const assistantMessage: Message = { 
        role: "assistant", 
        content: data.response,
        products: data.products || []
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.products && data.products.length > 0) {
        onProductsUpdate(data.products);
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 z-50"
          style={{ boxShadow: 'var(--shadow-float)' }}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col shadow-2xl z-50 border-2">
          {/* Header */}
          <div 
            className="p-4 rounded-t-lg flex items-center justify-between text-white"
            style={{ background: 'var(--gradient-water)' }}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Pool Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {showInitialOptions && (
              <div className="space-y-3">
                <p className="text-center text-muted-foreground mb-4">Što trebate?</p>
                <Button
                  onClick={() => handleOptionClick("Tražim proizvode za bazen")}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  disabled={isLoading}
                >
                  Tražim proizvode za bazen
                </Button>
                <Button
                  onClick={() => handleOptionClick("Tražim izgradnju bazena")}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white"
                  disabled={isLoading}
                >
                  Tražim izgradnju bazena
                </Button>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
                
                {/* Display products inline if available */}
                {message.products && message.products.length > 0 && (
                  <div className="pl-2 space-y-2">
                    {message.products.map((product) => (
                      <Card key={product.id} className="p-3 hover:shadow-md transition-shadow">
                        <div className="flex gap-3">
                          {product.image_url && (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-foreground truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                            <p className="text-sm font-bold text-primary mt-1">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pool products..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;