from django.db import models
from django.db.models import Sum, F, ExpressionWrapper, DecimalField
from decimal import Decimal

# Create your models here.
class Cliente(models.Model):
  nome = models.CharField(max_length=255)
  cpf = models.CharField(max_length=14, unique=True)
  telefone = models.CharField(max_length=20, blank=True)
  endereco = models.CharField(max_length=255, blank=True)
  data_nascimento = models.CharField(null=True, blank=True)

  def __str__(self):
    return self.nome

class Veiculo(models.Model):
  marca = models.CharField(max_length=100)
  modelo = models.CharField(max_length=100)
  tipo = models.CharField(max_length=100)
  cor = models.CharField(max_length=20)
  placa = models.CharField(max_length=15, unique=True)

  cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

  def __str__(self):
    return self.placa
  
class Procedimento(models.Model):
  nome = models.CharField(max_length=255)
  valor = models.DecimalField(max_digits=10, decimal_places=2)
  tempo_estimado = models.DurationField(
      help_text="Tempo estimado para o procedimento. Ex: '1:30:00' para 1h 30min."
  )
  descricao = models.TextField(blank=True, null=True)

  def __str__(self):
    return self.nome
  
class Insumo(models.Model):
  nome = models.CharField(max_length=255)
  valor = models.DecimalField(max_digits=10, decimal_places=2)
  descricao = models.TextField(blank=True, null=True)

  def __str__(self):
    return self.nome

class OrdemServico(models.Model):
  cliente = models.ForeignKey("Cliente", on_delete=models.CASCADE, related_name='ordens_cliente')
  veiculo = models.ForeignKey("Veiculo", on_delete=models.CASCADE, related_name='ordens_servico')
  data = models.DateTimeField(auto_now_add=True)
  insumos = models.ManyToManyField('Insumo', through='InsumoOrdemServico', related_name='ordens_de_servico')
  procedimentos = models.ManyToManyField(Procedimento)

  def __str__(self):
    return f"OS #{self.id} - {self.cliente.nome}"
  
  def calcular_valor_total(self):
    # 1. Calcular o total dos procedimentos
    total_procedimentos = self.procedimentos.aggregate(
      total=Sum('valor')
    )['total'] or Decimal('0.00')

    # 2. Calcular o total dos insumos
    total_insumos = self.insumoordemservico_set.aggregate(
      total=Sum(
        ExpressionWrapper(
          F('quantidade') * F('insumo__valor'),
          output_field=DecimalField()
        )
      )
    )['total'] or Decimal('0.00')

    # 3. Retornar a soma final
    valor_total = total_procedimentos + total_insumos
    return valor_total

class InsumoOrdemServico(models.Model):
  ordem_servico = models.ForeignKey('OrdemServico', on_delete=models.CASCADE)
  insumo = models.ForeignKey('Insumo', on_delete=models.CASCADE)
  quantidade = models.PositiveIntegerField(default=1)

  class Meta:
    # Garante que não se pode adicionar o mesmo insumo duas vezes na mesma OS
    unique_together = ('ordem_servico', 'insumo')

  def __str__(self):
    return f"{self.quantidade} x {self.insumo.nome} na OS #{self.ordem_servico.id}"

class Cobranca(models.Model):
  ordem_servico = models.ForeignKey('OrdemServico', on_delete=models.CASCADE)
  valor_total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  data_emissao = models.DateField(auto_now_add=True)

  def save(self, *args, **kwargs):
    if self.valor_total is None:
      self.valor_total = self.ordem_servico.calcular_valor_total()
    super().save(*args, **kwargs)

  def __str__(self):
    valor_str = f"R$ {self.valor_total}" if self.valor_total is not None else "Valor Pendente"
    
    try:
      os_id = self.ordem_servico.id
    except AttributeError:
      os_id = "Desconhecida"

    return f"Cobrança #{self.id} | OS #{os_id} | {valor_str}"