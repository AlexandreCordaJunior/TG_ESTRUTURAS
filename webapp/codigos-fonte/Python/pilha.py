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
        

def printAll(fila):
    atual = fila.topo
    while(atual != None):
        print(atual.valor, end=" ")
        atual = atual.proximo
    print()


p = Pilha()
p.empilhar(5)
printAll(f)
p.empilhar(10)
printAll(f)
p.empilhar(15)
printAll(f)
p.empilhar(20)
printAll(f)
p.desempilhar()
printAll(f)
p.desempilhar()
printAll(f)