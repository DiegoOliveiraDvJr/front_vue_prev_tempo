<template>
    <div class="main">
      <div class="info">

        <h1 class="titulo">Previsão de Chuva Horária</h1>

        <div class="d-flex justify-content-center">
          <label class="label-bairro">Bairro:</label>
          <select @change="changeBairro" class="select-bairro">
              <option v-for="bairro in bairros" :key="bairro.id">{{ bairro.bairro }}</option>
          </select>
        </div>

        <div class="cards d-flex flex-wrap">
            <div class="card-tempo" v-for="card in initbairro.cards" :key="card.id">
              <span class="data-card">{{ card.data }} - {{ card.hora }}</span>
              <h3 class="fw-bold" :class="changeClass(card)">{{ card.descricao }}</h3>
            </div>
        </div>

        <div class="legendas d-flex flex-wrap">
            <div v-for="legenda in legendas" :key="legenda.id" class="lend">

                <span class="fw-bold" :class="changeClass(legenda)">{{ legenda.descricao }}</span>
                
                <span class="lend-mm"> - {{ legenda.mm }}</span>

            </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
      return {
        
        bairros:[
          
          {id: 0, bairro: 'Capocabana/RJ', cards:[
            {id:0, data: '08/12', hora: '13h', descricao: 'Chuva Forte'},
            {id:1, data: '08/12', hora: '15h', descricao: 'Chuva Moderada'},
            {id:2, data: '08/12', hora: '17h', descricao: 'Sem Chuva'},
            {id:3, data: '08/12', hora: '22h', descricao: 'Chuva Moderada'}
          ]},
          {id: 1, bairro: 'Catete/RJ', cards:[
            {id:0, data: '08/12', hora: '13h', descricao: 'Sem Chuva'},
            {id:1, data: '08/12', hora: '15h', descricao: 'Chuva Moderada'},
            {id:2, data: '08/12', hora: '19h', descricao: 'Chuva Fraca'}
          ]},
          {id: 2, bairro: 'Botafogo/RJ', cards:[
            {id:0, data: '08/12', hora: '10h', descricao: 'Sem Chuva'}
          ]},
          {id: 3, bairro: 'Flamengo/RJ', cards:[
            {id:0, data: '08/12', hora: '09h', descricao: 'Chuva Forte'}
          ]},
        ],
        legendas:[
          {id: 0, descricao: 'Sem Chuva', mm: ' < 0.2 mm'},
          {id: 1, descricao: 'Chuva Fraca', mm: '0.2 a < 5.0 mm'},
          {id: 2, descricao: 'Chuva Moderada', mm: '5.1 a a 25.0 mm'},
          {id: 2, descricao: 'Chuva Forte', mm: ' > 25.0 mm'}
        ],
        initbairro: []
      }
    },
    mounted() {
      this.initbairro = this.bairros[0];
    },
    methods: {
      changeBairro($event){

          this.initbairro = this.bairros.find(element => element.bairro === $event.target.value);

      },
      changeClass(legenda){

        if(legenda.descricao === 'Sem Chuva'){
          return 'lend-sem';
        }else if(legenda.descricao === 'Chuva Fraca'){
          return 'lend-fraca';
        }else if(legenda.descricao === 'Chuva Moderada'){
          return 'lend-moderada';
        }else{
          return 'lend-forte';
        }
      
      }
    },
}
</script>
<style scoped>
    .d-flex{
      display: flex;
    }
    .titulo{
      color: #fff;
      text-align: center;
    }
    .main{
      margin: 0 auto;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .label-bairro{
      color: #fff;
      margin: 10px;
      font-size: 20px;
    }
    .justify-content-center {
      justify-content: center;
    }
    .card-tempo {
      border-radius: 20px;
      border: 2px solid #fff;
      padding: 20px;
      margin: 10px;
      width: 200px;
      box-sizing: border-box;
    }
    .cards {
      margin-top: 50px;
    }
    .flex-wrap {
      flex-wrap: wrap;
    }
    .legendas {
      margin-top:20px;
    }
    .fw-bold{
      font-weight: 700;
    }
    .lend{
      margin: 5px 10px;
  
    }
    .lend-sem{
      color: #698635;
    }
    .lend-fraca{
      color: #2d44a0
    }
    .lend-moderada{
      color: #e2a011;
    }
    .lend-forte{
      color: #d3483eea;
    }
    .lend-mm{
      color: #a5b087;
    }
    .data-card{
      color:#a5b087
    }
    .select-bairro{
      border: 2px solid #fff;
      background: #160f24;
      color: #fff;
      border-radius: 10px;
    }
    .select-bairro:focus{
      outline: none;
    }
    
    @media(max-width:400px){
      .card-tempo{
        width: 160px;
      }
    }
    @media(max-width:510px){
      .card-tempo{
        width: 170px;
        margin: 0 auto;
        margin-top: 20px;
      }
    }
</style>