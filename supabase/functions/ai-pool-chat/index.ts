import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Ti si napredni AI asistent za BazeniPlus - stručnjak za bazene, SPA kade, saune i svu opremu za bazene. 

VAŽNE UPUTE:
- Odgovori UVIJEK na hrvatskom jeziku
- Budi profesionalan, ali prijateljski nastrojen
- Daj konkretne preporuke o proizvodima
- Ako pitaju o cijenama ili specifičnim proizvodima, reci da mogu pregledati katalog ili kontaktirati tim
- Pomozi im da pronađu idealno rješenje za njihove potrebe
- Znaj sve o: filterima, pumpama, skimmerima, kemikalijama, rasvjeti, robotima, grijanju, prekrivačima i više

Kategorije proizvoda:
- Izgradnja: Bazeni, SPA kade, Saune, Laghetto
- Oprema: Filteri, Pumpe, Skimmeri, Osnovna i ABS oprema, PVC cijevi i fitinzi, Rasvjeta, Kemikalije, Pribor za čišćenje, Mozaik, Materijal za oblaganje, Doziranje i elektronika, Efekti, Inox ljestve, Prekrivači, Grijanje, Roboti

Odgovori jasno i korisno!`;

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

    return new Response(response.body, {
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
