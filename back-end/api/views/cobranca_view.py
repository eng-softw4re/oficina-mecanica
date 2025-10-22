from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

# Altere '..' para o caminho correto dos seus models e serializers
from ..models import Cobranca
from ..serializers import CobrancaSerializer

class CobrancaViewSet(viewsets.ModelViewSet):
  """
  ViewSet para o modelo Cobranca.
  Fornece 'list' e 'create' (pela herança de ModelViewSet).
  E um 'delete_by_id' personalizado.
  """
  queryset = Cobranca.objects.all()
  serializer_class = CobrancaSerializer

  # O método @action(detail=False, methods=['put']...) foi omitido,
  # conforme solicitado.

  @action(detail=False, methods=['delete'], url_path='delete')
  def delete_by_id(self, request):
    """
    Deleta uma cobrança esperando o 'id' no corpo (body) da requisição.
    """
    # Pega o 'id' do corpo da requisição
    id = request.data.get("id")

    if not id:
      return Response(
        # Mensagem atualizada para "cobrança"
        { "details": "Informe um ID válido para deletar a cobrança." },
        status=status.HTTP_400_BAD_REQUEST
      )
    
    # Busca o objeto Cobranca ou retorna 404
    cobranca = get_object_or_404(Cobranca, id=id)
    cobranca.delete()
    
    # Retorna 204 No Content, que é o padrão para DELETE bem-sucedido
    return Response(status=status.HTTP_204_NO_CONTENT)