package lista

data class No (var valor:Int, var proximo: No? = null)

data class Lista (var topo:No? = null, var tamanho:Int = 0) {
    fun inserir(valor:Int, indice:Int) {
        if(indice > tamanho) {
            println(String.format("Não foi possível inserir, pois a lista tem %d elementos\n", this.tamanho))
            return
        }

        val novoValor = No(valor)

        var anterior:No? = null
        var atual:No? = this.topo

        for(i in 0 until indice) {
            anterior = atual
            atual = atual?.proximo
        }

        anterior?.let {
            novoValor.proximo = atual
            anterior.proximo = novoValor
        } ?: let {
            novoValor.proximo = atual
            this.topo = novoValor
        }
        this.tamanho++
    }

    fun remover(indice:Int) {
        this.topo?: let {
            println("Erro ao tentar retirar um elemento de uma lista vazia")
            return
        }
        if(this.tamanho < indice) {
            println("Erro ao tentar retirar um elemento inexistente de uma lista")
            return
        }

        var anterior:No? = null
        var atual:No? = this.topo

        for(i in 0 until indice) {
            anterior = atual
            atual = atual?.proximo
        }

        anterior?.let {
            anterior.proximo = atual?.proximo
        } ?: let {
            this.topo = this.topo?.proximo
        }
    }

    fun printAll() {
        var atual = this.topo
        while (atual != null) {
            print(String.format("%d ", atual.valor))
            atual = atual.proximo
        }
        println()
    }
}

fun main() {
    val l = Lista()
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