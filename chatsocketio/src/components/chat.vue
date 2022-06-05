<template>
    <div class="container">
        <div class="card mt-3">
            <div class="card-body">
                <dvi class="card-title">
                    <h3>Chat Socket.io Nodejs vuejs</h3>

                </dvi>
                <div class="card-body">
                    <div class="messages" v-for="(msg, index) in messages" :key="index">
                        <p class="text-left">
                            <span class="font-weight-bold">
                                {{msg.user}}: 
                            </span>    
                            {{msg.message}}
                        </p>
                    </div>
                </div>
                <div class="card-footer">
                    <form  @submit.prevent="sendMessage">
                        <div class="form-group">
                            <label for="user">User: </label>
                            <input type="text" v-model="user" class="form-control">
                        </div>
                        <div class="form-group" style="margin-top:25px;">
                            <label for="message">Message: </label>
                            <input type="text" v-model="message" class="form-control">
                        </div>
                        <button class="btn btn-primary" style="border-radius:50px; width:50%; margin: 35px;">Send</button>
                    </form>
                </div>
            </div>
        </div>
    
    </div>
</template>
<script>
    import io from 'socket.io-client'

    export default{
        data(){
            return{
                user: '',
                message: '',
                messages: [],
                socket:io('http://localhost:3000')
            }
        },
        methods:{
            sendMessage(e){
                e.preventDefault();
                this.socket.emit('sendMessage',{
                    user: this.user,
                    message: this.message
                });
                this.newMessage='';
            }
        }, 
        mounted(){
            this.socket.on('message', (data) =>{
                this.messages.push({
                    message: data.message,
                    user: data.user
                });
            })
        }
    }
</script>