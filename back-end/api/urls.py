from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClienteViewSet, VeiculoViewSet
    # veiculo_create, get_veiculo, update_veiculo, delete_veiculo,
    # create_procedimento, get_procedimento, update_procedimento, delete_procedimento,
    # create_ordem, get_ordem, update_ordem, delete_ordem, get_ordem_total,
    # create_insumo, get_insumo, update_insumo, delete_insumo,
    # create_insumo_os, get_insumo_os, update_insumo_os, delete_insumo_os,
)

router = DefaultRouter()

router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'veiculos', VeiculoViewSet, basename='veiculo')

urlpatterns = [
    path('', include(router.urls)),
    
    # path("veiculos/", veiculo_create, name="veiculo-create"),
    # path("veiculos/<int:pk>", get_veiculo, name="get-veiculo"),
    # path("veiculos/update/", update_veiculo, name="update-veiculo"),
    # path("veiculos/delete/", delete_veiculo, name="delete-veiculo"),

    # path("procedimentos/", create_procedimento, name="create-procedimento"),
    # path("procedimentos/<int:pk>", get_procedimento, name="get-procedimento"),
    # path("procedimentos/update/<int:pk>", update_procedimento, name="update-procedimento"),
    # path("procedimentos/delete/<int:pk>", delete_procedimento, name="delete-procedimento"),

    # path("insumos/", create_insumo, name="create-insumo"),
    # path("insumos/<int:pk>", get_insumo, name="get-insumo"),
    # path("insumos/update/<int:pk>", update_insumo, name="update-insumo"),
    # path("insumos/delete/<int:pk>", delete_insumo, name="delete-insumo"),

    # path("ordemServicos/", create_ordem, name="create-ordem"),
    # path("ordemServicos/<int:pk>", get_ordem, name="get-ordem"),
    # path("ordemServicos/update/<int:pk>", update_ordem, name="update-ordem"),
    # path("ordemServicos/delete/<int:pk>", delete_ordem, name="delete-ordem"),
    # path("ordemServicos/calcularValorTotal/<int:pk>", get_ordem_total, name="get-ordem-total"),

    # path("insumosOrdem/", create_insumo_os, name="create-insumoOrdem,"),
    # path("insumosOrdem/<int:pk>", get_insumo_os, name="get-insumoOrdem"),
    # path("insumosOrdem/update/<int:pk>", update_insumo_os, name="update-insumoOrdem"),
    # path("insumosOrdem/delete/<int:pk>", delete_insumo_os, name="delete-insumoOrdem"),
]
