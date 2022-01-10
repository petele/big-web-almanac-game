import questionsUnplayed from '../data/answerKey.json';
import { getChapterName, getChapterUrl } from '../util/almanac.js';

const NUM_CANDIDATE_ANSWERS = 3;
const questionsPlayed = [];

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
  const questionNumber = Math.floor(generateRandomNumberBetween(0, numQuestionsRemaining));
  const question = questionsUnplayed[questionNumber];
  questionsUnplayed.splice(questionNumber, 1);
  return initQuestion(question);
}

/**
 * Saves an answered question to the question list.
 *
 * @param {object} item Save an answered question to the list
 */
export function savePlayedQuestion(item) {
  questionsPlayed.push(item);
}

function initQuestion(question) {
  const chapterId = question['Chapter'];
  return {
    question: question['Clue'],
    answer: question['Answer'],
    options: getShuffledAnswers(question),
    chapterName: getChapterName(chapterId),
    chapterUrl: getChapterUrl(chapterId) 
  }
}

function getShuffledAnswers(question) {
  const answers = generateCandidateAnswers(question);
  answers.push(question['Answer']);
  shuffleCandidateAnswers(answers);
  return answers;
}

// Get a list of incorrect candidate answers.
function generateCandidateAnswers(question) {
  // If there are predefined candidates, use those.
  if (question['Alternate 1']) {
    return Object.entries(question).filter(([name, value]) => {
      return name.startsWith('Alternate');
    }).map(([name, value]) => value);
  }

  // Randomly generate candidates.
  const candidateAnswers = new Array(NUM_CANDIDATE_ANSWERS);
  candidateAnswers.fill(null);

  const min = question['Min'];
  const max = question['Max'];
  const precision = question['Units of Precision'];
  const suffix = question['Suffix'];

  return candidateAnswers.map(_ => generateRandomValue(min, max, precision, suffix));
}

// Randomizes the order of an array in place.
function shuffleCandidateAnswers(candidateAnswers) {
  for (let i = 0, n = candidateAnswers.length; i < n; i++) {
    const randomIndex = Math.floor(generateRandomNumberBetween(i, n));
    const temp = candidateAnswers[randomIndex];
    candidateAnswers[randomIndex] = candidateAnswers[i];
    candidateAnswers[i] = temp;
  }
}

// Generate a random number between `min` and `max` with `precision` digits of precision, labelled by `suffix`.
// Use en-US thousands formatting for values similar to "1,000".
//
// Example:
//     // '15.80%'
//     generateRandomValue(0, 100, 2, '%');
function generateRandomValue(min, max, precision, suffix) {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  });
  const randomValue = generateRandomNumberBetween(min, max);
  const formattedRandomValue = numberFormatter.format(randomValue);
  return `${formattedRandomValue}${suffix}`;
}

/**
 * Generates a random number between the min (inclusive) and max (exclusive) provided.
 *
 * @param {number} min Minimum number in random range.
 * @param {number} max Maximum number in random range.
 * @returns {number}
 */
function generateRandomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
