document.addEventListener('mouseup', function() {
    var selectedText = window.getSelection().toString();
    if (selectedText !== '') {
      alert(selectedText);
    }
  });
  