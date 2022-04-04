new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: [],
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            /* computa os dados no log somente quanto mostro estiver morto 
                mostrando o estatus que o jogador verceu */
            if(this.monsterLife > 0){
                this.hurt('playerLife', 7, 12, false, 'Montro', 'Jogador', 'monster')
            }
        },
        // os atributos monsterLife e palyerLife são passados como parametros para a função hurt, no caso para o atributo prop
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            /* unshift : cologa o elemento na primeira posição do array
                o log mais recente fica no top e os mais aantigos para o final da lista. */
            this.logs.unshift({ text, cls })
        }


    },
    watch: {
        hasResult(value) {
            if (value) this.running = false 
        }
    }
})