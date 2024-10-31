const { createApp } = Vue;

createApp({
    data() {
        return {
            primeiroNome: '',
            ultimoNome: '',
            ligado: false,
            entradaDesligada: ''
        }
    },
    methods: {
        alternar() {
            this.ligado = !this.ligado;
        },
        verificarEntrada() {
            if (this.entradaDesligada.toLowerCase() === 'ligar') {
                this.ligado = true;
            } else if (this.entradaDesligada.toLowerCase() === 'desligar') {
                this.ligado = false;
            }
        }
    }
}).mount('#app');
 