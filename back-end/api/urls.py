from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClienteViewSet, VeiculoViewSet, ProcedimentoViewSet, OrdemServicoViewSet, InsumoViewSet, InsumoOrdemServicoViewSet, CobrancaViewSet,
    EnderecoViewSet, 
)

router = DefaultRouter()

router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'veiculos', VeiculoViewSet, basename='veiculo')
router.register(r'procedimentos', ProcedimentoViewSet, basename='procedimento')
router.register(r'ordem-de-servicos', OrdemServicoViewSet, basename='ordem-de-servico')
router.register(r'insumos', InsumoViewSet, basename='insumo')
router.register(r'insumos-ordem-de-servicos', InsumoOrdemServicoViewSet, basename='insumos-ordem-de-servico')
router.register(r'cobranca', CobrancaViewSet, basename='cobranca')
router.register(r'enderecos', EnderecoViewSet, basename='endereco')

urlpatterns = [
    path('', include(router.urls)),
]
