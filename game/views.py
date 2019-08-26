from django.shortcuts import render

def start_page(request):
    return render(request, 'game/show_rank.html', {})

def play_game(request):
    return render(request, 'game/play_game.html', {})