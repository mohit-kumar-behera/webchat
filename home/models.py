from django.db import models


class Classroom(models.Model):
	class_name = models.CharField(max_length=20)
	class_id = models.CharField(max_length=25)
	creater_name = models.CharField(max_length=20)

	def __str__(self):
		return self.class_name+":"+self.class_id

	class Meta:
		verbose_name_plural = "Classroom"


class Members(models.Model):
	classroom = models.ForeignKey(Classroom,on_delete=models.CASCADE)
	member_name = models.CharField(max_length=20)

	def __str__(self):
		return self.member_name+" from "+self.classroom.class_name+" classroom"

	class Meta:
		verbose_name_plural = "Members"