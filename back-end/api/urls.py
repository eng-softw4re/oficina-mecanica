from django.urls import path
from .views import cliente_create, get_cliente, update_cliente, delete_cliente

urlpatterns = [
    path("clientes/", cliente_create, name="cliente-create"),
    path("clientes/<int:pk>", get_cliente, name="get-cliente"),
    path("clientes/update/", update_cliente, name="put-cliente"),
    path("clientes/delete/", delete_cliente, name="delete-cliente")
]
