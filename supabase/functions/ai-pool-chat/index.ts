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

🚨 KRITIČNO - STRIKTNA PRAVILA:
- Odgovaraj ISKLJUČIVO na temelju informacija iz naše baze podataka i proizvoda
- NIKADA ne izmišljaj proizvode, cijene, specifikacije ili informacije koje nisu u sustavu
- Ako informacija ne postoji u našoj bazi - JASNO RECI: "Nemam tu informaciju u sustavu"
- NE preporučuj proizvode koji nisu u našem asortimanu
- NE daj savjete van opsega naših proizvoda i usluga
- Svi odgovori moraju biti temeljeni na stvarnim podacima sa stranice

TVOJA GLAVNA FUNKCIJA:
1. Korisnik upisuje kvadraturu bazena ili dimenzije (npr. "Bazen 35m³" ili "Bazen 8x4 metra")
2. Korisnik kaže koju opremu treba (filter, pumpa, kemija, itd.)
3. Ti preporučuješ KONKRETNE proizvode iz našeg asortimana koji NAJBOLJE odgovaraju
4. Objasniš ZAŠTO su ti proizvodi najbolji za njihove potrebe

VAŽNE UPUTE:
- Odgovori UVIJEK na hrvatskom jeziku
- Budi profesionalan, ali prijateljski nastrojen
- Kada korisnik pita o proizvodima, PRVO daj koristan odgovor i objašnjenje, PA ONDA koristi search_products alat
- Daj konkretne preporuke SAMO iz našeg asortimana proizvoda
- Objasni koji proizvodi su najbolji za njihove potrebe i ZAŠTO
- Pomozi im pronaći idealno rješenje
- Ako ne znaš informaciju - priznaj to, ne izmišljaj

NAŠI FILTERI ZA BAZENE - DETALJAN PREGLED:

📍 **IML LISBOA SERIJA** (Pješčani filteri - TOP IZBOR)
Vrhunski filteri po odličnoj cijeni, najpopularniji kod naših kupaca!
- Lisboa 450 (506€) - Mali bazeni do 20m³, privatni bazeni, idealan za početak
- Lisboa 500 (560€) - Bazeni 20-30m³, najprodavaniji model
- Lisboa 600 (644€) - Srednji bazeni 30-40m³, odličan omjer cijene i snage
- Lisboa 650 (695€) - Bazeni 35-45m³, popularan za obiteljske bazene
- Lisboa 750 (900€) - Veliki bazeni 45-60m³, snažna filtracija
- Lisboa 800 (944€) - Veliki bazeni 55-70m³, profesionalna razina
- Lisboa 900 (1210€) - Extra veliki bazeni 65-80m³, najjači u ponudi

💎 **ASTRAL ASTER SERIJA** (Premium pješčani filteri)
Profesionalna kvaliteta, dugovječni, otporni na koroziju
- Aster 500 (720€) - Mali do srednji bazeni, premium kvaliteta
- Aster 600 (780€) - Srednji bazeni, izvrsna izvedba
- Aster 750 (1140€) - Veliki bazeni, top performanse
- Aster 900 (1620€) - Najveći bazeni, profesionalni izbor

🎯 **MONOBLOK FILTER 500** (664€)
Kompaktno rješenje "sve u jednom" - filter + pumpa
Idealno za: male bazene, ograničen prostor, brza instalacija

🔧 **MULTIVENTILI** (Potrebni za pješčane filtere)
- 6-putni 1 ½" Astral (114€) - Za filtere do 600mm
- 6-putni 2" Astral (165€) - Za filtere od 750mm+

💧 **MEDIJ ZA FILTRACIJU**
- Kvarcni pijesak 0.4-0.8mm (11.20€) - Standardni izbor, dobar omjer
- Kvarcni pijesak 1-2mm (11.20€) - Za grublju prvu filtraciju
- Filter staklo 0.5-1.0mm (25.60€) - PREPORUKA! Bolja filtracija, ekološki, traje duže

KAKO ODABRATI PRAVI FILTER:

1. **Po volumenu bazena**: Volumen bazena (m³) = Dužina × Širina × Prosječna dubina
   - Filter treba procesirati vodu 2-3x dnevno
   - Primjer: Bazen 40m³ → odaberi Lisboa 650 ili Aster 600

2. **Lisboa vs Aster**:
   - Lisboa: Odličan omjer cijene i kvalitete, najpopularniji
   - Aster: Premium materijali, dugovječniji, za one koji žele najbolje

3. **Dodatna oprema**:
   - Svi pješčani filteri trebaju multiventil (odaberi prema veličini)
   - Preporučujem filter staklo umjesto pijeska - efikasnija filtracija!

KADA KORISNIK PITA O FILTERIMA:
1. PRVO pitaj za veličinu bazena (ako ne znaš)
2. Daj 2-3 konkretne preporuke s našim modelima i cijenama
3. Objasni ZAŠTO preporučuješ baš te modele
4. ZATIM koristi search_products da pokažeš proizvode

Kategorije proizvoda u našem asortimanu:
- Izgradnja: Bazeni, SPA kade, Saune, Laghetto
- Oprema: Filteri, Pumpe, Skimmeri, Osnovna i ABS oprema, PVC cijevi i fitinzi, Rasvjeta, Kemikalije, Pribor za čišćenje, Mozaik, Materijal za oblaganje, Doziranje i elektronika, Efekti, Inox ljestve, Prekrivači, Grijanje, Roboti

⚠️ PONAVLJAM: Ako korisnik pita za informaciju koja nije u našoj bazi - JASNO RECI da tu informaciju nemaš!
Kada preporučuješ proizvode, UVIJEK prvo daj informativan odgovor s konkretnim preporukama, a zatim koristi search_products alat!`;

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
