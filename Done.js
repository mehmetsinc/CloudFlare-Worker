addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  /**
   * Respond to the request
   * @param {Request} request
   */
  async function handleRequest(request) {
	   try {
		
		  const urlObject = new URL(request.url);
  
		  // If the request is to the Ghost subdirectory
		  if (/^\/blog/.test(urlObject.pathname)) {
			// Then Proxy to Ghost
			const GHOST_URL = "blog.YOUR-DOMAİN-HERE.com";
			const CUSTOM_URL = "YOUR-DOMAİN-HERE.com"; 
  
			let url = new URL(request.url);
  
			url.hostname = GHOST_URL;
  
			let proxyRequest = new Request(url, request);
  
			proxyRequest.headers.set('Host', GHOST_URL);
  
			//Have an X-Forwarded-Host header that matches the custom domain in my.ghost.org.
  
			proxyRequest.headers.set("X-Forwarded-Host", CUSTOM_URL);
  
			//Include the X-Forwarded-Proto header set to https not http.
  
			proxyRequest.headers.set("X-Forwarded-Proto", "https");
  
			//Include the X-Forwarded-For header, populated with the remote IP of the original request.
  
			let ip = proxyRequest.headers.get("CF-Connecting-IP");
  
			proxyRequest.headers.set("X-Forwarded-For", ip);
  
			return await fetch(proxyRequest);
  
		  }
  
	   } catch (error) {
  
		  // if no action found, play the regular request
  
		  return await fetch(request);
	  }
  
	  return await fetch(request);
  }
