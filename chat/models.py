from django.db import models
from home.models import Classroom,Members

class Chat(models.Model):
	classroom = models.ForeignKey(Classroom,on_delete=models.CASCADE)
	message = models.TextField()
	sent_by = models.CharField(max_length=20)
	sent_dt = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.message[:20]+"... by "+self.sent_by+" at "+str(self.sent_dt)

	class Meta:
		verbose_name_plural = "Chat"