const uvConfig = JSON.parse(Buffer.from(process.env.UV_CONFIG, 'base64').toString());

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Set the target URL for the proxy
  const targetUrl = uvConfig.targetUrl;

  // Create the request options object
  const options = {
    method: request.method,
    headers: request.headers,
  };

  // Make the proxy request
  const proxyRes = await fetch(targetUrl + request.url, options);

  // Set the response headers
  const headers = new Headers(proxyRes.headers);
  headers.delete('content-security-policy');
  headers.delete('content-security-policy-report-only');
  headers.delete('clear-site-data');

  // Relay the response from the target server back to the client
  return new Response(proxyRes.body, {
    status: proxyRes.status,
    statusText: proxyRes.statusText,
    headers,
  });
}
