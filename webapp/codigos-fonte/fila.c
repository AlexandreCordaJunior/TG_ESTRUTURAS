#include <stdio.h>
#include <stdlib.h>

struct no {
    int valor;
    struct no *proximo;
};

typedef struct no No;

struct fila{
    No *cabeca;
    No *cauda;
};

typedef struct fila Fila;

void enfileirar(Fila *f, int valor) {
    No *novoNo = (No *) malloc(sizeof(No));
    novoNo->valor = valor;
    novoNo->proximo = NULL;

    if(f->cabeca == f->cauda && f->cabeca == NULL) {
        f->cabeca = f->cauda = novoNo;
    }
    else{
        f->cauda->proximo = novoNo;
        f->cauda = novoNo;
    }
}

void desenfileirar(Fila *f){
    if(f->cabeca == f->cauda && f->cabeca == NULL){
        printf("Erro ao tentar retirar um elemento de uma fila vazia\n");
        return;
    }
    No *temporario = f->cabeca;
    if(f->cabeca == f->cauda){
        f->cabeca = f->cauda = NULL;
    }
    else{
        f->cabeca = f->cabeca->proximo;
    }
    int valor = temporario->valor;
    free(temporario);
}

void printAll(Fila *f){
    No *atual = f->cabeca;
    while(atual != NULL){
        printf("%d ", atual->valor);
        atual = atual->proximo;
    }
    printf("\n");
}

Fila *criarFila(){
    Fila *f = (Fila *) malloc(sizeof(Fila));
    f->cabeca = f->cauda = NULL;
    return f;
}

int main() {
    Fila *f = criarFila();
    for(int i = 0; i < 10; i++){
        enfileirar(f, i);
        printAll(f);
    }
    for(int i = 0; i < 10; i++){
        desenfileirar(f);
        printAll(f);
    }
}