<template>
  <div @click="handleClick" class="card" :style="`width:${this.size}vw;height:${this.size * 1.4}vw;background:linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${card.imgURL});background-size:cover;
    background-position: center;`">
       <div class="cardHeader">
           <h1 class="cardTitle">{{card.name}}</h1>
       </div>
       
      <div class="cardContent">
          <div class="attackContainer">
              <div class="attack" v-for="(a,i) in card.attacks" :key="`attk-${i}`">
                 <p class="outline text-white"> {{a.name}}</p>
                 <div class="outline attackStats">
                     <p v-if="a.damage" class="attackStat text-white">{{a.damage}}⚔️</p>
                     <p v-if="a.heal" class="attackStat text-white">{{a.heal}}🩹</p>
                 </div>
                 <hr>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    props:{
        size:String,
        card:Object
    },
    methods:{
        handleClick(){
            this.$emit("click")
        }
    }
    
}

</script>

<style>
.attackStats{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.attackStat{
    font-size: 80%;
    white-space: nowrap;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.text-white{
    color:white;
}
.attack{
    display:grid;
    grid-template-columns: 4fr 1fr;
    
}
.attackContainer{
    color:white;
    text-align: left;
    margin-left:1rem;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    height:100%;
    justify-content: space-evenly;
}
.outline{
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
.cardContent{
    margin-top:4rem;
    margin-bottom:1rem;
    margin-left:1rem;
    margin-right:1rem;
    height:50%;

}
.cardTitle{
    overflow: hidden;
    color:azure;
    font-weight:bold;
    font-size: 140%;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    border-top-left-radius:10px;
    border-top-right-radius:10px;

}
.card{
    border: white solid 3px;
    min-width:100px;
    min-height:140px;
    text-align: center;
    display:inline-block;
    background-color: #b2bec3;
    border-radius:10px;
}
</style>