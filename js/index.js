let message = document.getElementById("input-text");
let processed = document.getElementById("output-text");
let encryptButton = document.getElementById("encrypt");
let decryptButton = document.getElementById("decrypt");
let copyButton = document.getElementById("copy");
let clearButton = document.getElementById("clear");
let textcopied = document.getElementById("textcopied");
let textnotfound = document.getElementById("textnotfound");
let rulesadvice = document.getElementById("rulesadvice");



function encrypt(message) {
	let text = message.split("");

	for (let i = 0; i < text.length; i++) {
		switch (text[i]) {
			case "a": text[i] = "ai"; break;
			case "e": text[i] = "enter"; break;
			case "i": text[i] = "imes"; break;
			case "o": text[i] = "ober"; break;
			case "u": text[i] = "ufat"; break;
			default: break;
		};
	};

	let encrypted = text.join("");

	return encrypted;
};

function decrypt(message) {
	const regexp = /(?<=ai|enter|imes|ober|ufat)|(?=ai|enter|imes|ober|ufat)/

	let text = message.split(regexp);

	for (let i = 0; i < text.length; i++) {
		switch (text[i]) {
			case "ai": text[i] = "a"; break;
			case "enter": text[i] = "e"; break;
			case "imes": text[i] = "i"; break;
			case "ober": text[i] = "o"; break;
			case "ufat": text[i] = "u"; break;
			default: break;
		};
	};

	let decrypted = text.join("");
	return decrypted;
};

function verify(text, mode) {
	let forbiddenChars = /[^a-z0-9\s\n¡!¿?.,:<>]|^[\s\n]+$/g;
	let match = text.search(forbiddenChars) >= 0;
	let error = match ? true : false;

	if (error) {
		rulesadvice.style.visibility = "visible";
		return;
	}else{
		rulesadvice.style.visibility = "hidden";
	};
	

	let result;
	switch (mode) {
		case "encrypt": result = encrypt(text); break;
		case "decrypt": result = decrypt(text); break;
		default: break;
	};
	textcopied.style.visibility = "hidden";
	processed.value = result;
	textnotfound.style.display = result ? "none" : "block";
	copyButton.style.display = result ? "inline" : "none" ;
};

encryptButton.onclick = () => {
	verify(message.value, "encrypt");
};

decryptButton.onclick = () => {
	verify(message.value, "decrypt");
};

copyButton.onclick = () => {
	navigator.clipboard.writeText(processed.value).then(() => {
		textcopied.style.visibility = "visible";;
	});
};
