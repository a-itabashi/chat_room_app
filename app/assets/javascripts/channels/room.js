App.room = App.cable.subscriptions.create("RoomChannel", {

  // フロントエンド側でサーバー側を監視するためのメソッド
  connected: function() {
    // Called when the subscription is ready for use on the server
    // console.log("test");

  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  // バックエンド側からbroadcastされたデータはこちらで受け取る
  received: function(message) {
    // 値を取得できているか確認するために、検証ツールのconsole上でApp.room.speak()を実行すると、
    // alet(data);が呼ばれるか確認してみる
    const messages = document.getElementById('messages')
    messages.innerHTML += message

    // messages.innerHTML += `<p>${message}</p>`
    // Called when there's incoming data on the websocket for this channel
  },

  speak: function(content) {
    // ここでバックエンドのRoomChannelのspeakメソッドを実行している
    // return this.perform('speak', {message: "aaaaaaaaaaaaaaa"});
    return this.perform('speak', {message: content});
  }
});

// DOMが全て読まれた後にイベントを発火させる。
document.addEventListener('DOMContentLoaded', function(){
  const input = document.getElementById('chat-input');
  const button = document.getElementById('chat-button');
  button.addEventListener('click', function(){
    const content = input.value;
    // debugger;
    App.room.speak(content);
    input.value = '';
  })
});
