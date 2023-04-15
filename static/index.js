addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Set the target URL for the proxy
    const targetUrl = 'https://goarmy.us.to/';
  
    // Create the request options object
    const init = {
      method: request.method,
      headers: request.headers,
      body: request.body
    };
  
    // Make the proxy request
    const proxyRes = await fetch(targetUrl, init);
  
    // Set the response headers
    const headers = new Headers(proxyRes.headers);
  
    // Relay the response from the target server back to the client
    return new Response(proxyRes.body, {
      status: proxyRes.status,
      statusText: proxyRes.statusText,
      headers
    });
  }
  