// ==UserScript==
// @name        Cyber to Wizard
// @namespace   com.cyber-to-wizard
// @description Replace all instances of "cyber" with "wizard"
// @include     *
// @version     1.0
// @grant       none
// ==/UserScript==

var target = document.documentElement;
var config = { childList: true, characterData: true, subtree: true, attributes: true };

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		observer.disconnect()
		walk(mutation.target);
		observer.observe(target, config);
	});
});

walk(target);

observer.observe(target, config);

function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch (node.nodeType) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment\
			if (node.title) {
				handleTitle(node);
			}

			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function cyberToWizard(text) {
	var w = text;

	w = w.replace(/\bCyber/g, "Wizard");
	w = w.replace(/\bcyber/g, "wizard");
	w = w.replace(/\bCYBER/g, "WIZARD");

	return w;
}

function handleText(textNode) {
	textNode.nodeValue = cyberToWizard(textNode.nodeValue);
}

function handleTitle(node) {
	node.title = cyberToWizard(node.title);
}
