from django.db import models
from django.utils import timezone

class Player(models.Model):
    player = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=10)

    def register(self):
        self.save()
    
    def __str__(self):
        return self.name