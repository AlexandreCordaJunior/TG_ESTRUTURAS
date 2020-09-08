package main

import "fmt"

type No struct {
	Valor   int
	Proximo *No
}

type Pilha struct {
	Topo *No
}

func (p *Pilha) empilhar(valor int) {
	novoNo := &No{
		Valor: valor,
	}
	novoNo.Proximo = p.Topo
	p.Topo = novoNo
}

func (p *Pilha) desempilhar() {
	if p.Topo == nil {
		fmt.Println("Erro ao tentar retirar um elemento de uma pilha vazia")
		return
	}
	p.Topo = p.Topo.Proximo
}

func (p *Pilha) printAll() {
	atual := p.Topo
	for atual != nil {
		fmt.Printf("%d ", atual.Valor)
		atual = atual.Proximo
	}
	fmt.Println()
}

func main() {
	p := &Pilha{}
	p.empilhar(5)
    p.printAll()
    p.empilhar(10)
    p.printAll()
    p.empilhar(15)
    p.printAll()
    p.empilhar(20)
    p.printAll()
    p.desempilhar()
    p.printAll()
    p.desempilhar()
    p.printAll()
}
