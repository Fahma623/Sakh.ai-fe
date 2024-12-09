from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.views import LoginView

# Signup view
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Log the user in after successful signup
            return redirect('home')  # Redirect to home page or any other page you want
    else:
        form = UserCreationForm()
    return render(request, 'pages/signup.html', {'form': form})

# Custom Login view
class CustomLoginView(LoginView):
    template_name = 'pages/login.html'  # Specify the template for the login page
