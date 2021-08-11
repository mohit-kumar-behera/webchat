from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect,JsonResponse
from django.urls import reverse
from django.template.defaultfilters import slugify
from .IdGenerator import IdGenerator as IDG
from .models import Classroom
import random


def home(request):
	try:
		sessClassID = request.session['sessClassID']
		sessName = request.session['sessName']
	except:
		context = {'sessClassID':False,'sessName':False}
	else:
		"""delete session variable after using it once"""
		del request.session['sessClassID']
		del request.session['sessName']
		
		context = {'sessClassID':sessClassID,'sessName':sessName}
	if request.POST:
		class_id = request.POST.get("class_id")
		user_name = request.POST.get("user_name")
		try:
			classroom = Classroom.objects.get(class_id=class_id)
		except Classroom.DoesNotExist:
			context['message'] = "Classroom doesn't Exist. Please create a new classroom"
		else:
			classroom.members_set.create(member_name=user_name)
			"""Create a new session variable for the user who joined the chat"""
			request.session['sessClassID'] = class_id
			request.session['sessName'] = user_name
			return HttpResponseRedirect(reverse("chat:chat"))
	return render(request,"home/home.html",context)


def generate_link(request):
	context = {}
	unique_key = random.randint(1111,9999) # 4 digit random number
	ID = IDG.generateId(unique_key=unique_key)
	context['ID'] = ID
	if request.POST:
		c__class_id = request.POST.get("c__class_id")
		c__class_name = request.POST.get("c__class_name")
		c__creater_name = request.POST.get("c__user_name")
		Classroom.objects.create(class_name=slugify(c__class_name),class_id=c__class_id,creater_name=c__creater_name)
		request.session['sessClassID'] = c__class_id
		request.session['sessName'] = c__creater_name
		return HttpResponseRedirect(reverse("home:home"))
	return render(request,"home/generate.html",context)

