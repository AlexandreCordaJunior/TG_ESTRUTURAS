const TAMANHO = 10;

function VetorFactory() {
    const vetorObj = [];
    for(let i = 0; i < TAMANHO; i++) {
        vetorObj.push(undefined);
    }

    return {
        vetorObj,

        inserir(valor, indice) {
            if(indice < TAMANHO) {
                this.vetorObj[indice] = valor;
            }
        },

        printAll() {
            let string = "";
            for(let i = 0; i < TAMANHO; i++) {
                string += `${this.vetorObj[i]} `;
            }
            console.log(string);
        }
    };
}

v = VetorFactory();
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