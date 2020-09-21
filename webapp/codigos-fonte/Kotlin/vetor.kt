package vetor

data class Vetor (
        val TAMANHO:Int = 10,
        val vetor:Array<Int?> = arrayOfNulls(TAMANHO)
) {
    fun inserir(valor:Int, indice:Int) {
        if(indice < TAMANHO) {
            vetor[indice] = valor
        }
    }

    fun printAll() {
        for (i in 0 until TAMANHO) {
            print(vetor[i].toString() + " ")
        }
        println()
    }
}

fun main() {
    val v = Vetor()
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