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
          <div class="wrapper__main-chat__messages__message__lower">
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
          <div class="wrapper__main-chat__messages__message__lower">
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
      console.log(data)
      var html = buildHTML(data);
      $('.wrapper__main-chat__messages').append(html);
      $('.wrapper__main-chat__messages').animate({ scrollTop: $('.wrapper__main-chat__messages__message')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});