$(function(){
 
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="wrapper__main-chat__messages__message">
          <div class="wrapper__main-chat__messages__message__upper">
            <div class="wrapper__main-chat__messages__message__upper__name">
              ${message.user_name}
            </div>
            <div class="wrapper__main-chat__messages__message__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__main-chat__messages__message__lower" data-message-id=${message.id}>
            <p class="lower__content">
              ${message.content}
            </p>
            <img src=${message.image} >
          </div>

        </div>`
      return html;
    } else {
      var html =
       `<div class="wrapper__main-chat__messages__message">
          <div class="wrapper__main-chat__messages__message__upper">
            <div class="wrapper__main-chat__messages__message__upper__name">
              ${message.user_name}
            </div>
            <div class="wrapper__main-chat__messages__message__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="wrapper__main-chat__messages__message__lower" data-message-id=${message.id}>
            <p class="lower__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
  
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.wrapper__main-chat__messages').append(html);
      $('.wrapper__main-chat__messages').animate({ scrollTop: $('.wrapper__main-chat__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    var last_message_id = $('.wrapper__main-chat__messages__message__lower:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.wrapper__main-chat__messages').append(insertHTML);
      $('.wrapper__main-chat__messages').animate({ scrollTop: $('.wrapper__main-chat__messages')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});