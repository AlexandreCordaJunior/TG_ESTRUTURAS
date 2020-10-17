class No:
    def __init__(self, valor, proximo):
        self.valor = valor
        self.proximo = proximo


class Lista:
    def __init__(self):
        self.topo = None
        self.tamanho = 0

    def inserir(self, valor, indice):
        if indice > self.tamanho:
            print("Não foi possível inserir, pois a lista tem " + str(self.tamanho) + " elementos")
            return
        
        novo = No(valor, None)
        anterior = None
        atual = self.topo

        for i in range(indice):
            anterior = atual
            atual = atual.proximo
        
        if anterior == None:
            novo.proximo = atual
            self.topo = novo
        else:
            novo.proximo = atual
            anterior.proximo = novo
        self.tamanho += 1
    
    def remover(self, indice):
        if(self.topo == None):
            print("Não pode retirar um elemento de uma lista vazia")
            return
        
        if self.tamanho < indice:
            print("Erro ao tentar retirar um elemento inexistente de uma lista");
            return
        
        anterior = None
        atual = self.topo
        for i in range(indice):
            anterior = atual
            atual = atual.proximo

        temporario = atual

        if anterior == None:
            self.topo = self.topo.proximo
        else:
            anterior.proximo = atual.proximo


def printAll(fila):
    atual = fila.topo
    while(atual != None):
        print(atual.valor, end=" ")
        atual = atual.proximo
    print()


l = Lista()
l.inserir(5, 0)
printAll(l)
l.inserir(10, 0)
printAll(l)
l.inserir(15, 2)
printAll(l)
l.inserir(20, 1)
printAll(l)
l.remover(1)
printAll(l)
l.remover(0)
printAll(l)