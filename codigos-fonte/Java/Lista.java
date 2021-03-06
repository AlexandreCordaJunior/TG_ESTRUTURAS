public class Lista {
    private No topo;

    private int tamanho;

    public Lista() {
        tamanho = 0;
    }

    public No getTopo() {
        return topo;
    }

    public void setTopo(No topo) {
        this.topo = topo;
    }

    public int getTamanho() {
        return tamanho;
    }

    public void setTamanho(int tamanho) {
        this.tamanho = tamanho;
    }

    public void inserir(int valor, int indice) {
        if(indice > this.tamanho){
            System.out.printf("Não foi possível inserir, pois a lista tem %d elementos\n", this.tamanho);
            return;
        }
        No novoValor = new No(valor);

        No anterior = null;
        No atual = this.topo;
        for(int i = 0; i < indice; i++){
            anterior = atual;
            atual = atual.proximo;
        }
        if(anterior == null){
            novoValor.proximo = atual;
            this.topo = novoValor;
        }
        else{
            novoValor.proximo = atual;
            anterior.proximo = novoValor;
        }
        this.tamanho++;
    }

    public void remover(int indice) {
        if(this.topo == null){
            System.out.println("Erro ao tentar retirar um elemento de uma lista vazia");
            return;
        }
        if(this.tamanho < indice){
            System.out.println("Erro ao tentar retirar um elemento inexistente de uma lista");
            return;
        }

        No anterior = null;
        No atual = this.topo;
        for(int i = 0; i < indice; i++){
            anterior = atual;
            atual = atual.proximo;
        }

        if(anterior == null){
            this.topo = this.topo.proximo;
        }
        else{
            anterior.proximo = atual.proximo;
        }
    }

    public void printAll() {
        No atual = this.topo;
        while(atual != null){
            System.out.printf("%d ", atual.valor);
            atual = atual.proximo;
        }
        System.out.println();
    }

    static class No {
        private int valor;
        private No proximo;

        public No(int valor) {
            this.valor = valor;
        }

        public int getValor() {
            return valor;
        }

        public void setValor(int valor) {
            this.valor = valor;
        }

        public No getProximo() {
            return proximo;
        }

        public void setProximo(No proximo) {
            this.proximo = proximo;
        }
    }

    public static void main(String[] args) {
        Lista l = new Lista();
        l.inserir(5, 0);
        l.printAll();
        l.inserir(10, 0);
        l.printAll();
        l.inserir(15, 2);
        l.printAll();
        l.inserir(20, 1);
        l.printAll();
        l.remover(1);
        l.printAll();
        l.remover(0);
        l.printAll();
    }
}
