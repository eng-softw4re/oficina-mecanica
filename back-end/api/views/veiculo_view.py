from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models import Veiculo
from ..serializers import VeiculoSerializer

class VeiculoViewSet(viewsets.ModelViewSet): # Já vem com cadastrar e buscar na herança
  queryset = Veiculo.objects.all()
  serializer_class = VeiculoSerializer

  @action(detail=False, methods=['put'], url_path='update')
  def update_by_placa(self, request):
    placa = request.data.get("placa")

    if not placa:
      return Response(
        { "detail": "O campo placa é obrigatório para atualizar o veículo." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    cliente = get_object_or_404(Veiculo, placa=placa)

    serializer = VeiculoSerializer(cliente, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


  @action(detail=False, methods=['delete'], url_path='delete')
  def delete_by_cpf(self, request):
    placa = request.data.get("placa")

    if not placa:
      return Response(
        { "details": "Informe um placa válido para deletar o cliente." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    Veiculo = get_object_or_404(Veiculo, placa=placa)
    Veiculo.delete()