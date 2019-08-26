from django.urls import path
from . import views

urlpatterns = [
    path('', views.start_page, name='show_rank'),
    path('play/', views.play_game, name='play_game'),
]