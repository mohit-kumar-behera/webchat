const chatbox = document.getElementsByClassName("chatbox-container")[0];
const chatboxBody = document.getElementsByClassName("chatbox-body")[0];
const chatboxHead = document.getElementsByClassName("chatbox-head")[0];
const chatboxFooter = document.getElementsByClassName("chatbox-footer")[0];

const messageBox = document.getElementsByClassName("send-message-box")[0];
const sendMessageBtn = document.getElementsByClassName("send-message")[0];

const csrf_token = document.querySelector("[name='csrfmiddlewaretoken']");
const messageDiv = document.getElementsByClassName("chatbox-body");
const lastMessageDiv = messageDiv[0];

const messages = document.getElementsByClassName("message o__message");//all recevied messages

function chatboxScroll() {
    var chatboxHeight = chatbox.offsetHeight;
    var chatboxHeadHeight = chatboxHead.offsetHeight;
    var chatboxFootHeight = chatboxFooter.offsetHeight;
    var chatboxBodyHeight = chatboxHeight - (chatboxHeadHeight + chatboxFootHeight);
    chatboxBody.style.height = chatboxBodyHeight+"px";
    let chatboxBodyScrollHeight = chatboxBody.scrollHeight;
    $(".chatbox-body").animate({scrollTop:chatboxBodyScrollHeight},100);
}


/*enable the send message button on typing some message*/
messageBox.onkeyup = function() {
    var textLength = this.value.length;
    (textLength > 0) 
     ? sendMessageBtn.removeAttribute("disabled")
     : sendMessageBtn.setAttribute("disabled",true);
}  


/*save the message to the database*/
sendMessageBtn.onclick=function() {
    let message = messageBox.value.trim();
    let csrf = csrf_token.value;
    $.ajax({
        type:"POST",
        url:"/chat/send-message/",
        data:{
            'message':message,
            'csrfmiddlewaretoken':csrf
        },
        success:function(json) {
            if(json.successfull) {
                let messageP_Tag = document.createElement("p");		
                let messageDiv_Tag = document.createElement("div");
                let messageP_Text = document.createTextNode(message);
                messageDiv_Tag.className = "message u__message m-1 p-2";
                messageP_Tag.append(messageP_Text);
                messageDiv_Tag.append(messageP_Tag);
                lastMessageDiv.append(messageDiv_Tag);
                //after appending message clear the chatbox,scroll down the chatbox,and disable the send-message button
                messageBox.value = "";
                sendMessageBtn.setAttribute("disabled",true);
                chatboxScroll();	
            }
        }
    });
}


/*receive messages from different sender every seconds*/
var loop = setInterval(extractMessages,2000);
var csrf = csrf_token.value;
function extractMessages() {
    let lastMessage = messages[messages.length - 1];//last received message
    let lastMessageId = lastMessage.getAttribute("chat-id");
    $.ajax({
        type:"POST",
        url:"/chat/receive-messages/",
        data:{
            'csrfmiddlewaretoken':csrf,
            'lastShownMessageId':lastMessageId
        },
        success:function(json) {
            if(json.successfull) {
                for(i=0;i<json.messages.length;i++) {
                    chat_message = json.messages[i][0];
                    chat_id = json.messages[i][1];
                    chat_by = json.messages[i][2];
                    let messageP_Tag = document.createElement("p");
                    let messageSpan_Tag = document.createElement("span");		
                    let messageDiv_Tag = document.createElement("div");
                    let messageDiv_Attribute = document.createAttribute("chat-id");
                    let messageP_Text = document.createTextNode(chat_message);
                    let messageSpan_Text = document.createTextNode(chat_by+" : ");
                    messageDiv_Attribute.value = chat_id;
                    messageDiv_Tag.setAttributeNode(messageDiv_Attribute)
                    messageDiv_Tag.className = "message o__message m-1 p-2";
                    messageSpan_Tag.className = "text-dark font-weight-bolder";
                    messageSpan_Tag.append(messageSpan_Text);
                    messageP_Tag.append(messageSpan_Tag);
                    messageP_Tag.append(messageP_Text);
                    messageDiv_Tag.append(messageP_Tag);
                    lastMessageDiv.append(messageDiv_Tag);
                    chatboxScroll();
                }
            }
            
        }
    });
}


const init = function () {
    chatboxScroll();	
};
init();