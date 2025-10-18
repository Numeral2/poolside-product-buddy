import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url?: string;
}

interface ModernChatBotProps {
  onOpenCatalog: (category?: string) => void;
}

const ModernChatBot = ({ onOpenCatalog }: ModernChatBotProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialOptions, setShowInitialOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInitialChoice = (choice: string) => {
    setShowInitialOptions(false);
    handleSendMessage(choice);
  };

  const streamChat = async (userMessages: Message[]) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-pool-chat`;
    
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: userMessages }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast.error("Previše zahtjeva. Molimo pokušajte za trenutak.");
          return;
        }
        if (resp.status === 402) {
          toast.error("Molimo kontaktirajte podršku.");
          return;
        }
        throw new Error("Failed to start stream");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";
      let currentProducts: Product[] | undefined;

      // Add empty assistant message that will be updated
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            
            // Handle products event
            if (parsed.type === "products") {
              currentProducts = parsed.products;
              console.log("Received products:", currentProducts);
              
              // Navigate to products page with the category
              if (currentProducts && currentProducts.length > 0) {
                const category = currentProducts[0].category;
                navigate(`/products?category=${category}`);
                onOpenCatalog(category);
              }
            }
            
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                  products: currentProducts,
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
      
      // Update final message with products if they exist
      if (currentProducts) {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            products: currentProducts,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Greška pri povezivanju. Pokušajte ponovo.");
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    setInput("");
    setIsLoading(true);

    const userMessage: Message = { role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    await streamChat(newMessages);
    setIsLoading(false);
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 group overflow-hidden"
          style={{
            background: "var(--gradient-ai)",
            boxShadow: "var(--shadow-ai)",
          }}
          data-chatbot
        >
          <div className="relative">
            <Sparkles className="h-7 w-7 text-white transition-transform group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute inset-0 animate-ripple opacity-30">
              <div className="h-16 w-16 rounded-full border-2 border-white" />
            </div>
          </div>
        </Button>
      )}

      {isOpen && (
        <Card
          className="fixed bottom-6 right-6 w-[420px] h-[600px] flex flex-col shadow-2xl z-50 border-2 overflow-hidden animate-fade-in"
          style={{ boxShadow: "var(--shadow-sharp)" }}
        >
          <div
            className="p-5 flex items-center justify-between text-white relative overflow-hidden"
            style={{ background: "var(--gradient-ai)" }}
          >
            <div className="absolute inset-0 animate-shimmer opacity-30" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Asistent</h3>
                <p className="text-xs text-white/80">Uvijek tu za pomoć</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 text-white relative z-10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-background">
            {showInitialOptions && messages.length === 0 ? (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center space-y-2">
                  <div className="inline-flex h-16 w-16 rounded-full items-center justify-center mb-3 animate-glow-pulse"
                       style={{ background: "var(--gradient-ai)" }}>
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Što trebate?</h4>
                  <p className="text-sm text-muted-foreground">Odaberite ili napišite svoju poruku</p>
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => handleInitialChoice("Tražim proizvode za bazene - filtere, pumpe, kemikalije...")}
                    className="w-full h-auto p-4 text-left justify-start group hover:scale-[1.02] transition-all"
                    style={{ background: "var(--gradient-water)" }}
                  >
                    <div>
                      <div className="font-semibold text-base text-white mb-1">🏊 Oprema za bazene</div>
                      <div className="text-xs text-white/80">Filteri, pumpe, kemikalije i više</div>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => handleInitialChoice("Želim izgraditi bazen - zanima me savjet o bazenu, SPA kadi ili sauni")}
                    className="w-full h-auto p-4 text-left justify-start group hover:scale-[1.02] transition-all"
                    style={{ background: "var(--gradient-water-deep)" }}
                  >
                    <div>
                      <div className="font-semibold text-base text-white mb-1">🏗️ Izgradnja bazena</div>
                      <div className="text-xs text-white/80">Bazeni, SPA kade, saune</div>
                    </div>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex animate-fade-in",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl p-4 shadow-md",
                        message.role === "user"
                          ? "text-white"
                          : "bg-card text-foreground border"
                      )}
                      style={
                        message.role === "user"
                          ? { background: "var(--gradient-water)" }
                          : {}
                      }
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      {message.products && message.products.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-semibold text-foreground/70">Naši proizvodi:</p>
                          <div className="grid grid-cols-1 gap-2">
                            {message.products.map((product) => (
                              <div
                                key={product.id}
                                onClick={() => onOpenCatalog(product.category)}
                                className="p-3 rounded-lg border bg-background hover:shadow-md transition-all cursor-pointer"
                              >
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
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      {product.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                        {product.category}
                                      </span>
                                      <span className="text-sm font-bold text-primary">
                                        {product.price.toFixed(2)} €
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card rounded-2xl p-4 border">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full animate-bounce" 
                             style={{ background: "var(--gradient-water)" }} />
                        <div className="w-2.5 h-2.5 rounded-full animate-bounce" 
                             style={{ background: "var(--gradient-water)", animationDelay: "0.1s" }} />
                        <div className="w-2.5 h-2.5 rounded-full animate-bounce" 
                             style={{ background: "var(--gradient-water)", animationDelay: "0.2s" }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Napišite vašu poruku..."
                disabled={isLoading}
                className="flex-1 border-2 focus:border-primary transition-colors"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-5"
                style={
                  !isLoading && input.trim()
                    ? { background: "var(--gradient-water)" }
                    : {}
                }
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default ModernChatBot;
