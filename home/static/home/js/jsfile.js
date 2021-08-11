// <script>
// 	//copy the classroom link
// 	const d = document;
// 	const copyBtn = d.getElementsByClassName("copy-btn")[0];
// 	const classID = d.getElementById("c__class_id");
// 	const copyIcon = d.getElementsByClassName("copy-icon")[0];
// 	copyBtn.onclick = function() {
// 		uniqueID = classID.getAttribute("value");
// 		navigator.clipboard.writeText(uniqueID).then(function(){
// 			classID.select();
// 			copyIcon.classList.remove("fa-clipboard");
// 			copyIcon.classList.add("fa-check")
// 			setTimeout(function(){
// 				copyIcon.classList.remove("fa-check");
// 				copyIcon.classList.add("fa-clipboard");
// 			},1000)
// 		})
// 	}
// </script>

// <script>
// 	/*Scroll to the bottom of chatbox-body*/
// 	const chatbox = document.getElementsByClassName("chatbox-container")[0];
// 	const chatboxBody = document.getElementsByClassName("chatbox-body")[0];
// 	const chatboxHead = document.getElementsByClassName("chatbox-head")[0];
// 	const chatboxFooter = document.getElementsByClassName("chatbox-footer")[0];
// 	chatboxScroll();	

// 	/*set the height of cahtbox body according to the height of chatbox footer and header*/
// 	var chatboxHeight = chatbox.offsetHeight;
// 	var chatboxHeadHeight = chatboxHead.offsetHeight;
// 	var chatboxFootHeight = chatboxFooter.offsetHeight;
// 	var chatboxBodyHeight = chatboxHeight - (chatboxHeadHeight + chatboxFootHeight);
// 	chatboxBody.style.height = chatboxBodyHeight+"px";

// 	function chatboxScroll() {
// 		let chatboxBodyScrollHeight = chatboxBody.scrollHeight;
// 		$(".chatbox-body").animate({scrollTop:chatboxBodyScrollHeight},100);
// 	}

// </script>

// <script>
// 	/*enable the send message button on typing some message*/
// 	const messageBox = document.getElementsByClassName("send-message-box")[0];
// 	const sendMessageBtn = document.getElementsByClassName("send-message")[0];
	
// 	messageBox.onkeyup = function() {
// 		var textLength = this.value.length;
// 		if(textLength > 0) {
// 			sendMessageBtn.removeAttribute("disabled");
// 		}
// 		else {
// 			sendMessageBtn.setAttribute("disabled",true);
// 		}
// 	}  

// 	/*receive message typed by the user*/
// 	const csrf_token = document.querySelector("[name='csrfmiddlewaretoken']");
// 	const messageDiv = document.getElementsByClassName("chatbox-body");
// 	const lastMessageDiv = messageDiv[0];
// 	/*save the message to the database*/
// 	sendMessageBtn.onclick=function() {
// 		let message = messageBox.value.trim();
// 		let csrf = csrf_token.value;
// 		$.ajax({
// 			type:"POST",
// 			url:"{% url 'chat:send-message' %}",
// 			data:{
// 				'message':message,
// 				'csrfmiddlewaretoken':csrf
// 			},
// 			success:function(json) {
// 				if(json.successfull) {
// 					let messageP_Tag = document.createElement("p");		
// 					let messageDiv_Tag = document.createElement("div");
// 					let messageP_Text = document.createTextNode(message);
// 					messageDiv_Tag.className = "message u__message m-1 p-2";
// 					messageP_Tag.append(messageP_Text);
// 					messageDiv_Tag.append(messageP_Tag);
// 					lastMessageDiv.append(messageDiv_Tag);
// 					//after appending message clear the chatbox,scroll down the chatbox,and disable the send-message button
// 					messageBox.value = "";
// 					sendMessageBtn.setAttribute("disabled",true);
// 					chatboxScroll();	
// 				}
// 			}
// 		});
// 	}

// </script>

// <script>
// 	/*receive messages from different sender every seconds*/
// 	const messages = document.getElementsByClassName("message o__message");//all recevied messages

// 	var loop = setInterval(extractMessages,2000);
// 	var csrf = csrf_token.value;
// 	function extractMessages() {
// 		let lastMessage = messages[messages.length - 1];//last received message
// 		let lastMessageId = lastMessage.getAttribute("chat-id");
// 		$.ajax({
// 			type:"POST",
// 			url:"{% url 'chat:receive-messages' %}",
// 			data:{
// 				'csrfmiddlewaretoken':csrf,
// 				'lastShownMessageId':lastMessageId
// 			},
// 			success:function(json) {
// 				if(json.successfull) {
// 					for(i=0;i<json.messages.length;i++) {
// 						chat_message = json.messages[i][0];
// 						chat_id = json.messages[i][1];
// 						chat_by = json.messages[i][2];
// 						let messageP_Tag = document.createElement("p");
// 						let messageSpan_Tag = document.createElement("span");		
// 						let messageDiv_Tag = document.createElement("div");
// 						let messageDiv_Attribute = document.createAttribute("chat-id");
// 						let messageP_Text = document.createTextNode(chat_message);
// 						let messageSpan_Text = document.createTextNode(chat_by+" : ");
// 						messageDiv_Attribute.value = chat_id;
// 						messageDiv_Tag.setAttributeNode(messageDiv_Attribute)
// 						messageDiv_Tag.className = "message o__message m-1 p-2";
// 						messageSpan_Tag.className = "text-dark font-weight-bolder";
// 						messageSpan_Tag.append(messageSpan_Text);
// 						messageP_Tag.append(messageSpan_Tag);
// 						messageP_Tag.append(messageP_Text);
// 						messageDiv_Tag.append(messageP_Tag);
// 						lastMessageDiv.append(messageDiv_Tag);
// 						chatboxScroll();
// 					}
// 				}
				
// 			}
// 		});
// 	}
// </script>