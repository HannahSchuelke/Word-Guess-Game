var mnHangman = {

    possibilities: {
        "cherry": {
            hint1: "This sculpture was erected in 1985 by artist Claes Oldenburg and his wife, Coosje van Bruggen.",
            hint2: "Was vandalized in 2012 as part of a “Kony 2012” protest.",
            hint3: "Resides in the largest urban sculpture park in the world.",
        },
        "walker": {
            hint1: "In 1879, lumber baron Thomas Barlow ****** started this museum by building a room out of his home.",
            hint2: "The museum’s focus on modern art began in the 1940s.",
            hint3: "Is free to the public on Thursday evenings.",
        },
        "mia": {
            hint1: "Designed by the New York architectural firm, the original building opened its doors in 1915.",
            hint2: "Mission: The *** enriches the community by collecting, preserving, and making accessible outstanding works of art from the world’s diverse cultures.",
            hint3: "Is a free museum, operated for the benefit of the general public.",
        },
        "umn": {
            hint1: "This place of learning invented seatbelts, the pacemaker, and the honeycrisp apple.",
            hint2: "This was a university before Minnesota was a state",
            hint3: "The flagship campus in the Twin Cities is one of the most prestigious public research universities in the nation.",
        },
        "prince": {
            hint1: "This artist grew up in North Minneapolis and the house still stands.",
            hint2: "This artist can be seen in a mural downtown, on 5th & Hennepin Ave South.",
            hint3: "His estate and production complex is named Paisley Park.",
        },
        "dylan": {
            hint1: "This artist became involved in the Dinkytown folk music circuit after he moved to Minneapolis for school.",
            hint2: "His most popular work became anthems for the Civil Rights Movement and anti-war movement of the 1960s. ",
            hint3: "He can be seen in a mural downtown, on 5th & Hennepin Ave South.",
        },
        "calhoun": {
            hint1: "In 2018, this lake's name changed to Bde Maka Ska.",
            hint2: "From 1829-1839, it was the site of the Bdewákhathuŋwaŋ Dakota agricultural village known as Ḣeyate Otuŋwe.",
            hint3: "This is the largest lake in Minneapolis.",
        },
        "guthrie": {
            hint1: "This theater is located off of the Mississippi River.",
            hint2: "The theater opened on May 7, 1963, with a production of Hamlet directed by the theater’s founder.",
            hint3: "The building features an 178-foot cantilevered bridge, which is open and free to the public.",
        },

        possibilityUp: null,
        lettersOfTheWord: [],
        matchedLetters: [],
        guessedLetters: [],
        guessesLeft: 0,
        totalGuesses: 0,
        letterGuessed: null,
        wins: 0,

// I think all parts are here, but I couldn't get my functions to work. 
// I also tried to give hints in text vs in music or picture, but that didn't work. Sorry for my miss. 

        startGame: function () {
            var objKeys = Object.keys(this.possibilities);
            this.possibilityUp = objKeys[Math.floor(Math.random() * objKeys.length)];
            console.log(this.possibilityUp)
            this.lettersOfTheWord = this.possibilityUp.split("");
            this.setNewView();
            this.updateGuesses();
        },

        updatePage: function (letter) {
            if (this.guessesLeft === 0) {
                this.restartGame();
            }
            else {
                this.updateGuesses(letter)
                this.updateMatches(letter);
                this.setNewView();
                if (this.howManyWins() === true) {
                    this.restartGame();
                }
            }

        },

        updateGuesses: function (letter) {
            if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
                this.guessedLetters.push(letter);
                this.guessesLeft--;
                document.querySelector("#remainingGuesses").innerText = this.guessesLeft;
                document.querySelector("#guessedLetters").innerText =
                    this.guessedLetters.join(", ");
            }
        },

        updateGuesses: function () {
            this.totalGuesses = this.lettersOfTheWord.length + 5;
            this.guessesLeft = this.totalGuesses;
            document.querySelector("#remainingGuesses").innerText = this.guessesLeft;
        },

        updateMatches: function (letter) {
            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                    this.matchedLetters.push(letter);
                }
            }
        },

        setNewView: function () {
            var wordView = "";

            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
                    wordView += this.lettersOfTheWord[i];
                }
                else {
                    wordView += "&nbsp;_&nbsp;";
                }
            }

            document.querySelector("#wordCurrent").innerText = wordView;
        },

        restartGame: function () {
            document.querySelector("#guessedLetters").innerText = "";
            this.possibilityUp = null;
            this.lettersOfTheWord = [];
            this.matchedLetters = [];
            this.guessedLetters = [];
            this.guessesLeft = 0;
            this.totalGuesses = 0;
            this.letterGuessed = null;
            this.startGame();
            this.setNewView();
        },

        howManyWins: function () {
            var win;

            if (this.matchedLetters.length === 0) {
                win = false;
            }
            else {
                win = true;
            }
            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
                    win = false;
                }
            }
            if (win)
                this.wins = this.wins + 1;
            display.text = "You Won!!!"

            return true;
        }
    }
};

mnHangman.startGame();

document.onkeyup = function (event) {
    mnHangman.updatePage(mnHangman.letterGuessed);
};


