from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models import InsumoOrdemServico
from ..serializers import InsumoOrdemSerializer

class InsumoOrdemServicoViewSet(viewsets.ModelViewSet): # Já vem com cadastrar e buscar na herança
  queryset = InsumoOrdemServico.objects.all()
  serializer_class = InsumoOrdemSerializer

  @action(detail=False, methods=['put'], url_path='update')
  def update_by_id(self, request):
    id = request.data.get("id")

    if not id:
      return Response(
        { "detail": "O campo ID é obrigatório para atualizar o insumo." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    insumoOrdemServico = get_object_or_404(InsumoOrdemServico, id=id)

    serializer = InsumoOrdemSerializer(insumoOrdemServico, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


  @action(detail=False, methods=['delete'], url_path='delete')
  def delete_by_id(self, request):
    id = request.data.get("id")

    if not id:
      return Response(
        { "details": "Informe um ID válido para deletar o cliente." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    insumoOrdemServico = get_object_or_404(InsumoOrdemServico, id=id)
    insumoOrdemServico.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)