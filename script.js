let documentDB = [],
	id = 1;
let invertedDB = {};
let results = document.getElementById('results');

//instructions for user
instructions = () => {
	alert('1. First fill in documents in the textarea and there should be two new lines between each document.');
	alert('2. Then click on Generate Index for constructing the inverted index');
	alert('3. Input your search word and click on search. You can also clear all existing documents with "Clear Documents" as well');
}

//adding the documents by the user to the documentDB
addDoc = () => {
	//taking the input of user in the main textarea
	let docContent = document.getElementById('textarea').value;
	let displayDocuments = document.getElementById('displayDocuments');

	//splitting by two new lines into a document array
	let docArray = docContent.split('\n\n');

	//assigning each document in the document array an ID as well as the content in the form of an object
	for (var i = 0; i <= docArray.length - 1; i++) {
		let doc = {
			'id': id,
			'content': docArray[i]
		}
		//pushing to main documentDB
		documentDB.push(doc);
		id = id + 1
	}
	//displaying the docs input by the user
	displayDocuments.innerHTML = '';
	for (var i = 0; i < documentDB.length; i++) {
		displayDocuments.innerHTML += '[<strong style="color: black;">' + documentDB[i].id + '</strong>]&nbsp&nbsp' + documentDB[i].content + '<br>'
	}
}

//clearing and resetting the documentDB and Inverted Index
clearDocs = () => {
	id = 1;
	displayDocuments.innerHTML = '';
	invertedDB = {};
	documentDB.length = 0;
	results.innerHTML = '';
}

//generating the inverted index
generateInvertedIndex = () => {
	//traversing through every document
	for (var i = 0; i < documentDB.length; i++) {
		let words = documentDB[i].content.split(" ");
		//taking one document and traversing through every word in that document
		for (var j = 0; j < words.length; j++) {
			//removing punctuations and converting to lowercase
			let tempWord = words[j].replace(/[^\w\s]|_/g, "")
								   .replace(/\s+/g, " ")
								   .toLowerCase();
			//removing whitespaces
			tempWord = tempWord.trim();
			//if index is not created for the word, then create and push document ID
			if (invertedDB[tempWord] === undefined) {
				invertedDB[tempWord] = [];
				invertedDB[tempWord].push(i);
			} else {
				//if created then append document ID
				invertedDB[tempWord].push(i);
			}


		}
		//console.log(words);
	}
	alert("Inverted Index Generated. You may now search your desired word!");
	console.log(invertedDB);
}

//searching the invertedDB for the word input by the user
searchDocs = () => {
	let userWord = document.getElementById('search_word').value;
	//removing any extra space and converting to lowercase for user input 
	userWord = userWord.replace(/[^\w\s]|_/g, "")
					   .replace(/\s+/g, " ")
					   .toLowerCase();
	userWord = userWord.trim();

	let paraArray = invertedDB[userWord];
	//if word is not present in the documents provided
	if (paraArray === undefined) {
		results.innerHTML = 'Word not found!'
	} else {
		//removing duplicates(multiple userWord present in one document)
		paraArray = paraArray.filter((item, index) => paraArray.indexOf(item) === index)
		//correcting index
		paraArray = paraArray.map((item) => {
			return item + 1;
		})
		results.innerHTML = '';

		//if less than 10 then display all results
		if (paraArray.length <= 10) {
			paraArray.forEach((item) => {
				results.innerHTML += '<li style="color:#ecf0f1">' + item + '</li>'
			});
		} else {
			//if more than 10 display top 10 results
			for (var i = 0; i < 10; i++) {
				results.innerHTML += '<li style="color:#ecf0f1">' + paraArray[i] + '</li>';
			}
		}
	}

	console.log(paraArray);
}