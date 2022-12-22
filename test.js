

// Config for our subdomain (where the Ghost blog currently lives)
// and our root domain (where we want it to live)
// and our blogPath (the subdirectory we want it at)
// Change these to suit your case!
const config = {
	subdomain: "blog.emaillistvalidation.com",
	root: "emaillistvalidation.com",
	blogPath: "blog",
  }

  // Function that processes requests to the URL the worker is at
  const asyncfunctionhandleRequest = async (request) => {
	// Grab the request URL's pathname, we'll use it later
  const url =new URL(request.url)
  const targetPath = url.pathname
  
	// Change request URLs to go through to the subdomain
  let response =await fetch(`https://${config.subdomain}${targetPath}`)
  
	// Ghost loads assets like JS and CSS from 3 subdirectories
	// We don't need to change these requests at all
	// So if we're getting stuff from those subdirectories,
	// we return the response of the fetch request from above
	// immediately.
  if (
		targetPath.includes('/${config.blogPath}/favicon.png') ||
	  targetPath.includes('/${config.blogPath}/sitemap.xsl') ||
	  targetPath.includes(`/${config.blogPath}/assets/`) ||
	  targetPath.includes(`/${config.blogPath}/public/`) ||
	  targetPath.includes(`/${config.blogPath}/content/`)
	) {
  return response
	}
  
	// In other cases - which will usually be pages of the
	// Ghost blog - we want to find any reference to our subdomain
	// and replace it with our root domain.
	// This is so that things like our canonical URLs and links are
	// set up correctly, so we NEVER see our subdirectory in the code.
  
	// First we get the body of the response from above
  let body =await response.text()
	// Then we search in the body to replace the subdomain everywhere
	// with the root domain.
	body = body.split(config.subdomain).join(config.root)
  
	response =new Response(body, response)
  return response
  };
 
  addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request))
  });
