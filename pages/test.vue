<template>
    <main  class="deckbuilder">
        <section class="shopInventoryContainer">
            <div class="deckbuilderContent">
                <h1 class="sectionHeader">
                    Card Shop 🛒
                </h1>
                <div class="cardListing">
                         <div class="cardItem" v-for="(c,i) in cards" :key="`card-${i}`" >
                            <span class="cardPrice">Cost: {{c.cardCost}}</span>
                            <Card @click="buyCard(c.id)" v-for="(c, i) in inventory" :key="`card-${i}`" :card="c"
                                size="10"></Card>
                         </div>
                </div>
            </div>
            <div class="deckbuilderContent">
                <h1 class="sectionHeader">
                    Inventory 🎒
                </h1>
                 <div class="cardListing">
                   
                </div>
            </div>
        </section>
        <section class="deck">
            <div class="deckbuilderContent">
                <h1 class="sectionHeader">
                    Active Deck ⚡
                </h1>
            </div>
        </section>
    </main>
</template>

<script>
import connection from "~/connection"
export default {
    data() {
        return {
            cards: [],
            inventory: [],
        };
    },
    methods:{
        buyCard(id){
            connection.room?.send("buyCard",id)
        },
        addToDeck(index){
            connection.room?.send("addCardToDeck",index)
        },
        addToInv(index){
           connection.room?.send("addCardToDeck",index)
        }
    },
    mounted(){
        for(let i = 0; i < 5;i++){
            this.cards.push({
                id:"xd",
                name:"Senko Sanko " + i,
                health:100,
                cardCost:2,
                imgURL:"https://i.pinimg.com/originals/46/ba/83/46ba83a5a0266908308541742c53abd3.jpg",
                attacks:[
                    {name:"Tail Whip",damage:20},
                    {name:"Heal Smack",heal:40,damage:10}
                ]
            })
        }
    },
    methods: {},
};
</script>

<style>
.inline-block {
    display: inline-block;
}
.cardPrice {
    background-color: green;
}
.cardListing {
    max-height: 35vh;
    overflow: scroll;
    overflow-x: hidden;
}
.cardListing .card {
    margin: 1%;
}
.deckbuilderContent {
    background-color: #acc6d3;
}
.shopInventoryContainer {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    gap: 2rem;
}
.deckbuilder {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-width: 80vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 2vw;
}
.sectionHeader {
    margin-left: 2em;
    margin-top: 1em;
    font-size: max(20px, 2vw);
    font-weight: bold;
}
</style>
