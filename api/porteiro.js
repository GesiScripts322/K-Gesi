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
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzbH5EI27RWFAtyW031Rda73xmKuFEVfHQr31VpRxLoeNhysG4sakw15YYwXPSl0yn00A/exec" + url.search;

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
