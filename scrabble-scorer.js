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
   
   console.log("\n**********************************\nLet's play some awesome Scrabble!");
   let word = input.question("Enter a word to score: ");
   console.log("**********************************\n");
   
   return word
};

let newPointStructure = transform(oldPointStructure); /*{
   'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1,
   'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8,
   'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1,
   'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1,
   'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4,
   'Z': 10
};*/

/*console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure.a);
console.log("letter j: ", newPointStructure.j);
console.log("letter z: ", newPointStructure["z"]);
console.log([Object.keys(newPointStructure)[1]])*/

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
   let vowels = ['A','E','I','O','U'];
   
   for (letter in word) {
      if (vowels.includes(word[letter])) // Didn't work >> (letter in vowels)
         {(score += 3);}
      else 
         {(score += 1);}
   };
   return score;

}

   //let scrabbleScorer = (word) => {oldScrabbleScorer(word)}; // Uses the oldScrabbleScorer() function to determine the score for a given word.
   
let scrabbleScorer = function(word) {
   //let score = oldScrabbleScorer(word);
   //return score};
   
   let score = 0;
   let newPointStructure = transform(oldPointStructure);
   word = word.toLowerCase();
   

   for (let num_letter in word) { 

      score += newPointStructure[word[num_letter]];
      
      //console.log('num_letter ', num_letter)
      //console.log('word[num_letter] ', word[num_letter])
      //console.log(newPointStructure[word[num_letter]]);
      //console.log('score', score);
      //console.log();
   }

   return score
}

/* Once you’ve written these scoring functions, organize all three of the scoring options into an array. Your program will use the scoringAlgorithms array to retrieve information about the three scoring algorithms and convey that information to the user.*/
const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
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

// Write the rest of the transform() function. It will need to take an object as a parameter - specifically the oldPointStructure object. Calling transform(oldPointStructure) will return an object with lowercase letters as keys. The value for each key will be the points assigned to that letter.

function transform(oldPointStructure) {

   let myPointStructure = new Object();
   
   for (key in oldPointStructure) {
      
      for (letter in oldPointStructure[key]) {

      myPointStructure[(oldPointStructure[key][letter]).toLowerCase()] = Number(key);

       //console.log('key', key)
       //console.log('letter',letter)
       //console.log(oldPointStructure[key][letter])
       //console.log()
      }
   }
   
   //let sort_myPointStructure = Object.keys(myPointStructure).sort();
   //return sort_myPointStructure       
   
   return myPointStructure  
};

function runProgram() {
   
   let word = initialPrompt();
   let score = scorerPrompt().scorerFunction(word);
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
