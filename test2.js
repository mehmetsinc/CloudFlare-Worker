addEventListener('fetch', function(event) {
	event.respondWith(handleRequest(event.request))
  })
  async function handleRequest(request) {
	// Only GET requests work with this proxy.
	if (request.method !== 'GET') return MethodNotAllowed(request);
  
	const url = new URL(request.url);
	const originUrl = url.toString().replace(
	  'https://emaillistvalidation.com/blog/*',
	  'https://blog.emaillistvalidation.com/blog/*'
	);
	const originPage = await fetch(originUrl);
	const newResponse = new Response(originPage.body, originPage);
  
	return newResponse;
  }

  