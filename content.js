chrome.commands.onCommand.addListener(function(command) {
    if (command === 'highlighted-text') {
      chrome.tabs.executeScript({
        code: 'var selectedText = window.getSelection().toString(); if (selectedText !== "") { alert("You highlighted the following text: " + selectedText); }'
      });
    }
  });
  