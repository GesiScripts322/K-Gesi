export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycby2EuFBV4jicjUjCntWm1-Bd11cshYKkcsTBqK7m4-Y3CyCgq55oLwcM1P35uoNX0SR/exec" + url.search;

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
