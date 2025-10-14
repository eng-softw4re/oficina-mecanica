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