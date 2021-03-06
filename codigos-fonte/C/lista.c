#include <stdio.h>
#include <stdlib.h>

struct no {
    int valor;
    struct no *proximo;
};

typedef struct no No;

struct lista {
    No *topo;
    int tamanho;
};

typedef struct lista Lista;

Lista *criarLista(){
    Lista *l = (Lista *) malloc(sizeof(Lista));
    l->topo = NULL;
    l->tamanho = 0;
    return l;
}

void inserir(Lista *l, int valor, int indice) {
    if(indice > l->tamanho){
        printf("Não foi possível inserir, pois a lista tem %d elementos\n", l->tamanho);
        return;
    }
    No *novoValor = (No *) malloc(sizeof(No));
    novoValor->valor = valor;

    No *anterior = NULL;
    No *atual = l->topo;
    for(int i = 0; i < indice; i++){
        anterior = atual;
        atual = atual->proximo;
    }
    if(anterior == NULL){
        novoValor->proximo = atual;
        l->topo = novoValor;
    }
    else{
        novoValor->proximo = atual;
        anterior->proximo = novoValor;
    }
    l->tamanho++;
}

void remover(Lista *l, int indice){
    if(l->topo == NULL){
        printf("Erro ao tentar retirar um elemento de uma lista vazia\n");
        return;
    }
    if(l->tamanho < indice){
        printf("Erro ao tentar retirar um elemento inexistente de uma lista\n");
        return;
    }
    No *anterior = NULL;
    No *atual = l->topo;
    for(int i = 0; i < indice; i++){
        anterior = atual;
        atual = atual->proximo;
    }

    No *temporario = atual;

    if(anterior == NULL){
        l->topo = l->topo->proximo;
    }
    else{
        anterior->proximo = atual->proximo;
    }
    free(temporario);
}

void printAll(Lista *l){
    No *atual = l->topo;
    while(atual != NULL){
        printf("%d ", atual->valor);
        atual = atual->proximo;
    }
    printf("\n");
}

int main() {
    Lista *l = criarLista();
    inserir(l, 5, 0);
    printAll(l);
    inserir(l, 10, 0);
    printAll(l);
    inserir(l, 15, 2);
    printAll(l);
    inserir(l, 20, 1);
    printAll(l);
    remover(l, 1);
    printAll(l);
    remover(l, 0);
    printAll(l);
}