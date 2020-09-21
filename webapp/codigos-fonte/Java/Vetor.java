package Java;

public class Vetor {
    private final int TAMANHO = 10;
    private final Integer[] vet = new Integer[TAMANHO];

    public int getTAMANHO() {
        return TAMANHO;
    }

    public Integer[] getVet() {
        return vet;
    }

    public void inserir(int valor, int indice) {
        if(indice < TAMANHO) {
            vet[indice] = valor;
        }
    }

    public void printAll() {
        for(int i = 0; i < TAMANHO; i++) {
            System.out.printf("%d ", vet[i]);
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Vetor v = new Vetor();
        v.inserir(15, 1);
        v.printAll();
        v.inserir(16, 0);
        v.printAll();
        v.inserir(151, 1);
        v.printAll();
        v.inserir(152, 0);
        v.printAll();
        v.inserir(153, 1);
        v.printAll();
        v.inserir(154, 1);
        v.printAll();
        v.inserir(155, 1);
        v.printAll();
    }
}
