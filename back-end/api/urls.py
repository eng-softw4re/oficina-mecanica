from django.urls import path
from .views import (
    cliente_create, get_cliente, update_cliente, delete_cliente,
    veiculo_create, get_veiculo, update_veiculo, delete_veiculo,
    create_procedimento, get_procedimento, update_procedimento, delete_procedimento,
    create_ordem, get_ordem, update_ordem, delete_ordem,
    create_insumo, get_insumo, update_insumo, delete_insumo,
    create_insumo_os, get_insumo_os, update_insumo_os, delete_insumo_os,
)
urlpatterns = [
    path("clientes/", cliente_create, name="cliente-create"),
    path("clientes/<int:pk>", get_cliente, name="get-cliente"),
    path("clientes/update/", update_cliente, name="put-cliente"),
    path("clientes/delete/", delete_cliente, name="delete-cliente"),

    path("veiculos/", veiculo_create, name="veiculo-create"),
    path("veiculos/<int:pk>", get_veiculo, name="get-veiculo"),
    path("veiculos/update/", update_veiculo, name="update-veiculo"),
    path("veiculos/delete/", delete_veiculo, name="delete-veiculo"),

    path("procedimentos/", create_procedimento, name="create-procedimento"),
    path("procedimentos/<int:pk>", get_procedimento, name="get-procedimento"),
    path("procedimentos/update/<int:pk>", update_procedimento, name="update-procedimento"),
    path("procedimentos/delete/<int:pk>", delete_procedimento, name="delete-procedimento"),

    path("insumos/", create_insumo, name="create-insumo"),
    path("insumos/<int:pk>", get_insumo, name="get-insumo"),
    path("insumos/update/<int:pk>", update_insumo, name="update-insumo"),
    path("insumos/delete/<int:pk>", delete_insumo, name="delete-insumo"),
    
    path("ordemServicos/", create_ordem, name="create-ordem"),
    path("ordemServicos/<int:pk>", get_ordem, name="get-ordem"),
    path("ordemServicos/update/<int:pk>", update_ordem, name="update-ordem"),
    path("ordemServicos/delete/<int:pk>", delete_ordem, name="delete-ordem"),

    path("insumosOrdem/", create_insumo_os, name="create-insumoOrdem,"),
    path("insumosOrdem/<int:pk>", get_insumo_os, name="get-insumoOrdem"),
    path("insumosOrdem/update/<int:pk>", update_insumo_os, name="update-insumoOrdem"),
    path("insumosOrdem/delete/<int:pk>", delete_insumo_os, name="delete-insumoOrdem"),
]
