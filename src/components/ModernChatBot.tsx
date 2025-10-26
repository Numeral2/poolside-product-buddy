import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, X, Send, Bot, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

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
  onAskAboutProduct?: (productName: string) => void;
}

// Expose a global function to trigger chatbot with a message
declare global {
  interface Window {
    triggerChatbot?: (message: string) => void;
  }
}

const ModernChatBot = ({ onOpenCatalog }: ModernChatBotProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addToCartPrompts, setAddToCartPrompts] = useState<Record<number, boolean>>({});
  const [isOpen, setIsOpen] = useState(() => {
    // Load chatbot open state from localStorage
    const saved = localStorage.getItem('chatbotIsOpen');
    return saved === 'true';
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load saved conversation from localStorage
    const saved = localStorage.getItem('chatbotMessages');
    if (saved) {
      return JSON.parse(saved);
    }
    // Add initial greeting message
    return [{
      role: "assistant",
      content: "Pozdrav! 👋 Ja sam vaš AI asistent za bazene.\n\n**Unesite podatke o vašem bazenu ili svoje želje, a ja ću vam preporučiti najbolje proizvode.**\n\n**Mogu vam pomoći s:**\n• Odabir opreme za vaš bazen\n• Savjeti o održavanju\n• Informacije o kemikalijama\n• Rješavanje problema s bazenom\n• Sve što biste inače pitali majstore za bazene\n\n**Primjer:**\n\"Trebam filter za bazen 35m³\"\n\"Kako održavati bazen?\"\n\"Voda mi je mutna, što da radim?\"\n\nŠto vas zanima?"
    }];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialOptions, setShowInitialOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Setup global trigger for chatbot
  useEffect(() => {
    window.triggerChatbot = (message: string) => {
      setIsOpen(true);
      // Wait for chatbot to open before sending message
      setTimeout(() => {
        handleSendMessage(message);
      }, 100);
    };
    
    return () => {
      delete window.triggerChatbot;
    };
  }, [messages]); // Include messages in dependency to capture latest state

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save isOpen state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatbotIsOpen', isOpen.toString());
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Disable auto-scroll during streaming - user controls scroll
  // Only scroll when user explicitly sends a message
  useEffect(() => {
    // Only auto-scroll when a new user message is added
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      scrollToBottom();
    }
  }, [messages.length]); // Only trigger on message count change, not content updates

  const handleInitialChoice = (choice: string) => {
    setShowInitialOptions(false);
    handleSendMessage(choice);
  };

  const clearConversation = () => {
    const initialMessage: Message = {
      role: "assistant",
      content: "Pozdrav! 👋 Ja sam vaš AI asistent za bazene.\n\n**Unesite podatke o vašem bazenu ili svoje želje, a ja ću vam preporučiti najbolje proizvode.**\n\n**Mogu vam pomoći s:**\n• Odabir opreme za vaš bazen\n• Savjeti o održavanju\n• Informacije o kemikalijama\n• Rješavanje problema s bazenom\n• Sve što biste inače pitali majstore za bazene\n\n**Primjer:**\n\"Trebam filter za bazen 35m³\"\n\"Kako održavati bazen?\"\n\"Voda mi je mutna, što da radim?\"\n\nŠto vas zanima?"
    };
    setMessages([initialMessage]);
    setShowInitialOptions(false);
    localStorage.setItem('chatbotMessages', JSON.stringify([initialMessage]));
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
          className="fixed bottom-6 right-6 max-md:bottom-4 max-md:right-4 h-14 w-14 shadow-lg z-50 group overflow-hidden"
          style={{
            background: "var(--gradient-water)",
          }}
          data-chatbot
        >
          <Sparkles className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
        </Button>
      )}

      {isOpen && (
        <Card
          className="fixed bottom-6 right-6 w-[420px] h-[600px] max-md:bottom-0 max-md:right-0 max-md:left-0 max-md:top-0 max-md:w-full max-md:h-full max-md:rounded-none flex flex-col shadow-lg z-50 border overflow-hidden"
        >
          <div
            className="p-5 flex items-center justify-between text-white"
            style={{ background: "var(--gradient-water)" }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center bg-white/20">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Asistent</h3>
                <p className="text-xs text-white/80">Uvijek tu za pomoć</p>
              </div>
            </div>
            <div className="flex gap-2">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearConversation}
                  className="hover:bg-white/20 text-white text-xs"
                  title="Novi razgovor"
                >
                  Novo
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-background">
            {showInitialOptions && messages.length === 0 ? (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="inline-flex h-14 w-14 items-center justify-center mb-3"
                       style={{ background: "var(--gradient-water)" }}>
                    <Sparkles className="h-7 w-7 text-white" />
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
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] p-4 shadow-sm",
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
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-foreground/70">Naši proizvodi:</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const category = message.products![0].category;
                                navigate(`/products?category=${category}`);
                                onOpenCatalog(category);
                              }}
                              className="text-xs h-7"
                            >
                              Vidi sve
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {message.products.slice(0, 3).map((product, prodIndex) => (
                              <div key={product.id} className="space-y-2">
                                <div className="p-3 rounded-lg border bg-background">
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
                                      <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                          {product.category}
                                        </span>
                                        <span className="text-sm font-bold text-foreground">
                                          €{product.price.toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {!addToCartPrompts[`${index}-${prodIndex}`] && (
                                  <div className="flex items-center gap-2 px-2">
                                    <p className="text-xs text-muted-foreground flex-1">Želite li dodati u košaricu?</p>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            category: product.category,
                                            image: product.image_url
                                          });
                                          setAddToCartPrompts(prev => ({ ...prev, [`${index}-${prodIndex}`]: true }));
                                          toast.success(`${product.name} dodano u košaricu!`);
                                        }}
                                        className="h-7 text-xs"
                                        style={{ background: "var(--gradient-water)" }}
                                      >
                                        <ShoppingCart className="h-3 w-3 mr-1 text-white" />
                                        <span className="text-white">Da</span>
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setAddToCartPrompts(prev => ({ ...prev, [`${index}-${prodIndex}`]: true }));
                                        }}
                                        className="h-7 text-xs"
                                      >
                                        Ne
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                            {message.products.length > 3 && (
                              <p className="text-xs text-center text-muted-foreground">
                                +{message.products.length - 3} proizvoda - kliknite "Vidi sve"
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card p-4 border">
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
                className="flex-1 border focus:border-primary transition-colors"
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
