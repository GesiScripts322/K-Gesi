export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  // URL NOVA DO APPS SCRIPT AQUI
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycbwGcHyZ7QIVl-X5j25g7b47u2p7XihcyfGywM-jJNDFas5f2awd1Boy00L_QDyi4j7M/exec" + url.search;

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
