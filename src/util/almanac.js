export const WEB_ALMANAC_BASE = 'https://almanac.httparchive.org/en/2021/';
const CHAPTER_NAME_MAP = {
    "css": "CSS",
    "javascript": "JavaScript",
    "markup": "Markup",
    "structured-data": "Structured Data",
    "media": "Media",
    "webassembly": "WebAssembly",
    "third-parties": "Third Parties",
    "seo": "SEO",
    "accessibility": "Accessibility",
    "performance": "Performance",
    "privacy": "Privacy",
    "security": "Security",
    "mobile-web": "Mobile Web",
    "capabilities": "Capabilities",
    "pwa": "PWA",
    "cms": "CMS",
    "ecommerce": "Ecommerce",
    "jamstack": "Jamstack",
    "page-weight": "Page Weight",
    "resource-hints": "Resource Hints",
    "cdn": "CDN",
    "compression": "Compression",
    "caching": "Caching",
    "http": "HTTP"
};

export function getChapterUrl(chapter) {
    return `${WEB_ALMANAC_BASE}${chapter}`;
}

export function getChapterName(chapter) {
    return CHAPTER_NAME_MAP[chapter];
}
