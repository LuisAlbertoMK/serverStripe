function extraerUrl() {
    const urlCompleta = window.location.href;
    const parsedURL = new URL(urlCompleta);
    return parsedURL.origin;
}

setTimeout(function() {
    const donde = 'http://localhost:4242';
    // https://serverstripe.onrender.com
    const ruta = extraerUrl() === donde ? 'http://localhost:4200/planes' : 'https://speed-pro-desarrollo.web.app/planes';
    
    // Redirigir a la ruta correcta
    window.location.replace(ruta);
}, 3000);