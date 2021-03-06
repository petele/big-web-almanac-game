// AppsScript file to help generate metadata for the answer key spreadsheet.
// https://docs.google.com/spreadsheets/d/1opqzCXnnWQlWPkA174i7LCz3z6bVEgAc2XRvu4HCE4c/edit?usp=sharing

// Generated by:
//     config.outline.flatMap(s => s.chapters.flatMap(c => c.slug))
// From: https://github.com/HTTPArchive/almanac.httparchive.org/blob/main/src/config/2021.json
const chapterList = [
  "css",
  "javascript",
  "markup",
  "structured-data",
  "media",
  "webassembly",
  "third-parties",
  "seo",
  "accessibility",
  "performance",
  "privacy",
  "security",
  "mobile-web",
  "capabilities",
  "pwa",
  "cms",
  "ecommerce",
  "jamstack",
  "page-weight",
  "resource-hints",
  "cdn",
  "compression",
  "caching",
  "http"
];

/**
 * Gets the corresponding chapter number from its ID.
 * 
 * @param {string} chapter The ID of the chapter.
 * @return The index of the chapter in the table of contents.
 * @customfunction
 */
function GET_CHAPTER_NUMBER(chapter) {
  return chapterList.indexOf(chapter) + 1;
}
