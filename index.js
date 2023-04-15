addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    const targetUrl = "https://" + url.searchParams.get("url");
  
    const options = {
      method: request.method,
      headers: request.headers,
    };
  
    const proxyRes = await fetch(targetUrl, options);
  
    const headers = new Headers(proxyRes.headers);
    headers.delete("content-security-policy");
    headers.delete("content-security-policy-report-only");
    headers.delete("clear-site-data");
  
    const encodedUrl = encodeURIComponent(targetUrl);
  
    return new Response(proxyRes.body, {
      status: proxyRes.status,
      statusText: proxyRes.statusText,
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
        "Content-Security-Policy": "default-src 'none';",
        "Referrer-Policy": "no-referrer",
      },
    });
  }
  