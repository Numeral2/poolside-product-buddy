import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

    const systemPrompt = `Ti si napredni AI asistent za CoolPool - stručnjak za bazene, SPA kade, saune i svu opremu za bazene. 

🚨 KRITIČNO - APSOLUTNO STRIKTNA PRAVILA:

**O CIJENAMA I PROIZVODIMA:**
- Cijene i specifikacije SMIJU SE REĆI SAMO AKO SU U BAZI PODATAKA!
- NIKADA ne izmišljaj cijene, proizvode ili specifikacije
- Ako korisnik pita za cijenu proizvoda koji NIJE u bazi - reci: "Nemam točnu cijenu za taj proizvod u sustavu. Molim kontaktirajte nas za više informacija."
- Ako korisnik pita za proizvod koji NIJE u našem asortimanu - reci: "Trenutno nemamo taj proizvod u ponudi. Mogu li preporučiti alternativu iz našeg asortimana?"
- NE preporučuj proizvode koji nisu u našem asortimanu
- UVIJEK koristi search_products alat prije nego što spomeneš bilo koji proizvod ili cijenu

**O OPĆIM PITANJIMA:**
- NA OPĆA PITANJA O ODRŽAVANJU BAZENA možeš odgovoriti (npr. "kako očistiti bazen", "kako održavati pH", "kada dodati kemikalije")
- Ali i tu, ako postoje KONKRETNI PROIZVODI u našoj bazi koji mogu pomoći - preporuči ih!

TVOJA GLAVNA FUNKCIJA:
1. Korisnik upisuje kvadraturu bazena ili dimenzije (npr. "Bazen 35m³" ili "Bazen 8x4 metra")
2. Korisnik kaže koju opremu treba (filter, pumpa, kemija, itd.)
3. Ti PRVO koristiš search_products alat da vidiš što imamo u bazi
4. ZATIM preporučuješ KONKRETNE proizvode iz rezultata pretrage
5. Objasniš ZAŠTO su ti proizvodi najbolji za njihove potrebe

VAŽNE UPUTE:
- Odgovori UVIJEK na hrvatskom jeziku
- Budi profesionalan, ali prijateljski nastrojen
- OBAVEZNO koristi search_products alat prije nego što spomeneš bilo koji proizvod
- Daj konkretne preporuke SAMO iz rezultata pretrage baze podataka
- Ako ne znaš informaciju ili proizvod nije u bazi - jasno to reci
- Za opća pitanja o održavanju možeš dati savjete, ali UVIJEK preporuči proizvode iz baze ako su relevantni

KAKO KORISNIK MOŽE PITATI:

**Opća pitanja o održavanju** (možeš odgovoriti):
- "Kako očistiti bazen?"
- "Kako održavati pH vrijednost?"
- "Kada dodati kemikalije?"
- "Kako pripremiti bazen za zimu?"

**Pitanja o proizvodima** (OBAVEZNO koristi search_products):
- "Koji filter trebam za bazen 40m³?"
- "Koliko košta robot za čišćenje?"
- "Imate li pumpe u ponudi?"
- "Koje kemikalije preporučujete?"

POSTUPAK ODGOVARANJA:
1. Ako je OPĆE pitanje → odgovori savjetom + preporuči relevantne proizvode iz baze (koristi search_products)
2. Ako je pitanje o PROIZVODU → PRVO koristi search_products, ZATIM preporuči na osnovu rezultata
3. Ako proizvod NIJE u bazi → "Trenutno nemamo taj proizvod. Mogu li preporučiti alternativu?"
4. Ako je pitanje o CIJENI → reci cijenu SAMO ako je u rezultatima search_products

Kategorije proizvoda koje možemo pretražiti:
- Izgradnja: Bazeni, SPA kade, Saune, Laghetto
- Oprema: Filteri, Pumpe, Skimmeri, Osnovna i ABS oprema, PVC cijevi i fitinzi, Rasvjeta, Kemikalije, Pribor za čišćenje, Mozaik, Materijal za oblaganje, Doziranje i elektronika, Efekti, Inox ljestve, Prekrivači, Grijanje, Roboti

⚠️ PONAVLJAM - ZLATNO PRAVILO: 
Nemaš proizvod/cijenu u rezultatima search_products → Ne spominji ga!
Korisnik pita opće pitanje o održavanju → Odgovori + preporuči proizvode iz baze ako su relevantni!`;


    const tools = [
      {
        type: "function",
        function: {
          name: "search_products",
          description: "Pretraži bazu proizvoda po kategoriji ili ključnim riječima. Koristi ovo UVIJEK kada korisnik pita o proizvodima.",
          parameters: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Kategorija proizvoda (npr. 'Pumpe', 'Filteri', 'Kemikalije', 'Roboti', 'Grijanje')"
              },
              searchTerm: {
                type: "string",
                description: "Ključna riječ za pretragu (npr. 'robot', 'kemija', 'grijanje')"
              }
            }
          }
        }
      }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        tools: tools,
        tool_choice: "auto",
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Previše zahtjeva. Molimo pokušajte za trenutak." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Molimo kontaktirajte podršku." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    // Handle streaming with tool calls
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        let toolCalls: any[] = [];
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            
            for (const line of lines) {
              if (!line.trim() || line.startsWith(":")) continue;
              if (!line.startsWith("data: ")) continue;
              
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta;
                
                // Handle tool calls
                if (delta?.tool_calls) {
                  for (const toolCall of delta.tool_calls) {
                    if (!toolCalls[toolCall.index]) {
                      toolCalls[toolCall.index] = {
                        id: toolCall.id,
                        type: toolCall.type,
                        function: { name: toolCall.function?.name || "", arguments: "" }
                      };
                    }
                    if (toolCall.function?.arguments) {
                      toolCalls[toolCall.index].function.arguments += toolCall.function.arguments;
                    }
                  }
                }
                
                // Check if response is finished and we have tool calls
                if (parsed.choices?.[0]?.finish_reason === "tool_calls" && toolCalls.length > 0) {
                  console.log("Tool calls detected:", toolCalls);
                  
                  for (const toolCall of toolCalls) {
                    if (toolCall.function.name === "search_products") {
                      const args = JSON.parse(toolCall.function.arguments);
                      console.log("Searching products with args:", args);
                      
                      let query = supabase.from('products').select('*');
                      
                      if (args.category) {
                        query = query.ilike('category', `%${args.category}%`);
                      }
                      if (args.searchTerm) {
                        query = query.or(`name.ilike.%${args.searchTerm}%,description.ilike.%${args.searchTerm}%,category.ilike.%${args.searchTerm}%`);
                      }
                      
                      const { data: products, error } = await query.limit(20);
                      
                      if (error) {
                        console.error("Error fetching products:", error);
                      } else if (products && products.length > 0) {
                        console.log(`Found ${products.length} products`);
                        
                        // Send products as a special SSE event
                        const productsEvent = `data: ${JSON.stringify({
                          type: "products",
                          products: products
                        })}\n\n`;
                        controller.enqueue(encoder.encode(productsEvent));
                      }
                    }
                  }
                }
                
                // Forward the original chunk
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              } catch (e) {
                console.error("Error parsing SSE:", e);
              }
            }
          }
          
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("Error in ai-pool-chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Nepoznata greška" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
