package pilha

data class No (var valor:Int, var proximo: No? = null)

data class Pilha (var topo:No? = null) {
    fun empilhar(valor:Int) {
        val novoNo = No(valor)
        novoNo.proximo = this.topo
        this.topo = novoNo
    }

    fun desempilhar() {
        this.topo?: let {
            println("Erro ao tentar retirar um elemento de uma pilha vazia");
            return
        }
        this.topo = this.topo?.proximo
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
    val p = Pilha();
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