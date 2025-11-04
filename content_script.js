function replaceText(node) {
  const wordRegex = /(?:work|job|employment|employed)/gi;
  const parent = node.parentNode;
  const textContent = node.textContent;
  let lastIndex = 0;

  if (textContent && wordRegex.test(textContent)) {
    const fragment = document.createDocumentFragment();
    wordRegex.lastIndex = 0;

    let match;
    while ((match = wordRegex.exec(textContent)) !== null) {
      const textNode = document.createTextNode(
        textContent.slice(lastIndex, match.index),
      );
      fragment.appendChild(textNode);

      const matchedWord = match[0];
      const censoredWord = matchedWord.replace(/o/gi, "*");
      const censoredNode = document.createTextNode(censoredWord);
      fragment.appendChild(censoredNode);

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < textContent.length) {
      const remainingText = document.createTextNode(
        textContent.slice(lastIndex),
      );
      fragment.appendChild(remainingText);
    }
    parent.replaceChild(fragment, node);
  }
}

function walk(node) {
  let child, next;
  if (node.nodeType === 1 && node.nodeName.toLowerCase() !== "script") {
    for (child = node.firstChild; child; child = next) {
      next = child.nextSibling;
      walk(child);
    }
  } else if (node.nodeType === 3) {
    replaceText(node);
  }
}

walk(document.body);
