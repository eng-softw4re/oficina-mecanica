from django.urls import path
from .views import (
    cliente_create, 
    get_cliente, 
    update_cliente, 
    delete_cliente, 
    create_procedimento, 
    get_procedimento, 
    update_procedimento, 
    delete_procedimento
)
urlpatterns = [
    path("clientes/", cliente_create, name="cliente-create"),
    path("clientes/<int:pk>", get_cliente, name="get-cliente"),
    path("clientes/update/", update_cliente, name="put-cliente"),
    path("clientes/delete/", delete_cliente, name="delete-cliente"),
    path("procedimentos/", create_procedimento, name="create-procedimento"),
    path("procedimento/<int:pk>", get_procedimento, name="get-procedimento"),
    path("procedimento/<int:pk>", update_procedimento, name="update-procedimento"),
    path("procedimento/<int:pk>", delete_procedimento, name="delete-procedimento"),
]
