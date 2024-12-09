from django.urls import path
from .views import signup, CustomLoginView, dashboard, support, cbt, guide, resources, flash

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', CustomLoginView.as_view(), name='login'),  
    path('dashboard/', dashboard, name='dashboard'),
    path('support/', support, name='support'),
    path('guide/', guide, name='guide'),
    path('cbt/', cbt, name='cbt'),
    path('resources/', resources, name='resources'),
    path('flash/', flash, name='flash'),
]
