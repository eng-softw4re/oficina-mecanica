from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente
from .serializers import ClienteSerializer
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
  