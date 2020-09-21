package main

import "fmt"

const TAMANHO int = 10

type Vetor [TAMANHO]int

func (v *Vetor) inserir(valor, indice int) {
	if indice < TAMANHO {
		v[indice] = valor
	}
}

func (v *Vetor) printAll() {
	for i := 0; i < TAMANHO; i++ {
		fmt.Printf("%d ", v[i])
	}
	fmt.Println()
}

func main() {
	v := &Vetor{}
	v.inserir(15, 1)
	v.printAll()
	v.inserir(16, 0)
	v.printAll()
	v.inserir(151, 1)
	v.printAll()
	v.inserir(152, 0)
	v.printAll()
	v.inserir(153, 1)
	v.printAll()
	v.inserir(154, 1)
	v.printAll()
	v.inserir(155, 1)
	v.printAll()
}