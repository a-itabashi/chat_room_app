class RoomChannel < ApplicationCable::Channel
  
  # フロントエンド(ブラウザ)を監視する時に実行されるメソッド
  # フロントエンドからデータ来ないかどうか監視している。
  # つまりは、バックエンド側のメソッドがこちらでは定義されている
  def subscribed
    # stream_from "some_channel"
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # 引数のdataで、フロントエンド側からのデータを取得している
  def speak(data)
    message = Message.create!(content: data['message'])
    template = ApplicationController.renderer.render(partial: 'messages/message', locals: {message: message})
    ActionCable.server.broadcast 'room_channel' ,template


    # Message.create!(content: data['message'])
    # # バックエンド側からbroadcast(フロントエンド側へ配信)するための記述
    # # 'room_channelは、room.jsのRoomChannelのことを指している'
    # ActionCable.server.broadcast 'room_channel' ,data['message']
  end
end
