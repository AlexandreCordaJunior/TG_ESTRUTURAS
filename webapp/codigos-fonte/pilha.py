class No:
    def __init__(self, valor, proximo):
        self.valor = valor
        self.proximo = proximo


class Pilha:
    def __init__(self):
        self.topo = None

    def empilhar(self, valor):
        novo = No(valor, self.topo)
        self.topo = novo
    
    def desempilhar(self):
        if(self.topo == None):
            print("Não pode retirar um elemento de uma pilha vazia")
            return

        temporario = self.topo
        self.topo = self.topo.proximo
        valor = temporario.valor
        


def printAll(fila):
    atual = fila.topo
    while(atual != None):
        print(atual.valor, end=" ")
        atual = atual.proximo
    print()


p = Pilha()
for i in range(10):
    p.empilhar(i)
    printAll(p)

for i in range(10):
    printAll(p)
    p.desempilhar()