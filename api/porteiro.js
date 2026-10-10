export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const ua = request.headers.get('user-agent') || '(vazio)';
  const url = new URL(request.url);
  
  // MODO DEBUG: mostra o User-Agent que o Vercel recebeu
  if (url.searchParams.get('debug') === '1') {
    return new Response("UA recebido: " + ua, { status: 200 });
  }
  
  // Bloqueia apenas navegadores REAIS
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
