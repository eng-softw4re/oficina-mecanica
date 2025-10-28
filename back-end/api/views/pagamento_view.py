from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import Pagamento
from ..serializers import PagamentoSerializer

class PagamentoViewSet(viewsets.ModelViewSet): # Já vem com cadastrar e buscar na herança
    # Alterado para Pagamento
    queryset = Pagamento.objects.all()
    # Alterado para PagamentoSerializer
    serializer_class = PagamentoSerializer

    @action(detail=False, methods=['put'], url_path='update')
    def update_by_id(self, request):
        id = request.data.get("id")

        if not id:
            return Response(
            # Mensagem atualizada
            { "detail": "O campo ID é obrigatório para atualizar o pagamento." },
            status=status.HTTP_400_BAD_REQUEST
            )

        # Alterado para Pagamento
        pagamento = get_object_or_404(Pagamento, id=id)

        # Alterado para PagamentoSerializer
        serializer = PagamentoSerializer(pagamento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['delete'], url_path='delete')
    def delete_by_id(self, request):
        id = request.data.get("id")

        if not id:
            return Response(
            # Mensagem atualizada
                { "details": "Informe um ID válido para deletar o pagamento." },
                status=status.HTTP_400_BAD_REQUEST
            )
        # Alterado para Pagamento
        pagamento = get_object_or_404(Pagamento, id=id)
        pagamento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)