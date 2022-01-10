const rawStats = getRawStats();
let a = rawStats.split('featured_chapter ==');
a.shift();

const chapterRE = / "([^"]+)"/;
const statRE = /"stat[1-3]":"([^"]+)","label[1-3]":"([^"]+)"/gm;
const stats = a.flatMap(i => {
    const chapter = i.match(chapterRE)[1];
    return Array.from(i.matchAll(statRE)).map(s => ({
        chapter,
        clue: s[2],
        answer: s[1]
    }));
});
const csv = stats.map(s => `"${s.chapter}","${s.clue}","${s.answer}"`).join('\n');
console.log(csv);
copy(csv);

function getRawStats() {
    return `{%- if featured_chapter == "accessibility" %}
  {%- set featured_chapter_quote = "Web accessibility is about giving complete access to all aspects of an interface to people with disabilities by achieving feature and information parity. A digital product or website is simply not complete if it is not usable by everyone. If a digital product excludes certain disabled populations, this is discrimination and potentially grounds for fines and/or lawsuits." %}
  {%- set featured_chapter_stats = {
      "stat1":"0.96%","label1":"Well over 60,000 desktop websites use an accessibility overlay",
      "stat2":"22%","label2":"Websites that pass color contrast audit in Lighthouse",
      "stat3":"57%","label3":"Buttons on sites that get their accessible name from content"
    }
  %}
{%- elif featured_chapter == "capabilities" %}
  {%- set featured_chapter_quote = "Capabilities are new web platform APIs that unlock entirely new use cases for web applications." %}
  {%- set featured_chapter_stats = {
      "stat1":"9%","label1":"Desktop web sites using the <em>Web Share API</em>",
      "stat2":"8.25%","label2":"Mobile sites using the <em>Async Clipboard API</em>",
      "stat3":"11","label3":"Mobile sites using <em>Declarative Link Capturing</em>"
    }
  %}
{%- elif featured_chapter == "cdn" %}
  {%- set featured_chapter_quote = "CDNs have been in existence for over two decades. With the exponential rise in internet traffic, contributed by online video consumption, online shopping, and increased video conferencing due to COVID-19, CDNs are required more than ever before." %}
  {%- set featured_chapter_stats = {
      "stat1":"62.3%","label1":"Top 1,000 popular sites using a CDN",
      "stat2":"3x","label2":"Faster TLS negotiation with CDN at p90",
      "stat3":"42.5%","label3":"Domains using Brotli on CDN"
    }
  %}
{%- elif featured_chapter == "cms" %}
  {%- set featured_chapter_quote = "CMS platforms continue to grow and are becoming more ubiquitous year-over-year. They are essential for easily creating and consuming content on the internet, especially as more people and businesses establish an online presence." %}
  {%- set featured_chapter_stats = {
      "stat1":"46%","label1":"Websites are built using a CMS",
      "stat2":"2MB","label2":"Median CMS page weight among the top CMSs",
      "stat3":"5.7%","label3":"WebP usage in WordPress websites"
    }
  %}
{%- elif featured_chapter == "compression" %}
  {%- set featured_chapter_quote = "Using HTTP compression makes a website load faster and therefore guarantees a better user experience." %}
  {%- set featured_chapter_stats = {
      "stat1":"33%","label1":"Compressed responses which use Brotli",
      "stat2":"66%","label2":"Compressed responses which use Gzip",
      "stat3":"72%","label3":"Websites that pass the Lighthouse audit with maximum score on text compression"
    }
  %}
{%- elif featured_chapter == "css" %}
  {%- set featured_chapter_quote = "The 2021 Web Almanac offers deeper insight into how the use of CSS differs in the realm of what we all think we need versus what we actually see in production." %}
  {%- set featured_chapter_stats = {
      "stat1":"71%","label1":"The percentage of pages using Flexbox for some form of layout",
      "stat2":"3","label2":"The median number of images loaded via CSS",
      "stat3":"29%","label3":"The percentage of pages using custom properties."
    }
  %}
{%- elif featured_chapter == "ecommerce" %}
  {%- set featured_chapter_quote = "There was a measurable increase in the proportion of sites with ecommerce functionality during Q2 and Q3 of 2020. This growth rate has not been maintained through to 2021. In fact, the percentage of ecommerce sites decreased from 21.27% to 19.49% on mobile suggesting that ecommerce has not grown at the same pace as the wider web." %}
  {%- set featured_chapter_stats = {
      "stat1":"19.49%","label1":"Mobile sites identified as ecommerce sites",
      "stat2":"5.93%","label2":"Percentage of sites using WooCommerce, the most popular ecommerce platform",
      "stat3":"11%","label3":"The percentage of WooCommerce sites that have &#8220;good&#8221; Core Web Vitals experiences"
    }
  %}
{%- elif featured_chapter == "http" %}
  {%- set featured_chapter_quote = "Over 70% of requests are served over HTTP/2 or above, which suggests that HTTP/2 and HTTP/3 are well and truly the dominant protocol versions for the web." %}
  {%- set featured_chapter_stats = {
      "stat1":"25%","label1":"Decline in HTTP/1.1 requests between 2020 and 2021",
      "stat2":"82%","label2":"Top 1,000 sites that have HTTP/2 enabled",
      "stat3":"1.25%","label3":"Sites using HTTP/2 push"
    }
  %}
{%- elif featured_chapter == "jamstack" %}
  {%- set featured_chapter_quote = "Jamstack young and fast growing technology to build modern websites. That what people say and that&#8217;s proved by numbers." %}
  {%- set featured_chapter_stats = {
      "stat1":"1.1%","label1":"Jamstack websites adoption among web",
      "stat2":"9.5%","label2":"Median value of jQuery usage among Jamstack sites",
      "stat3":"1.7MB","label3":"Median value of resource wights among Jamstack sites"
    }
  %}
{%- elif featured_chapter == "javascript" %}
  {%- set featured_chapter_quote = "Features provided for improving the rendering time and resource loading time could be leveraged better to see the overall impact and get an even better experience with respect to the performance." %}
  {%- set featured_chapter_stats = {
      "stat1":"4","label1":"Median asynchronous requests made per mobile page.",
      "stat2":"45.6%","label2":"Images are the most requested content type on pages loaded by JavaScript.",
      "stat3":"2.7%","label3":"Percent of desktop pages using custom elements."
    }
  %}
{%- elif featured_chapter == "markup" %}
  {%- set featured_chapter_quote = "Be part of the people who increase adoption of new standards every year. Start with something new you&#8217;ve learned today, one of the many standards we&#8217;ve covered not only in this chapter but in the whole Web Almanac." %}
  {%- set featured_chapter_stats = {
      "stat1":"35.3%","label1":"ICO was finally dethroned as the most popular favicon format by PNG",
      "stat2":"98%","label2":"Pages have at least one <code>&lt;script&gt;</code> element in HTML",
      "stat3":"4,256","label3":"The most <code>&lt;form&gt;</code> elements found on a single page."
    }
  %}
{%- elif featured_chapter == "mobile-web" %}
  {%- set featured_chapter_quote = "In 2021, the perception of a distinct &#8220;mobile web&#8221; is outdated. Across multiple data sources, it seems that the mobile is one of many ways a user can interact with digital content." %}
  {%- set featured_chapter_stats = {
      "stat1":"18.4%","label1":"Mobile page loads using native lazy-loading",
      "stat2":"43.4%","label2":"Mobile page loads contain inappropriately sized images",
      "stat3":"45.0%","label3":"Of the top 1,000 mobile page loads prevent zooming"
    }
  %}
{%- elif featured_chapter == "page-weight" %}
  {%- set featured_chapter_quote = "It&#8217;s critically important to stop optimizing web pages for &dollar;1,200.00 smartphones with ultra-fast internet connections because the vast majority of internet users don&#8217;t live in that world, and the energy required to power that world is unsustainable." %}
  {%- set featured_chapter_stats = {
      "stat1":"1,923","label1":"The median number of mobile page bytes",
      "stat2":"877","label2":"The median number of mobile page image bytes",
      "stat3":"69","label3":"The median number of mobile page requests"
    }
  %}
{%- elif featured_chapter == "performance" %}
  {%- set featured_chapter_quote = "The more we can set up smart defaults for performance at the framework level, the better we can make the web while also make developers&#8217; jobs easier." %}
  {%- set featured_chapter_stats = {
      "stat1":"37%","label1":"Percent of top 1,000 websites passing Core Web Vitals",
      "stat2":"79%","label2":"Pages on desktop with an image as an LCP element",
      "stat3":"67 s","label3":"Longest total blocking time"
    }
  %}
{%- elif featured_chapter == "privacy" %}
  {%- set featured_chapter_quote = "Browsers are paving the way for better user privacy&colon; Firefox and Safari have already deployed Tracking Protection, while Chrome is proposing new privacy-protecting technologies that are discussed in the open and can be tested by website owners." %}
  {%- set featured_chapter_stats = {
      "stat1":"82.08%","label1":"Mobile websites that include at least one tracker",
      "stat2":"39.70%","label2":"Mobile websites that contain a privacy policy link",
      "stat3":"4.10%","label3":"Popular sites opting out of FLoC cohorts"
    }
  %}
{%- elif featured_chapter == "pwa" %}
  {%- set featured_chapter_quote = "The most popular sites are more prone to use features like service workers and advanced capabilities." %}
  {%- set featured_chapter_stats = {
      "stat1":"8.62%","label1":"Percentage of top 1,000 sites using service workers",
      "stat2":"57.88%","label2":"Percentage of PWAs using the service worker cache",
      "stat3":"32.19%","label3":"Percentage of mobile sites with service workers that use the Workbox library"
    }
  %}
{%- elif featured_chapter == "resource-hints" %}
  {%- set featured_chapter_quote = "Resource hints are akin to fine-tuning a race car&#8217;s engine. They would not turn a slow engine into a fast one, and too many adjustments could break it. Yet, some small tweaks here and there would allow you to maximize it." %}
  {%- set featured_chapter_stats = {
      "stat1":"44.3%","label1":"Adoption of preload in the top 1,000 websites",
      "stat2":"21.5%","label2":"Unused preload hints within the first 3 seconds",
      "stat3":"423%","label3":"Growth in adoption of native lazy loading on images"
    }
  %}
{%- elif featured_chapter == "security" %}
  {%- set featured_chapter_quote = "Our analysis clearly shows that the situation of web security concerning the provider side has improved compared to previous years. However, our observation also indicates that the web community should do more to ensure better security." %}
  {%- set featured_chapter_stats = {
      "stat1":"91.1%","label1":"Requests that use HTTPS on mobile",
      "stat2":"22.2%","label2":"Percentage of top 1000 sites that use CSP",
      "stat3":"10.7%","label3":"Websites on desktop that use a mechanism to fight malicious bots"
    }
  %}
{%- elif featured_chapter == "seo" %}
  {%- set featured_chapter_quote = "SEO is more popular than ever and has seen huge growth over the last couple years as companies sought new ways to reach customers. SEO&#8217;s popularity has far outpaced other digital channels." %}
  {%- set featured_chapter_stats = {
      "stat1":"16.5%","label1":"Websites that don&#8217;t have a robots.txt file",
      "stat2":"41.5%","label2":"Mobile pages without a canonical tag",
      "stat3":"67%","label3":"Mobile websites failing Core Web Vitals checks"
    }
  %}
{%- elif featured_chapter == "structured-data" %}
  {%- set featured_chapter_quote = "Describing our content using structured data enables machines to treat web pages and websites as databases. That creates a wealth of possibilities for business, technology, and society." %}
  {%- set featured_chapter_stats = {
      "stat1":"33.53%","label1":"Pages which contain JSON-LD markup",
      "stat2":"8.9%","label2":"Pages which include <code>WebSite</code> markup in JSON-LD",
      "stat3":"18","label3":"The greatest number of nested relationships between entities"
    }
  %}
{%- elif featured_chapter == "third-parties" %}
  {%- set featured_chapter_quote = "Third parties are integral to the web. In many ways they are the web—without the prevalence of third-parties websites would be harder to build, and be less feature rich." %}
  {%- set featured_chapter_stats = {
      "stat1":"94.4%","label1":"Sites using third parties",
      "stat2":"1,626 ms","label2":"YouTube embed main-thread blocking time",
      "stat3":"45.9%","label3":"Requests which are 3rd party"
    }
  %}
{%- elif featured_chapter == "webassembly" %}
  {%- set featured_chapter_quote = "WebAssembly [&#8230;] integrates so well into the web ecosystem, that many website owners might not even know they already use WebAssembly—to them it looks like any other 3rd-party JavaScript dependency." %}
  {%- set featured_chapter_stats = {
      "stat1":"44 MB","label1":"Download size of the largest WebAssembly response in the dataset.",
      "stat2":"40.2%","label2":"Percent of uncompressed WebAssembly responses on mobile.",
      "stat3":"55.2%","label3":"Percent of WebAssembly files loaded from a 3rd-party origin on desktop."
    }
  %}
{% endif %}`;
}
