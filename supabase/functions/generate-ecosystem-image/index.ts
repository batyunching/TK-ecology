import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt, ecosystem, className, seat } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return json({ error: "Prompt is required." }, 400);
    }

    const openAiKey = Deno.env.get("OPENAI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const imageModel = Deno.env.get("OPENAI_IMAGE_MODEL") || "gpt-image-1";

    if (!openAiKey || !supabaseUrl || !serviceRoleKey) {
      return json({ error: "Missing OPENAI_API_KEY, SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY." }, 500);
    }

    const imageResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: imageModel,
        prompt,
        size: "1024x1024",
        quality: "high",
        n: 1
      })
    });

    const imagePayload = await imageResponse.json();
    if (!imageResponse.ok) {
      return json({ error: imagePayload?.error?.message || "OpenAI image generation failed." }, imageResponse.status);
    }

    const firstImage = imagePayload?.data?.[0];
    let imageBytes: Uint8Array;

    if (firstImage?.b64_json) {
      imageBytes = base64ToBytes(firstImage.b64_json);
    } else if (firstImage?.url) {
      const remoteImage = await fetch(firstImage.url);
      imageBytes = new Uint8Array(await remoteImage.arrayBuffer());
    } else {
      return json({ error: "OpenAI did not return image data." }, 502);
    }

    const admin = createClient(supabaseUrl, serviceRoleKey);
    const safeClass = safePath(className || "class");
    const safeSeat = safePath(seat || "seat");
    const safeEco = safePath(ecosystem || "ecosystem");
    const imagePath = `${safeClass}/${safeSeat}/${Date.now()}-${safeEco}.png`;

    const { error: uploadError } = await admin.storage
      .from("generated-images")
      .upload(imagePath, imageBytes, {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      return json({ error: uploadError.message }, 500);
    }

    const { data } = admin.storage.from("generated-images").getPublicUrl(imagePath);
    return json({ imageUrl: data.publicUrl, imagePath });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected error." }, 500);
  }
});

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function safePath(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 60) || "item";
}
