function NoFactory(valor, proximo) {
    return {
        valor,
        proximo
    };
}

function PilhaFactory(topo) {
    return {
        topo,

        empilhar(valor) {
            const novoNo = NoFactory(valor, this.topo);
            this.topo = novoNo;
        },

        desempilhar() {
            if(!this.topo) {
                console.log("Erro ao tentar retirar um elemento de uma pilha vazia.");
                return;
            }

            this.topo = this.topo.proximo;
        },

        printAll() {
            let atual = this.topo;
            let string = "";
            while(atual) {
                string += `${atual.valor} `;
                atual = atual.proximo;
            }
            console.log(string);
        }
    };
}

const p = PilhaFactory();
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