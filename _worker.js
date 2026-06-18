const LOCAL_ALIASES = new Map([
  ['/predictor.html', '/predictor'],
  ['/predictor/', '/predictor'],
  ['/score-data.html', '/score-data'],
  ['/score-data/', '/score-data'],
  ['/college-predictor', '/predictor'],
  ['/college-predictor.html', '/predictor'],
  ['/bits-college-predictor', '/predictor'],
  ['/bits-college-predictor.html', '/predictor'],
  ['/bitsat-college-predictor', '/predictor'],
  ['/bitsat-college-predictor.html', '/predictor'],
  ['/bitsat-predictor', '/predictor'],
  ['/bitsat-predictor.html', '/predictor'],
  ['/bitsat-predictor-2026', '/predictor'],
  ['/bitsat-predictor-2026.html', '/predictor'],
  ['/bits-predictor', '/predictor'],
  ['/bits-predictor.html', '/predictor'],
  ['/score-analysis', '/score-data'],
  ['/score-analysis.html', '/score-data'],
  ['/bitsat-score-data', '/score-data'],
  ['/bitsat-score-data.html', '/score-data'],
  ['/bitsat-score-analysis', '/score-data'],
  ['/bitsat-score-analysis.html', '/score-data'],
  ['/phodu-score-data', '/score-data'],
  ['/phodu-score-data.html', '/score-data'],
  ['/apexbits-score-data', '/score-data'],
  ['/apexbits-score-data.html', '/score-data']
]);

const LOCAL_PAGES = new Set(['/predictor', '/score-data']);

const LOCAL_PREFIXES = [
  '/assets/'
];

const LOCAL_FILES = new Set([
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-48x48.png',
  '/favicon-96x96.png',
  '/favicon.ico',
  '/favicon.svg',
  '/robots.txt',
  '/site.webmanifest',
  '/sitemap.xml'
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cleanPath = cleanPagePath(url.pathname);
    const localAlias = LOCAL_ALIASES.get(url.pathname) || LOCAL_ALIASES.get(cleanPath);

    if (localAlias && url.pathname !== localAlias) {
      return redirectTo(url, localAlias, false);
    }

    if (LOCAL_PAGES.has(cleanPath) || isLocalAsset(url.pathname)) {
      return env.ASSETS.fetch(request);
    }

    return redirectTo(url, cleanPath, true);
  }
};

function isLocalAsset(pathname) {
  return LOCAL_FILES.has(pathname) || LOCAL_PREFIXES.some(prefix => pathname.startsWith(prefix));
}

function cleanPagePath(pathname) {
  let cleanPath = pathname;

  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  if (cleanPath.endsWith('.html')) {
    cleanPath = cleanPath.slice(0, -5);
  }

  return cleanPath || '/';
}

function redirectTo(url, targetPath, external) {
  const destination = new URL(targetPath, external ? 'https://apexbits.site' : url.origin);
  destination.search = url.search;
  return Response.redirect(destination.toString(), 301);
}
