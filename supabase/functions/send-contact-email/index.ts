import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Send email to company
    const companyEmailResponse = await resend.emails.send({
      from: "Bazeni Plus <onboarding@resend.dev>",
      to: ["info@bazeniplus.hr"], // Replace with actual company email
      subject: `Novi upit: ${subject}`,
      html: `
        <h2>Novi kontakt upit</h2>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Predmet:</strong> ${subject}</p>
        ${message ? `<p><strong>Poruka:</strong></p><p>${message}</p>` : ''}
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Bazeni Plus <onboarding@resend.dev>",
      to: [email],
      subject: "Primili smo vašu poruku - Bazeni Plus",
      html: `
        <h1>Hvala što ste nas kontaktirali, ${name}!</h1>
        <p>Primili smo vašu poruku i odgovorit ćemo vam u najkraćem mogućem roku.</p>
        <p><strong>Predmet:</strong> ${subject}</p>
        ${message ? `<p><strong>Vaša poruka:</strong></p><p>${message}</p>` : ''}
        <br>
        <p>S poštovanjem,<br>Tim Bazeni Plus</p>
      `,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        companyEmail: companyEmailResponse,
        customerEmail: customerEmailResponse 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
