<template>
<router-link to="/"><span class="voltar"> Voltar a página inicial </span></router-link>
    <div class="login">

        <form class="form-login" @submit.prevent="login">
            <h3>Login do Administrador</h3>
            <div class="item">
                <input type="email" v-model="user.email" name="email" placeholder="E-mail" required>
            </div>
            <div class="item">
                <input type="password" v-model="user.password" name="password" placeholder="Senha" required>
            </div>
            <small v-if="auth === false" class="incorret">Login incorreto</small>
            <input type="submit" value="Enviar" class="btn-envia">
        </form>
        
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            user:{
                email: '',
                password: ''
            },
            auth:null,
        }
    },
    methods: {
        login() {
            const payload = JSON.stringify(this.user); 
            
            
            fetch(`http://127.0.0.1:8000/api/login`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: payload
            }).then(response => response.json())
            .then(res => {
                
                if(res.access_token){
                    localStorage.setItem('_user_token', JSON.stringify(res.access_token));
                    this.$router.push('/dashboard');
                }else{
                    this.auth = false;
                }
                
            });
        }
    },
}
</script>
<style scoped>
    .voltar{
        position: absolute;
        top: 10px;
        left: 10px;
        color: #fff;
    }
    .login {
        widows: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .form-login{
        padding: 30px;
        background: #fff;
    }
    .form-login h3{
        color: #2c3e50;
    }
    .form-login .item{
        margin-bottom: 10px;
        position: relative;
    }
    .form-login input
     {
        padding: 10px;
        font-size: 16px;
        color: #2c3e50;
        background: #ccc;
        width: 100%;
    }
    .form-login .btn-envia{
        width: 100%;
        background: #2c3e50;
        color: #fff;
        cursor: pointer;
    }
    .incorret{
        color: #d84545;
    }
</style>