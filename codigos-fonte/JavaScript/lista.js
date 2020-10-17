function NoFactory(valor, proximo) {
    return {
        valor,
        proximo
    };
}

function ListaFactory(topo) {
    return {
        topo,
        tamanho: 0,

        inserir(valor, indice) {
            if(indice > this.tamanho) {
                console.log(`Não foi possível inserir, pois a lista tem ${this.tamanho} elementos`);
                return;
            }
            const novoNo = NoFactory(valor);

            let anterior = null;
            let atual = this.topo;

            for(let i = 0; i < indice; i++) {
                anterior = atual;
                atual = atual.proximo;
            }

            if(!anterior) {
                novoNo.proximo = atual;
                this.topo = novoNo;
            }
            else {
                novoNo.proximo = atual;
                anterior.proximo = novoNo;
            }
            this.tamanho++;
        },

        remover(indice) {
            if(!this.topo) {
                console.log("Erro ao tentar retirar um elemento de uma lista vazia.");
                return;
            }

            if(this.tamanho < indice) {
                console.log("Erro ao tentar retirar um elemento inexistente de uma lista.");
                return;
            }

            let anterior = null;
            let atual = this.topo;

            for(let i = 0; i < indice; i++) {
                anterior = atual;
                atual = atual.proximo;
            }

            if(!anterior) {
                this.topo = this.topo.proximo;
            }
            else {
                anterior.proximo = atual.proximo;
            }
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

l = ListaFactory();
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