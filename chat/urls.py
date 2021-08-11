from django.urls import path
from . import views

app_name = "chat"


urlpatterns = [
    path("",views.chat,name="chat"),
    path("delete/",views.delete_classroom,name="delete-classroom"),
    path("send-message",views.send_message,name="send-message"),
    path("receive-messages",views.receive_messages,name="receive-messages")
]
