# your_app/urls.py
from django.urls import path
from .views import predict_dmos

urlpatterns = [
    path('predict/', predict_dmos, name='predict_dmos'),
]
