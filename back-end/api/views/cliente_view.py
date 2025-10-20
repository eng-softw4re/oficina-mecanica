from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models import Cliente
from ..serializers import ClienteSerializer

class ClienteViewSet(viewsets.ModelViewSet): # Já vem com cadastrar e buscar na herança
  queryset = Cliente.objects.all()
  serializer_class = ClienteSerializer

  @action(detail=False, methods=['put'], url_path='update')
  def update_by_cpf(self, request):
    cpf = request.data.get("cpf")

    if not cpf:
      return Response(
        { "detail": "O campo CPF é obrigatório para atualizar o cliente." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    cliente = get_object_or_404(Cliente, cpf=cpf)

    serializer = ClienteSerializer(cliente, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


  @action(detail=False, methods=['delete'], url_path='delete')
  def delete_by_cpf(self, request):
    cpf = request.data.get("cpf")

    if not cpf:
      return Response(
        { "details": "Informe um CPF válido para deletar o cliente." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    cliente = get_object_or_404(Cliente, cpf=cpf)
    cliente.delete()