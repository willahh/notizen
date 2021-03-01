// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const debug = false;

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (debug) console.log('### 01');
  // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  if (true) {
    if (debug) console.log('### 02 prod && serviceWOrker');
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      if (debug) console.warn('### origin');
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      if (debug) console.log('### on load');
      // const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      const swUrl = `file:///Users/willahh/www/projects/notizen/frontend/web/src/serviceWorker.js`;
      if (debug) console.log('### swUrl', swUrl);

      if (isLocalhost) {
        if (debug) console.log('### isLocalhost');
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          if (debug) console.log('### navigator.serviceWorker.ready');
          if (debug)
            console.log(
              '#### This web app is being served cache-first by a service ' +
                'worker. To learn more, visit https://bit.ly/CRA-PWA'
            );
        });
      } else {
        if (debug) console.log('### not localhost');
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  } else {
    if (debug)
      console.warn(
        '### process.env.NODE_ENV === production && serviceWorker in navigator'
      );
  }
}

function registerValidSW(swUrl, config) {
  if (debug) console.log('### registerValidSW', swUrl, config);
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      if (debug) console.log('### then registration');
      registration.onupdatefound = () => {
        if (debug) console.log('### registration.onupdatefound');
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              if (debug)
                console.log(
                  'New content is available and will be used when all ' +
                    'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              if (debug) console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      if (debug)
        console.error('### Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  if (debug) console.log('### checkValidServiceWorker', swUrl, config);
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      if (debug) console.log('### response fetch');
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (debug)
        console.log(
          '### contentType, response.status',
          contentType,
          response.status
        );
      if (debug)
        console.log(
          '### contentType.indexOf(javascript)',
          contentType.indexOf('javascript')
        );
      if (false) {
        // (
        //   response.status === 404 ||
        //   (contentType != null && contentType.indexOf('javascript') === -1)
        // )
        if (debug)
          console.warn(
            '### No service worker found. Probably a different app. Reload the page.'
          );
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        if (debug)
          console.log('### // Service worker found. Proceed as normal.');
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      if (debug)
        console.log(
          '### No internet connection found. App is running in offline mode.'
        );
      if (debug)
        console.log(
          'No internet connection found. App is running in offline mode.'
        );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        if (debug) console.error(error.message);
      });
  }
}
