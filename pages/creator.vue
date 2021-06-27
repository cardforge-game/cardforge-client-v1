<template>
    <main>
        <section class="cardPreview">
            <Card :size="30" :card="cardData"></Card>
        </section>
        <section>
            <form @submit.prevent="publishCard">
                 <h3>Card Stats</h3>

                <div>
                    <label>Card Name</label> <input v-model="cardData.name" placeholder="Lord of Darkness"
                        maxlength="25" required />
                </div>
                

                <div>
                    <label>Card Health</label> <input v-model="cardData.health" type="number" placeholder="10"
                        required />
                </div>
                <div>
                    <label>Card Image URL</label> <input v-model="cardData.imgURL"  placeholder="link.jpg"
                        required />
                </div>
                <br>
                <h3>Card Attacks</h3> <button @click="cardData.attacks.push({
                name:'',
                desc:''
            })" style="--normal-color: var(--success-darker); --active-color: var(--light)">Add Attack</button>
                <br>
                <div>
                    <p v-if="cardData.attacks.length === 0">You have no attacks setup! Click "Add Attack"</p>
                    <div v-for="(a,i) in cardData.attacks" :key="`attackCardCreation-${i}`">
                        <label>Attack Name</label><br>
                        <input v-model="a.name" placeholder="Slap" maxlength="20" required />
                        <br>
                        <textarea v-model="a.desc" maxlength="100"
                            :placeholder="`${cardData.name} slaps the enemy dealing 10 damage!`" required />
                        <br>
                            <button  @click="cardData.attacks.splice(i,1)" style="--normal-color: var(--danger)">Remove Attack</button>
                    </div>
            </div>
            <br>
            <div class="button-group"><button @click="previewCard" style="--normal-color:var(--primary-dark);">
                Preview Card
            </button> <button type="submit" style="--normal-color:var(--success-darker);">
                Publish Card
            </button></div>
            
        </form>
    </section>
</main>
</template>

<script>
import connection from "~/connection"
import Swal from "sweetalert2"

export default {
    methods:{
        publishCard(){
            connection.room?.send("submitCard",this.cardData)
        },
        previewCard(){
            connection.room?.send("previewCard",this.cardData)
        }
    },
    data(){
        return{
            cardData:{
                name:"",
                health:0,
                imgURL:"",
                attacks:[]
            }
        }
    },
    mounted() {
        if(!connection.eventRegistered && connection.room){
            connection.eventRegistered = true

            connection.room.onMessage("previewCard", (card)=>{
                this.cardData = card
            })

            connection.room.onMessage("cardAccepted", (card) => {
                Swal.fire({
                        title:"Card Accepted!",
                        icon:"success",
                        toast:true
                })
                this.cardData = {
                    name: "",
                    health: 0,
                    imgURL: "",
                    attacks: []
                }
            })
        }
    }
}
</script>

<style scoped>
    main{
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
    }
    main section{
        margin: 3rem 3rem;
    }
    @media only screen and (max-width: 700px) {
        main{
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
</style>