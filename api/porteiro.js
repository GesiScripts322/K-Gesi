export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  
  // Bloqueia apenas navegadores REAIS (Chrome, Firefox, Safari, Edge)
  // Delta mobile NÃO tem "chrome/", "safari/" nem "applewebkit" no UA
  const isRealBrowser = 
    ua.includes("chrome/") || 
    ua.includes("safari/") || 
    ua.includes("applewebkit") ||
    ua.includes("firefox/") ||
    ua.includes("edg/") ||
    ua.includes("opr/");
  
  if (isRealBrowser) {
    return new Response("Acesso negado.", { status: 403 });
  }
  
  const url = new URL(request.url);
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycbyPEqPGDqmmB3Pl6t65qvPWKjddmJnwYELI_GsuC_4NBQ2ocfX1XWaOX8MwoJkH5-8YeA/exec" + url.search;
  
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
