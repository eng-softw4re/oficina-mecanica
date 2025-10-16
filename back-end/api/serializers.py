from rest_framework import serializers
from .models import Cliente, Veiculo, Procedimento, OrdemServico

class ClienteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cliente
    fields = ["id", "nome", "cpf", "telefone", "endereco", "data_nascimento"]
  
class VeiculoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Veiculo
    fields = ["id", "marca", "modelo", "tipo", "cor", "placa", "cliente"]

class ProcedimentoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Procedimento
    fields = ["id", "nome", "valor", "tempo_estimado", "descricao"]

class OrdemServicoSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrdemServico
    fields = ["id", "cliente", "veiculo", "data"]

