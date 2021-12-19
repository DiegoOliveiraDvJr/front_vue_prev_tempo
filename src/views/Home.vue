<template>
    <div class="main">
      <div class="info">

        <h1 class="titulo mb-5">Previsão de Chuva Horária</h1>
        <h3 class="text-white text-center">{{ cidade }}</h3>
        <div class="d-flex justify-content-center mb-5 "><input type="tex" class="px-2" placeholder="Buscar cidade"></div>
        <div class="d-flex justify-content-center">
          <label class="label-bairro">Bairro:</label>
          <select @change="changeBairro" class="select-bairro">
              <option value="selecione">Selecione um bairro</option>
              <option v-for="bairro in bairros" :key="bairro.id">{{ bairro.name }}</option>
          </select>
        </div>

        <div class="cards d-flex flex-wrap" v-if="initbairro.previsoes">
            <div class="card-tempo" v-for="previsao in initbairro.previsoes" :key="previsao.id">
              <span class="data-card">{{ splitDataHora(previsao.diahora) }}</span>
              <h4 class="fw-bold" :class="changeClass(previsao)">{{ changePrev(previsao.legenda_id) }}</h4>
            </div>
        </div>

        <div class="legendas d-flex flex-wrap" v-if="initbairro.previsoes">
            <div v-for="legenda in legendas" :key="legenda.id" class="lend">

                <span class="fw-bold" :class="changeClass(legenda)">{{ legenda.status }}</span>
                
                <span class="lend-mm"> - {{ legenda.intervalo }}</span>

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
        cidade:'',
        bairros:[],
        legendas:[],
        initbairro:[],
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(){

          fetch(`http://127.0.0.1:8000/api/home`, {
              method: 'GET',
              headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          }).then(response => response.json())
          .then(res => {
              
            this.cidade = res.cidade.name;
            this.legendas = res.legendas;
            this.bairros = res.cidade.bairros;
            this.bairroInit = res.cidade.bairros[0];
              
          }).catch(function(error) {
            console.log(error.message);
          });

      },
      changeBairro($event){

          if( $event.target.value != 'selecione'){
            this.initbairro = this.bairros.find(element => element.name === $event.target.value);
          }else{
            this.initbairro = [];
          }
          
      },
      changeClass(legenda){

        let legend =  (this.legendas.find( e => e.id === legenda.id)).status;

        if(legend == 'Sem Chuva'){
          return 'lend-sem';
        }else if(legend == 'Chuva Fraca'){
          return 'lend-fraca';
        }else if(legend == 'Chuva Moderada'){
          return 'lend-moderada';
        }else{
          return 'lend-forte';
        }
      
      },
      changePrev(id){
          return (this.legendas.find( e => e.id === id)).status;
      },
      splitDataHora(str){
          const array = str.split(" ");
          let data = array[0].split("-");
          let hora = array[1].split(":");

          hora = hora[0];
          data = `${data[data.length-1]}/${data[data.length-2]}`;

          return `${data} - ${hora}h`;
      } 
      
    }
}
</script>
<style scoped>
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
    .card-tempo {
      border-radius: 20px;
      border: 2px solid #fff;
      padding: 20px;
      margin: 10px;
      width: 240px;
      box-sizing: border-box;
    }
    .cards {
      margin-top: 20px;
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
    .text-white{
      color:#fff;
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