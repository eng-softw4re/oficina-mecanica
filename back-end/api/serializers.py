from rest_framework import serializers
from .models import Cliente, Veiculo, Procedimento, OrdemServico, Insumo, InsumoOrdemServico, Cobranca, Endereco, Pagamento

class EnderecoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Endereco
    fields = ["id", "rua", "numero", "bairro", "cidade"]

class ClienteSerializer(serializers.ModelSerializer):
  endereco = EnderecoSerializer()

  class Meta:
    model = Cliente
    fields = ["id", "nome", "cpf", "telefone", "data_nascimento", "endereco"]

  def create(self, validated_data):
    endereco_data = validated_data.pop('endereco')
    endereco_obj = Endereco.objects.create(**endereco_data)
    cliente_obj = Cliente.objects.create(endereco=endereco_obj, **validated_data)

    return cliente_obj

  def update(self, instance, validated_data):
    endereco_data = validated_data.pop('endereco', None)
    instance = super().update(instance, validated_data)

    if endereco_data:
      if instance.endereco:
        endereco_serializer = EnderecoSerializer(instance.endereco, data=endereco_data, partial=True)
        if endereco_serializer.is_valid():
          endereco_serializer.save()
      else:
        new_endereco = Endereco.objects.create(**endereco_data)
        instance.endereco = new_endereco
        instance.save()
    
    return instance

class VeiculoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Veiculo
    fields = ["id", "marca", "modelo", "tipo", "cor", "placa", "cliente"]

class ProcedimentoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Procedimento
    fields = ["id", "nome", "valor", "tempo_estimado", "descricao"]

class InsumoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Insumo
    fields = ["id", "nome", "valor", "descricao"]

class OrdemServicoSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrdemServico
    fields = ["id", "veiculo", "data", "insumos", "procedimentos"]

class InsumoOrdemSerializer(serializers.ModelSerializer):
  class Meta:
    model = InsumoOrdemServico
    fields = ["id", "ordem_servico", "insumo", "quantidade"]

class CobrancaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cobranca
    fields = ["id", "ordem_servico", "valor_total", "data_emissao"]

class PagamentoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Pagamento
    fields = ["id", "cobranca", "valor_pago", "data_transicao", "metodo_pagamento"]