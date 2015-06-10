// ==UserScript==
// @name        Cyber to Wizard
// @namespace   com.cyber-to-wizard
// @description Replace all instances of "cyber" with "wizard"
// @include     *
// @version     1.1
// @grant       none
// ==/UserScript==

var target = document.documentElement;
var config = { childList: true, characterData: true, subtree: true, attributes: true };

function dontParse(node) {
	return node.nodeName.toUpperCase() === "TEXTAREA" || node.contentEditable === "true";
}

var observer = new MutationObserver(function(mutations) {
	observer.disconnect();
	setTimeout(function() {
		mutations.forEach(function(mutation) {
			var parent = mutation.target;
			while (parent != null) {
				if (dontParse(parent)) {
					return;
				}
				parent = parent.parentElement;
			}
			walk(mutation.target);
		});
		observer.observe(target, config);
	}, 100);
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

			if (dontParse(node)) {
				return;
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
	var val = textNode.nodeValue;

	if (/\bcyber/i.test(val)) {
		textNode.nodeValue = cyberToWizard(val);
	}
}

function handleTitle(node) {
	var val = node.title;

	if (/\bcyber/i.test(val)) {
		node.title = cyberToWizard(val);
	}
}
