#include <stdio.h>
#include <stdlib.h>

struct no {
    int valor;
    struct no *proximo;
};

typedef struct no No;

struct pilha{
    No *topo;
};

typedef struct pilha Pilha;

Pilha *criarPilha() {
    Pilha *p = (Pilha *) malloc(sizeof(Pilha));
    p->topo = NULL;
}

void empilhar(Pilha *p, int valor){
    No *novoNo = (No *) malloc(sizeof(No));
    novoNo->valor = valor;
    novoNo->proximo = p->topo;
    p->topo = novoNo;
}

void desempilhar(Pilha *p){
    if(p->topo == NULL){
        printf("Erro ao tentar retirar um elemento de uma pilha vazia\n");
    }
    No *temporario = p->topo;
    p->topo = p->topo->proximo;
    int valor = temporario->valor;
    free(temporario);
}

void printAll(Pilha *p){
    No *atual = p->topo;
    while(atual != NULL){
        printf("%d ", atual->valor);
        atual = atual->proximo;
    }
    printf("\n");
}

int main() {
    Pilha *p = criarPilha();
    for(int i = 0; i < 10; i++){
        empilhar(p, i);
        printAll(p);
    }
    for(int i = 0; i < 10; i++){
        desempilhar(p);
        printAll(p);
    }
}