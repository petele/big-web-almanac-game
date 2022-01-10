const NUM_CANDIDATE_ANSWERS = 3;

// Get a list of incorrect candidate answers.
export function generateCandidateAnswers(question) {
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
export function shuffleCandidateAnswers(candidateAnswers) {
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

function generateRandomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}