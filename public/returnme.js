
function extraerUrl() {
      return new URL(window.location.href);
    }
function rutaURL(origin) {
      return origin === "http://localhost:4242" ? 'http://localhost:4200/planes' : 'https://speed-pro-desarrollo.web.app/planes';
}
setTimeout(function() {
    const {origin} = extraerUrl()
    window.location.replace(rutaURL(origin));      
}, 2000);