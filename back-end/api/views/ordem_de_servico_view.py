from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models import OrdemServico
from ..serializers import OrdemServicoSerializer

class OrdemServicoViewSet(viewsets.ModelViewSet): # Já vem com cadastrar e buscar na herança
  queryset = OrdemServico.objects.all()
  serializer_class = OrdemServicoSerializer

  @action(detail=False, methods=['put'], url_path='update')
  def update_by_id(self, request):
    id = request.data.get("id")

    if not id:
      return Response(
        { "detail": "O campo ID é obrigatório para atualizar o procedimento." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    ordemServico = get_object_or_404(OrdemServico, id=id)

    serializer = OrdemServicoSerializer(ordemServico, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=['delete'], url_path='delete')
  def delete_by_id(self, request):
    id = request.data.get("id")

    if not id:
      return Response(
        { "details": "Informe um ID válido para deletar o procedimento." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    ordemServico = get_object_or_404(OrdemServico, id=id)
    ordemServico.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  @action(detail=True, methods=['get'], url_path='valor-total')
  def get_ordem_total(self, request, id):
    ordem = get_object_or_404(OrdemServico, id=id)
    try:
      total = ordem.calcular_valor_total()
      return Response({'valor_total': total}, status=status.HTTP_200_OK)
    except Exception as e:
      return Response(
        {'erro': f'Erro ao calcular o total: {str(e)}'}, 
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
      )
