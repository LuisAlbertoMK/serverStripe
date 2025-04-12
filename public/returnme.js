function extraerUrl() {
    const urlCompleta = window.location.href;
    const parsedURL = new URL(urlCompleta);
    console.log({urlCompleta, parsedURL});
    const {pathname} = parsedURL;
    return { origin: parsedURL.origin, pathname };
}

setTimeout(function() {
    const donde = 'http://localhost:4242';
    // 'http://localhost:4242';
    // https://serverstripe.onrender.com
    const {origin, pathname} = extraerUrl();
    const success = pathname.includes('success');
    const ruta = origin === donde ? 'http://localhost:4200/planes' : 'https://speed-pro-desarrollo.web.app/planes';
    // console.log({donde, ruta});
    // Redirigir a la ruta correcta
    window.location.replace(ruta);
}, 2000);