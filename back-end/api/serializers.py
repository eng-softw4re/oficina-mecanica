from rest_framework import serializers
from .models import Cliente, Procedimento

class ClienteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cliente
    fields = ["id", "nome", "cpf", "telefone", "endereco", "data_nascimento"]

class ProcedimentoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Procedimento
    fields = ["id", "nome", "valor", "tempoEst", "descricao"]
