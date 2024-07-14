from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def secure_profile(request):
    cat = list(num for num in range(0, 37))

    context = {
        'user': request.user
    }
    return render(request, 'secure_profile.html', context)