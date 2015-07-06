$(document).ready(function(){


  jQuery.fn.selectText = function(){
    var doc = document;
    var element = this[0];
    var range, selection;

    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
  };

  $('#linkModal').on('show.bs.modal', function (e) {

    var dialog = $(this);
    var button = $(e.relatedTarget); // Button that triggered the modal
    var action = button.data('action');
    var snippetId = button.data('snippetid');

    if (action == 'show-link') {
      dialog.find('.modal-title').text('Link to Snippet');
      dialog.find('.modal-body')
        .html('<p>http://fssnip.net/' + snippetId + '</p>')
        .selectText();
    } else if (action == 'show-source') {
      dialog.find('.modal-title').text('Snippet Source');
      var snippetSourceUrl = 'http://localhost:8083/raw/' + snippetId;
      $.get(snippetSourceUrl, function (data) {
        dialog.find('.modal-body')
          .html('<pre>'+ data +'</pre>')
          .selectText();
      });
    }

    var dismissDialogHandler = function () {
      dialog.modal('hide');
    };

    $(document).keyup(dismissDialogHandler);
    dialog.on('hidden.bs.modal', function() {
      $(document).off("keyup", dismissDialogHandler);
    });
  });

});
