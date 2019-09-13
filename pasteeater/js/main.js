


var delimiter = "/";


document.getElementById('convert-button').onclick = function() {

  var inputText = document.getElementById('input').value;
  var formattedText = doFormat(inputText);

  document.getElementById('output').value = formattedText;
  
   /* Get the text field */
   var copyText = document.getElementById('output');

   /* Select the text field */
   copyText.select();
 
   /* Copy the text inside the text field */
   document.execCommand("copy");
 
   UIkit.notification({
    message: '<span uk-icon=\'icon: check\'></span>  Text copied to clipboard',
    status: 'success',
    pos: 'top-center',
    timeout: 2000
  });
}



function doFormat(inputText) {
  
  var parts = inputText.split(/\r?\n/);
  var newParts = [];
  for (var part of parts) {
    var spaceParts = part.split(' ');
    var updatedParts = [];
    for (var spacePart of spaceParts) {
      var newSpacePart = spacePart.charAt(0).toUpperCase() + spacePart.slice(1).toLowerCase();
      newSpacePart = newSpacePart.trim();
      updatedParts.push(newSpacePart);
    }
    var newPart = updatedParts.join(' ').trim();
    newParts.push(newPart);
  }
  console.log(newParts);
  return newParts.join(delimiter);
}




document.getElementById('reset-button').onclick = function() {

  document.getElementById('input').value = '';
  document.getElementById('output').value = '';
  document.getElementById("input").focus();
}