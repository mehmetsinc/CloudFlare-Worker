addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request))
})
  
/**
 * Redirect if matches case
 * @param {Request} request
 */
async function fetchAndApply(request) {
  //  This extracts the path so you have a pattern to match
    var url = new URL(request.url);
    var path = url.pathname;
  //  console.log('Path', path)

  //  This is to set-up any default protocol or host to minimize multiple redirects
  //  You can switch to using requested protocol (2nd option) if needed for dynamic environments
      var site = "https://YOUR-DOMAİN-HERE.com/blog/";
      var siteto = "https://blog.YOUR-DOMAİN-HERE.com/blog/";
    //  var site = url.protocol + "//" + url.host;
  //  console.log('Site', site)

  switch(path) {
      //  Cases match the path you are redirecting.
      case "":
        //  Update url here to point to redirection destination
        return Response.redirect(siteto, 301);
        break;
      case "/example-2":
        //  Alternatively, you can set the full response if pointing to external url. 
        return Response.redirect('https://support.cloudflare.com/', 301);
        break; 
      case "/example-3":
        return Response.redirect('https://developers.cloudflare.com/workers/api/route-matching/', 301);
        break; 
      case "/test":
        return Response.redirect(site + '/plans', 301);
        break; 
      case "/test-2":
        return Response.redirect('https://developers.cloudflare.com/workers/about/how-workers-work/', 301);
        break; 
      case "/test-3":
        return Response.redirect('https://www.hivedigital.com/2018/12/18', 301);
        break;                                     
      default:
        const response = await fetch(request)
        return response
        break;
  }
}
