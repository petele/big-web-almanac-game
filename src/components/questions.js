import questionsUnplayed from '../data/answerKey.json';

const questionsPlayed = [];

/**
 * Generates a random number between the min and max provided.
 *
 * @param {number} min Minimum number in random range.
 * @param {number} max Maximum number in random range.
 * @returns {number}
 */
function randomNumBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Gets a random question from the list of questions
 *
 * @returns {object}
 */
export function getNewQuestion() {
  const numQuestionsRemaining = questionsUnplayed.length;
  if (numQuestionsRemaining === 0) {
    return null;
  }
  const questionNumber = randomNumBetween(0, numQuestionsRemaining - 1);
  const question = questionsUnplayed[questionNumber];
  questionsUnplayed.splice(questionNumber, 1);
  return question;
}

/**
 * Saves an answered question to the question list.
 *
 * @param {object} item Save an answered question to the list
 */
export function savePlayedQuestion(item) {
  questionsPlayed.push(item);
}
