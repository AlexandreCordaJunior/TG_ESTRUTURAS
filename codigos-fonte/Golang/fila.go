package main

import "fmt"

type No struct {
	Valor   int
	Proximo *No
}

type Fila struct {
	Cabeca *No
	Cauda  *No
}

func (f *Fila) enfileirar(valor int) {
	novoNo := &No{
		Valor: valor,
	}
	if f.Cabeca == f.Cauda && f.Cabeca == nil {
		f.Cabeca = novoNo
		f.Cauda = novoNo
	} else {
		f.Cauda.Proximo = novoNo
		f.Cauda = novoNo
	}
}

func (f *Fila) desenfileirar() {
	if f.Cabeca == f.Cauda && f.Cabeca == nil {
		fmt.Println("Erro ao tentar retirar um elemento de uma fila vazia")
		return
	}

	if f.Cabeca == f.Cauda {
		f.Cabeca = nil
		f.Cauda = nil
	} else {
		f.Cabeca = f.Cabeca.Proximo
	}
}

func (f *Fila) printAll() {
	atual := f.Cabeca
	for atual != nil {
		fmt.Printf("%d ", atual.Valor)
		atual = atual.Proximo
	}
	fmt.Println()
}

func main() {
	f := &Fila{}
	f.enfileirar(5)
	f.printAll()
	f.enfileirar(10)
	f.printAll()
	f.enfileirar(15)
	f.printAll()
	f.enfileirar(20)
	f.printAll()
	f.desenfileirar()
	f.printAll()
	f.desenfileirar()
    f.printAll()
}
