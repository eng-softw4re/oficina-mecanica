from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente, Veiculo
from .serializers import ClienteSerializer, VeiculoSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(['POST'])
def cliente_create(request):  
  if request.method == "POST":
    serializer = ClienteSerializer(data=request.data) 
    if serializer.is_valid(): # valida os dados
      serializer.save() # salva os dados no banco
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.erros, status=status.HTTP_400_BADREQUEST)

@api_view(['GET'])
def get_cliente(request, pk):
  cliente = get_object_or_404(Cliente, pk=pk)

  if request.method == 'GET':
    serializer = ClienteSerializer(cliente)
    return Response(serializer.data)

@api_view(['PUT'])
def update_cliente(request):
  cpf = request.data.get("cpf")

  if not cpf:
    return Response(
      { "detail": "O campo CPF é obrigatório para atualizar o cliente." },
      status=status.HTTP_400_BAD_REQUEST
    )
  
  cliente = get_object_or_404(Cliente, cpf=cpf)
  print(cliente)

  serializer = ClienteSerializer(cliente, data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_cliente(request):
  cpf = request.data.get("cpf")
  print("cpf:", cpf)

  if not cpf:
    return Response(
      { "details": "Informe um CPF válido para deletar o cliente." },
      status=status.HTTP_400_BAD_REQUEST
    )
  
  cliente = get_object_or_404(Cliente, cpf=cpf)
  print("aqui", cliente)
  cliente.delete()

  return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def veiculo_create(request):
  if request.method == 'POST':
    serializer = VeiculoSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.erros, status=status.HTTP_400_BADREQUEST)
  
@api_view(['GET'])
def get_veiculo(request, pk):
  veiculo = get_object_or_404(Veiculo, pk=pk)

  if request.method == 'GET':
    serializer = VeiculoSerializer(veiculo)
    return Response(serializer.data)