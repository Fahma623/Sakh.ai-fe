from django.urls import path
from .views import signup, CustomLoginView, dashboard, support

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', CustomLoginView.as_view(), name='login'),  
    path('dashboard/', dashboard, name='dashboard'),
    path('support/', support, name='support'),
]
