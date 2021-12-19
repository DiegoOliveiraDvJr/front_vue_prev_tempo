
export default {
    name: 'Guard',
    auth(to, from, next){

        var token = JSON.parse(localStorage.getItem('_user_token'));
        
        //ajax para o backend pra checar o token
        if(token){
            fetch(`http://127.0.0.1:8000/api/check`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization' : 'Bearer ' + token
                },
                
            }).then(response => response.json())
            .then(res => {
            
                if(res.status == 'ok'){
                    next();
                }else{
                    next('/login');
                }
            }).catch(() => { 
                next('/login');
            });
        }else{
            next('/login');
        }
  
    }
}