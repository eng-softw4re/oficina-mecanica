from django.urls import path
from .views import cliente_create

urlpatterns = [
    path("clientes/", cliente_create, name="cliente-create")
]
