from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente, Veiculo, Procedimento, OrdemServico, Insumo, InsumoOrdemServico
from .serializers import ClienteSerializer, VeiculoSerializer, ProcedimentoSerializer, OrdemServicoSerializer, InsumoSerializer, InsumoOrdemSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
# CLIENTES
@api_view(['POST'])
def cliente_create(request):  
  if request.method == "POST":
    serializer = ClienteSerializer(data=request.data) 
    if serializer.is_valid(): # valida os dados
      serializer.save() # salva os dados no banco
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
# VEÍCULOS
@api_view(['POST'])
def veiculo_create(request):
  if request.method == 'POST':
    serializer = VeiculoSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET'])
def get_veiculo(request, pk):
  veiculo = get_object_or_404(Veiculo, pk=pk)

  if request.method == 'GET':
    serializer = VeiculoSerializer(veiculo)
    return Response(serializer.data)

@api_view(['PUT'])
def update_veiculo(request):
  placa = request.data.get("placa")

  if not placa:
    return Response(
      { "details": "Informe uma placa válida para atualizar o veículo." },
      status=status.HTTP_400_BAD_REQUEST
    )
  
  veiculo = get_object_or_404(Veiculo, placa=placa)

  serializer = VeiculoSerializer(veiculo, data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_veiculo(request):
  placa = request.data.get("placa")

  if not placa:
    Response(
      { "detail": "Informe uma placa de veícula válida."},
      status=status.HTTP_400_BAD_REQUEST
    )

  veiculo = get_object_or_404(Veiculo, placa=placa)
  veiculo.delete()
  
  return Response(status=status.HTTP_204_NO_CONTENT)

# PROCEDIMENTOS
@api_view(['POST'])
def create_procedimento(request):  
  if request.method == "POST":
    serializer = ProcedimentoSerializer(data=request.data) 
    if serializer.is_valid(): # valida os dados
      serializer.save() # salva os dados no banco
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_procedimento(request, pk):
  proced = get_object_or_404(Procedimento, pk=pk)

  if request.method == 'GET':
    serializer = ProcedimentoSerializer(proced)
    return Response(serializer.data)
  
@api_view(['PUT'])
def update_procedimento(request, pk):
  proced = get_object_or_404(Procedimento, pk=pk)

  serializer = ProcedimentoSerializer(proced, data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_procedimento(request, pk):
  procedimento = get_object_or_404(Procedimento, pk=pk)
  procedimento.delete()
  
  return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def create_ordem(request):  
  if request.method == "POST":
    serializer = OrdemServicoSerializer(data=request.data) 
    if serializer.is_valid(): # valida os dados
      serializer.save() # salva os dados no banco
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_ordem(request, pk):
  ordem = get_object_or_404(OrdemServico, pk=pk)

  if request.method == 'GET':
    serializer = OrdemServicoSerializer(ordem)
    return Response(serializer.data)

@api_view(['PUT'])
def update_ordem(request, pk):
  ordem = get_object_or_404(OrdemServico, pk=pk)

  serializer = OrdemServicoSerializer(ordem, data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_ordem(request, pk):
  ordem = get_object_or_404(OrdemServico, pk=pk)
  ordem.delete()
  
  return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def create_insumo(request):  
  if request.method == "POST":
    serializer = InsumoSerializer(data=request.data) 
    if serializer.is_valid(): # valida os dados
      serializer.save() # salva os dados no banco
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_insumo(request, pk):
  insumo = get_object_or_404(Insumo, pk=pk)

  if request.method == 'GET':
    serializer = InsumoSerializer(insumo)
    return Response(serializer.data)
  
@api_view(['PUT'])
def update_insumo(request, pk):
  insumo = get_object_or_404(Insumo, pk=pk)

  serializer = InsumoSerializer(insumo, data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_insumo(request, pk):
  ordem = get_object_or_404(Insumo, pk=pk)
  ordem.delete()
  
  return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def add_insumo_os(request):  
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