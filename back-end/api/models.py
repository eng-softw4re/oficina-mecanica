from django.db import models

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
  #insumos = models.ManyToManyField(Insumo)
  def __str__(self):
    return f"OS #{self.id} - {self.cliente.nome}"
