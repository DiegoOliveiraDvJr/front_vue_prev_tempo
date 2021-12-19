<template>
    <div class="mt-3 mb-5">
        <h1 class="text-center text-white">Painel de Controle</h1>
        <div class="d-flex justify-content-center">
            <select class="form-select select"  @change="changeCidade">
                <option v-for="cidade in cidades" :key="cidade.id">{{ cidade.name }}</option>
            </select>
        </div>
    </div>
    <div class="container" v-if="cidades.length">
        <div class="d-flex justify-content-between">
            <h2 class="text-white">Bairros</h2>
            <button class="btn btn-primary m-1">Adicionar bairro</button>
        </div>
        
        <table class="table text-white table-responsive">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">CEP</th>
                <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bairro in bairroinit" :key="bairro.id">
                    <th scope="row">{{ bairro.id }}</th>
                    <td>{{ bairro.name }}</td>
                    <td>{{ bairro.cep }}</td>
                    <td><button class="btn btn-primary m-1" @click="modalPrevisoes">Previsões</button><button class="btn btn-secondary m-1">Editar</button><button class="m-1 btn btn-danger">Remover</button></td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            token: JSON.parse(localStorage.getItem('_user_token')),
            cidades:[],
            bairroinit:[],
            controle:0
        }
    },
    created() {
      this.getData();
    },
    methods:{
         getData(){
            const token = this.token;
            fetch(`http://127.0.0.1:8000/api/dashboard`, {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                
            }).then(response => response.json())
            .then(res => {

                if(res.cidades){
                   this.cidades = res.cidades;
                   this.bairroinit = this.cidades[0]['bairros'];
                }
            }).catch(() => { 
               this.$router.push('/login');
            });
        },
        changeCidade($event){

            this.bairroinit = (this.cidades.find(element => element.name === $event.target.value))['bairros'];
          
        }
    },
    
}

</script>
<style scoped>
    .select{
        max-width: 250px;
    }
</style>
