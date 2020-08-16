class No:
    def __init__(self, valor, proximo):
        self.valor = valor
        self.proximo = proximo


class Fila:
    def __init__(self):
        self.cabeca = None
        self.cauda = None

    def enfileirar(self, valor):
        novo = No(valor, None)

        if self.cabeca == self.cauda and self.cabeca == None:
            self.cabeca = self.cauda = novo
        else:
            self.cauda.proximo = novo
            self.cauda = novo
    
    def desenfileirar(self):
        if self.cabeca == self.cauda and self.cabeca == None:
            print("Não pode retirar um elemento de uma fila vazia")
            return

        temporario = self.cabeca
        if self.cabeca == self.cauda:
            self.cabeca = self.cauda = None
        else:
            self.cabeca = self.cabeca.proximo
        
        valor = temporario.valor        


def printAll(fila):
    atual = fila.cabeca
    while(atual != None):
        print(atual.valor, end=" ")
        atual = atual.proximo
    print()


f = Fila()
for i in range(10):
    f.enfileirar(i)
    printAll(f)

for i in range(10):
    printAll(f)
    f.desenfileirar()