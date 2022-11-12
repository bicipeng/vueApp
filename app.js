const app = Vue.createApp({
    data:function(){
        return {
            greeting:"Hello again!",
            isVisible:false
        }
    }, 
    methods:{
        toggleBox(){
            this.isVisible = ! this.isVisible;

        },
        greet(input){
            console.log(input)
        }
    }
})
app.component('login-form',{
      // v-bind:label : emailLabale => you are passing the email lablel down to the custom_input component 
    // as label, and in the custom_input component, you use the props array to indicate you are receiving 
    // label as props 
    //:label is a short -hand for v-bind(passing data to child component )
    template:`
    <form @submit.prevent="handleSubmit">
    <h3>{{title}}</h3>
    <custom-input 
    v-for = "(input,i) in inputs"
    :key = "i" 
    v-model="input.value"  
    v-bind:label ="input.label"
    v-bind:type="input.type"/>
   
    <button>Log In</button>
    </form>
    `
    ,
    // register the custom_input component in the login-form, where we want to embeded
    //the custom-input component in 
    component:['custom-input'],
    data(){
        return{
            title:"Login Form",
            inputs:[
                {
                type:"email",
                value:"",
                label:"Email"
            },
            {
                type:"password",
                value:"",
                label:"Password"
            }
            ],
            // email:"",
            // password:"",
            // emailLabel:'Email',
            // passwordLabel:"Password"     
           }
    },
    methods:{
        handleSubmit(e){
            e.preventDefault();
            console.log(this.inputs[0].value,this.inputs[1].value)
        }
    }
})
app.component('custom-input',{
    template:`
    <label>
    {{label}}
    <input v-bind:type = "type" v-model="inputValue">
    </label>
    `,
    //custom-input reciep the lable as a data passed down from parent component 
    //modelValue is passed in by v-mode for example, v-mode="email" is equvalent to  :modelVlaue = email 
    props:['label', "type",'modelValue'],
    //computed you can put value here as key
    computed:{
        inputValue:{
            get(){
                return this.modelValue;

            },
            set(value){
                
                //emit event that other components can listen to 
                //the first param is the type of the event you are emitting, the 
                //second param is the actual value you are passing through the event
                //v-model in the parent component is listening to the update event you are emitting from the child
                //why use setter and getter??
                //in the child componnet you cannot change the data passed in from parent components:immutable
                //so you have to use the setter, this.$emit to update the value you changed(typed) to the parent
                //and in the parent component, the v-model is listening to the event emitted from the child

                this.$emit('update:modelValue', value);
            }
        }

    }
    // data(){
    //     return {
    //         inputValue:""
    //     }
    // }
})
app.mount("#app")