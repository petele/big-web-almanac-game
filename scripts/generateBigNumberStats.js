// Generates a CSV of all big-number stats from a Web Almanac chapter page.

const bigNumberStats = Array.from(document.querySelectorAll('.big-number')).map(e => {
  const parent = e.parentNode.parentNode;
  const figCaption = Array.from(parent.querySelector('figcaption').childNodes);
  return {
    "Chapter": location.pathname.split('/').pop(),
    "Clue": figCaption.slice(figCaption.findIndex(i => i.nodeName == 'A') + 1).map(i => i.textContent.trim()).join(' '),
    "Answer": e.innerText,
  };
}).map(i => `"${i.Chapter}","${i.Clue}","${i.Answer}"`).join('\n');
console.log(bigNumberStats);
copy(bigNumberStats);
