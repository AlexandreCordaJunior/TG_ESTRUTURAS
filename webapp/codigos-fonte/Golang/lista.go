package main

import "fmt"

type No struct {
	Valor   int
	Proximo *No
}

type Lista struct {
	Topo    *No
	Tamanho int
}

func (l *Lista) inserir(valor, indice int) {
	if(indice > l.Tamanho){
		fmt.Printf("Não foi possível inserir, pois a lista tem %d elementos\n", l.Tamanho)
		return
	}
	novoValor := &No{
		Valor: valor,
	}

	var anterior *No = nil
	atual := l.Topo
	for i := 0; i < indice; i++ {
		anterior = atual
		atual = atual.Proximo
	}
	if anterior == nil {
		novoValor.Proximo = atual
		l.Topo = novoValor
	} else{
		novoValor.Proximo = atual
		anterior.Proximo = novoValor
	}
	l.Tamanho++
}

func (l *Lista) remover(indice int) {
	if l.Topo == nil {
		fmt.Printf("Erro ao tentar retirar um elemento de uma lista vazia\n")
		return
	}
	if l.Tamanho < indice {
		fmt.Printf("Erro ao tentar retirar um elemento inexistente de uma lista\n")
		return
	}
	var anterior *No = nil
	atual := l.Topo
	for i := 0; i < indice; i++ {
		anterior = atual
		atual = atual.Proximo
	}

	if anterior == nil {
		l.Topo = l.Topo.Proximo
	} else{
		anterior.Proximo = atual.Proximo
	}
}

func (l *Lista) printAll() {
	atual := l.Topo
	for atual != nil {
		fmt.Printf("%d ", atual.Valor)
		atual = atual.Proximo
	}
	fmt.Println()
}

func main() {
	l := &Lista{}
    l.inserir(5, 0)
    l.printAll()
    l.inserir(10, 0)
    l.printAll()
    l.inserir(15, 2)
    l.printAll()
    l.inserir(20, 1)
    l.printAll()
    l.remover(1)
    l.printAll()
    l.remover(0)
    l.printAll()
}
