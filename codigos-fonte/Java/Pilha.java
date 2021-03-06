public class Pilha {
    private No topo;

    public Pilha() {
    }

    public No getTopo() {
        return topo;
    }

    public void setTopo(No topo) {
        this.topo = topo;
    }

    public void empilhar(int valor) {
        No novoNo = new No(valor);
        novoNo.valor = valor;
        novoNo.proximo = this.topo;
        this.topo = novoNo;
    }

    public void desempilhar() {
        if(this.topo == null){
            System.out.println("Erro ao tentar retirar um elemento de uma pilha vazia");
            return;
        }
        this.topo = this.topo.proximo;
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
        Pilha p = new Pilha();
        p.empilhar(5);
        p.printAll();
        p.empilhar(10);
        p.printAll();
        p.empilhar(15);
        p.printAll();
        p.empilhar(20);
        p.printAll();
        p.desempilhar();
        p.printAll();
        p.desempilhar();
        p.printAll();
    }
}
