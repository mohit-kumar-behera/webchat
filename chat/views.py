from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from django.urls import reverse
from django.utils import timezone
from home.models import Classroom,Members
from .models import Chat
import datetime

def chat(request):
	try:
		sessClassID = request.session['sessClassID']
		sessName = request.session['sessName']
		classroom = Classroom.objects.get(class_id=sessClassID)
	except:
		return HttpResponseRedirect(reverse("home:home"))
	else:
		members = classroom.members_set.all()
		chats = classroom.chat_set.all()
		context = {"classroom":classroom,"members":members,"chats":chats,"user":sessName}
	return render(request,"chat/chat.html",context)


def delete_classroom(request):
	try:
		sessClassID = request.session['sessClassID']
		sessName = request.session['sessName']
		classroom = Classroom.objects.get(class_id=sessClassID)
	except:
		pass
	else:
		classroom.delete()
	return HttpResponseRedirect(reverse("home:home"))


def send_message(request):
	if request.POST:
		send_to__class = request.session['sessClassID']
		classroom = Classroom.objects.get(class_id=send_to__class)
		message = request.POST.get('message')
		sent_by = request.session['sessName']#use timezone
		message_db = classroom.chat_set.create(message=message, sent_by=sent_by)
		data = {'successfull':True}
		return JsonResponse(data)


def receive_messages(request):
	if request.POST:
		last_shown_message_id = int(request.POST.get("lastShownMessageId"))
		classroom = Classroom.objects.get(class_id=request.session['sessClassID'])
		chats = classroom.chat_set.filter(id__gt=last_shown_message_id)
		chat__list,chat__dict = [],{}
		for chat in chats:
			if chat.sent_by != request.session['sessName']:
				_chatbucket = []
				_chatbucket.append(chat.message)
				_chatbucket.append(chat.id)
				_chatbucket.append(chat.sent_by)
				chat__list.append(_chatbucket)
		if len(chat__list) != 0:
			data = {'successfull':True,'messages':chat__list}
			return JsonResponse(data)
		else:
			data = {'successfull':False}
			return JsonResponse(data)

