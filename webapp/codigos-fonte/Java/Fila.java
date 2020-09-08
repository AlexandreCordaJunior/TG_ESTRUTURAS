public class Fila {

    private No cabeca;
    private No cauda;

    public Fila() {
    }

    public No getCabeca() {
        return cabeca;
    }

    public void setCabeca(No cabeca) {
        this.cabeca = cabeca;
    }

    public No getCauda() {
        return cauda;
    }

    public void setCauda(No cauda) {
        this.cauda = cauda;
    }

    public void enfileirar(int valor) {
        No novoNo = new No(valor);
        novoNo.valor = valor;
        novoNo.proximo = null;

        if(this.cabeca == this.cauda && this.cabeca == null) {
            this.cabeca = this.cauda = novoNo;
        }
        else{
            this.cauda.proximo = novoNo;
            this.cauda = novoNo;
        }
    }

    public void desenfileirar() {
        if(this.cabeca == this.cauda && this.cabeca == null){
            System.out.println("Erro ao tentar retirar um elemento de uma fila vazia");
            return;
        }

        if(this.cabeca == this.cauda){
            this.cabeca = this.cauda = null;
        }
        else{
            this.cabeca = this.cabeca.proximo;
        }
    }

    public void printAll() {
        No atual = this.cabeca;
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
        Fila f = new Fila();
        f.enfileirar(5);
        f.printAll();
        f.enfileirar(10);
        f.printAll();
        f.enfileirar(15);
        f.printAll();
        f.enfileirar(20);
        f.printAll();
        f.desenfileirar();
        f.printAll();
        f.desenfileirar();
        f.printAll();
    }
}
