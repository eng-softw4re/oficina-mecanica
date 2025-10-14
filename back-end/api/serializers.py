from rest_framework import serializers
from .models import Cliente, Veiculo

class ClienteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cliente
    fields = ["id", "nome", "cpf", "telefone", "endereco", "data_nascimento"]
  
class VeiculoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Veiculo
    fields = ["id", "marca", "modelo", "tipo", "cor", "placa", "cliente"]