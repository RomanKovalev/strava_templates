from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from activities.tasks import add

def secure_profile(request):
    cat = list(num for num in range(0, 37))
    add.delay()
    context = {
        'user': request.user
    }
    return render(request, 'secure_profile.html', context)