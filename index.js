const http = require('http');

const proxy = http.createServer((req, res) => {
  // Set the target URL for the proxy
  const targetUrl = 'http://example.com/static';

  // Create the request options object
  const options = {
    hostname: targetUrl,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  // Make the proxy request
  const proxyReq = http.request(options, (proxyRes) => {
    // Set the response headers
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    // Pipe the response from the target server to the client
    proxyRes.pipe(res);
  });

  // Pipe the client request to the proxy request
  req.pipe(proxyReq);
});

// Start the proxy server on port 3000
proxy.listen(3000, () => {
  console.log('Proxy server started on port 3000');
});
