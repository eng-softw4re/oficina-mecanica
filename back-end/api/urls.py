from django.urls import path
from .views import cliente_create, get_cliente

urlpatterns = [
    path("clientes/", cliente_create, name="cliente-create"),
    path("clientes/<int:pk>", get_cliente, name="get-cliente")
]
