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
    const questionNumber = Math.floor(generateRandomValue(0, numQuestionsRemaining));
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
  const clue = question['Clue'];
  const precision = question['Digits of Precision'];
  const suffix = question['Suffix'];

  let answer = question['Answer'];
  const shouldFormatAnswer = question['Alternate 1'] == '';
  if (shouldFormatAnswer) {
    answer = formatValue(answer, precision, suffix);
  }

  return {
    question: clue,
    answer: answer,
    options: getShuffledAnswers(question),
    chapterName: getChapterName(chapterId),
    chapterUrl: getChapterUrl(chapterId) 
  }
}

function getShuffledAnswers(question) {
  const answers = generateCandidateAnswers(question);
  shuffleCandidateAnswers(answers);
  return answers;
}

// Get a list of incorrect candidate answers.
function generateCandidateAnswers(question) {
  // If there are predefined candidates, use those.
  if (question['Alternate 1'] != '') {
    return Object.entries(question).filter(([name, value]) => {
      return name.startsWith('Alternate');
    }).map(([name, value]) => value).concat([question['Answer']]);
  }

  // Randomly generate candidates.
  let value = parseFloat(question['Answer'], 10);
  const candidateAnswers = [value];
  const min = question['Min'];
  const max = question['Max'];
  const precision = question['Digits of Precision'];
  const suffix = question['Suffix'];

  while (candidateAnswers.length <= NUM_CANDIDATE_ANSWERS) {
    value = generateRandomValue(min, max);

    if (isTooClose(min, max, value, candidateAnswers)) {
      // Discard the random value if it's too close to the other candidates.
      continue;
    }

    candidateAnswers.push(value);
  }

  return candidateAnswers.map(value => formatValue(value, precision, suffix));
}

// Avoid giving two almost-identical options, like 33% and 34%.
function isTooClose(min, max, value, answers) {
  // No two values should be within 10% of the candidate range.
  const tooClose = 0.1;
  const valueBuffer = tooClose * (max - min)
  return answers.some(answer => {
    return Math.abs(parseFloat(value, 10) - parseFloat(answer, 10)) <= valueBuffer;
  });
}

// Randomizes the order of an array in place.
function shuffleCandidateAnswers(candidateAnswers) {
  for (let i = 0, n = candidateAnswers.length; i < n; i++) {
    const randomIndex = Math.floor(generateRandomValue(i, n));
    const temp = candidateAnswers[randomIndex];
    candidateAnswers[randomIndex] = candidateAnswers[i];
    candidateAnswers[i] = temp;
  }
}

// Generate a random number between `min` and `max`.
function generateRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

function formatValue(value, precision, suffix) {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  });
  const formattedValue = numberFormatter.format(value);
  return `${formattedValue}${suffix}`;
}
