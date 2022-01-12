const About = () => {

  document.title = 'About';

  return (
    <div class="container">
      <h1>The Big Web Almanac Quiz</h1>
      <p>The Big Web Almanac Quiz is a <a href='https://twitter.com/ChromiumDev'>Chrome DevRel</a> hackathon project built by <a href='https://twitter.com/rick_viscomi'>Rick Viscomi</a>, <a href='https://twitter.com/petele'>Pete LePage</a>, and <a href='https://twitter.com/Una'>Una Kravets</a>. All of the data is pulled from the 2021 <a href='https://almanac.httparchive.org/en/2021/'>Web Almanac</a>, which uses data directly sourced from the <a href="https://httparchive.org/">HTTP Archive</a>. This is a hackathon project. Don't @ us.</p>

      <h2>Gameplay</h2>
      <p>The object of the game is to answer as many questions as you can get right in 60 seconds. You want to maximize for both speed and accuracy. To submit an answer, either click on it with a pointer device or use your keyboard. Once an answer is selected, the game will automatically advance. Good luck!</p>

      <h2>Keyboard navigation</h2>
      <p>
        You can use your keyboard to answer questions with the <code>tab</code>
        and <code>enter</code> keys. You can also use the <code>1</code>,
        <code>2</code>, <code>3</code>, and <code>4</code> keys to select an
        answer, starting from top left, moving right to bottom right.
      </p>
      <hr/>
      <div class="about-text">
        Build date: <span>{__BUILD_DATE__}</span>
      </div>
      <div class="about-text">
        Build type: <span>{__BUILD_TYPE__}</span>
      </div>
    </div>
  );
};

export default About;
