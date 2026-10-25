export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  
  // URL NOVA DO APPS SCRIPT
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycbyNoZDg3pxXEp-uOZkD8d5lJ_jqyQONhYNL0Slwginr6CxRT1DMfAlNYZO-twi2I_Jy/exec" + url.search;
  
  try {
    const response = await fetch(appsScriptUrl);
    const script = await response.text();
    return new Response(script, {
      headers: { "Content-Type": "text/plain" }
    });
  } catch (error) {
    return new Response("Erro no porteiro.", { status: 500 });
  }
}
