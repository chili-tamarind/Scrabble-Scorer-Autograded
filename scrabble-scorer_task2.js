// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

// https://github.com/LaunchCodeEducation/Scrabble-Scorer-Autograded

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

/*Use the oldScrabbleScorer() function provided to score the word provided by the user. Print the result to the console.*/

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   
	for (let i = 0; i < word.length; i++) {

   for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
      letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

   }
}
console.log(letterPoints)
return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   
   console.log("**********************************\nLet's play some awesome Scrabble!\n");
   let word = input.question("Enter a word to score: ");
   console.log("**********************************");
   
   return word
};


let newPointStructure;

// Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.
let simpleScorer = function(word) {   
   
   word = word.toUpperCase();
   let score = 0;
   
   for (letter in word) {score++};
   return score;
}

// Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.
let vowelBonusScorer = function(word) {   
   
   word = word.toUpperCase();
   let score = 0;
   
   for (letter in word) {
      if (letter in ['a','e','i','o','u'])
         {(score += 3);}
      else 
         {(score += 1);}
   };
   return score;
}

let scrabbleScorer = function() {oldScrabbleScorer(word)}; //>>>>> Doesn't work

/* Once you’ve written these scoring functions, organize all three of the scoring options into an array. Your program will use the scoringAlgorithms array to retrieve information about the three scoring algorithms and convey that information to the user.*/
const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scoringFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scoringFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scoringFunction: scrabbleScorer
   }
];

//Simple scoring
//console.log("algorithm name: ", scoringAlgorithms[0].name);
//console.log("scorerFunction result: ", scoringAlgorithms[0].scorerFunction("JavaScript"));

// scorerPrompt() should return the object the user has selected.
function scorerPrompt() {
   
   console.log("\nSelect your scorer")

   let my_scorers = [0,1,2];
   let my_scorer_num = 3;

   // Print scorer descriptions
   for (i = 0; i < 3; i++) {
      console.log(`${i} \t"${scoringAlgorithms[i].name}" \t${scoringAlgorithms[i].description}`)
   }

   //console.log(my_scorer)
   while (!my_scorers.includes(my_scorer_num)) { // Invalid syntax: my_scorer_num !== 0||1||2
      my_scorer_num = Number(input.question("\nWhich scoring algorithm would you like to use? \nEnter 0, 1, or 2: "));
      
   }
   console.log("**********************************\n");
   return my_scorer_num = scoringAlgorithms[my_scorer_num];
}

function transform() {};

function runProgram() {
   
   let word = initialPrompt();
   let score = scorerPrompt().scoringFunction(word);
   console.log(`Score for '${word}': ${score}`);

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
