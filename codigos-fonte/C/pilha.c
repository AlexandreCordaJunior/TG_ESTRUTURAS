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
        return;
    }
    No *temporario = p->topo;
    p->topo = p->topo->proximo;
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
    empilhar(p, 5);
    printAll(p);
    empilhar(p, 10);
    printAll(p);
    empilhar(p, 15);
    printAll(p);
    empilhar(p, 20);
    printAll(p);
    desempilhar(p);
    printAll(p);
    desempilhar(p);
    printAll(p);
}