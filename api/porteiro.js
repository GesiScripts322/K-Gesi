export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  
  const isRealBrowser = 
    ua.includes("chrome/") || 
    ua.includes("safari/") || 
    ua.includes("firefox/") ||
    ua.includes("edg/") ||
    ua.includes("opr/");
  
  if (isRealBrowser) {
    return new Response("Acesso negado.", { status: 403 });
  }
  
  const url = new URL(request.url);
  
  // URL NOVA DO APPS SCRIPT
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzOg4J7qsBVK9L8zhan9X9uvC9A4pMpEnP95TH1GJLGA7SPrltjKWfuD0G0v3iYtk0X/exec" + url.search;
  
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
