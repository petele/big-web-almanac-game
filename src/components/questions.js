import questionsUnplayed from '../data/answerKey.json';
import { getChapterName, getChapterUrl } from '../util/almanac.js';

const NUM_CANDIDATE_ANSWERS = 3;

export default class Questions {

  constructor() {
    this.questionBank = questionsUnplayed;
    this.questionsPlayed = [];

    this.initQuestions();
  }

  initQuestions() {
    const optChapter = getChapter();
    if (optChapter) {
      // Filter questions for only the requested chapter.
      const filteredQuestions = this.questionBank.filter(question => {
        return question['Chapter'] == optChapter;
      });
      // Ensure we're not filtering by a bogus chapter.
      if (filteredQuestions.length) {
        this.questionBank = filteredQuestions;
      }
    }
  }

  /**
   * Gets a random question from the list of questions
   *
   * @returns {object}
   */
  getNewQuestion() {
    const numQuestionsRemaining = this.questionBank.length;
    if (numQuestionsRemaining === 0) {
      return null;
    }
    const questionNumber = Math.floor(generateRandomNumberBetween(0, numQuestionsRemaining));
    const question = this.questionBank[questionNumber];
    this.questionBank.splice(questionNumber, 1);
    return initQuestion(question);
  }

  /**
   * Saves an answered question to the question list.
   *
   * @param {object} question Save an answered question to the list
   */
  savePlayedQuestion(question) {
    this.questionsPlayed.push(question);
  }

}

function getChapter() {
  const url = new URL(location.href);
  return url.searchParams.get('chapter');
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
  const precision = question['Digits of Precision'];
  const suffix = question['Suffix'];

  return candidateAnswers.map(_ => {
    let value;
    do {
      value = generateRandomValue(min, max, precision, suffix);
    } while (value == question['Answer']);
    return value;
  });
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
