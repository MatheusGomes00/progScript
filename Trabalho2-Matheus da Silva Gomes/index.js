const { createApp } = Vue;

createApp({
    data() {
        return {
            pokemons: [],
            filteredPokemons: [],
            loading: true,
            searchText: '',
            nextPage: 1,
        }
    },
    created() {
        this.callAPI();
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async callAPI() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${(this.nextPage - 1) * 151}&limit=${151}`)
                const data = await response.json();
                const pokemonDetailsPromises = data.results.map(async pokemon => this.fetchPokemonData(pokemon.url));
                const pokemonDetails = await Promise.all(pokemonDetailsPromises);
                this.pokemons = [...this.pokemons, ...pokemonDetails];
                this.filteredPokemons = this.pokemons; // Inicializa com todos os Pokémon
                this.nextPage++;
                this.loading = false;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchPokemonData(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return {
                    id: data.id,
                    name: data.name,
                    weight: data.weight,
                    types: data.types,
                    sprites: data.sprites,
                    showDetails: false,
                    typeCount: data.types.length // Adicionando contagem de tipos
                }
            } catch (e) {
                console.error(e);
            }
        },
        handleScroll() {
            const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            if (bottomOfWindow && !this.loading) {
                this.loading = true;
                this.callAPI();
            }
        },
        filterPokemons() {
            const searchTextLower = this.searchText.toLowerCase();
            this.filteredPokemons = this.pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTextLower)
            );
        },
        getTypeClass(pokemon) {
            const classTypeMap = {
                fire: '#c27e10',
                grass: '#4CAF50',
                water: '#00BFFF',
                bug: '#98e880',
                normal: '#A9A9A9',
                poison: '#9e5cda',
                electric: '#ffd365',
                ground: '#9e7e52',
                ghost: '#5626de',
                fighting: '#ba082a',
                psychic: '#e39fa4',
                rock: '#897975',
                ice: '#42bed3',
                steel: '#999999',
                dark: '#12124f',
                flying: '#23f1c7',
                fairy: '#f040f3',
                dragon: '#3263cc',
            };
        
            const type1Color = classTypeMap[pokemon.types[0].type.name];
            let type2Color = '';
        
            if (pokemon.types.length > 1) {
                type2Color = classTypeMap[pokemon.types[1].type.name];
                return { background: `linear-gradient(${type1Color}, ${type2Color})` }; // Usar gradiente para dois tipos
            }
        
            return { background: type1Color }; // Apenas um tipo, retornar a cor única
        }
    }
}).mount("#app");
