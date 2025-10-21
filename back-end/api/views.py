from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import OrdemServico, Insumo, InsumoOrdemServico
from .serializers import OrdemServicoSerializer, InsumoSerializer, InsumoOrdemSerializer
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def create_insumo_os(request):  
    """
    Adiciona um insumo e sua quantidade a uma Ordem de Serviço.
    """
    serializer = InsumoOrdemSerializer(data=request.data) 
    if serializer.is_valid():
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_insumo_os(request, pk):
    """
    Busca um item específico da relação Insumo <-> OS pelo seu ID único.
    """
    item_os = get_object_or_404(InsumoOrdemServico, pk=pk)
    serializer = InsumoOrdemSerializer(item_os)
    return Response(serializer.data)
  
@api_view(['PUT'])
def update_insumo_os(request, pk):
    """
    Atualiza um item da OS (ex: para alterar a quantidade).
    """
    item_os = get_object_or_404(InsumoOrdemServico, pk=pk)

    serializer = InsumoOrdemSerializer(item_os, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_insumo_os(request, pk):
    """
    Remove um insumo de uma Ordem de Serviço.
    """
    item_os = get_object_or_404(InsumoOrdemServico, pk=pk)
    item_os.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)