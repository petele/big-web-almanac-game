const About = () => {

  document.title = 'About';

  return (
    <div class="container">
      <h1>The Big Web Almanac Quiz</h1>
      <p>The Big Web Almanac Quiz is a <a href='https://twitter.com/ChromiumDev'>Chrome DevRel</a> hack week project built by <a href='https://twitter.com/rick_viscomi'>Rick Viscomi</a>, <a href='https://twitter.com/petele'>Pete LePage</a>, and <a href='https://twitter.com/Una'>Una Kravets</a>. All of the data is pulled from the 2021 HTTP Archive <a href='https://almanac.httparchive.org/en/2021/'>Web Almanac</a>.</p>
      
      <h2>Gameplay</h2>
      <p>The object of the game is to answer as many questions as you can get right in 60 seconds. You want to maximize for both speed and accuracy. To submit an answer, either click on it with a pointer device or use your keyboard. Once an answer is selected, the game will automatically advance. Good luck!</p>

      <h2>Keyboard navigation</h2>
      <p>You can use your keyboard to answer questions with the <code>tab</code> and <code>enter</code> keys.</p>
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
