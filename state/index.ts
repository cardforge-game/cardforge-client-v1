import Vue from "vue";

export default new Vue({
    data(): IRoom {
        return {
            phase: "WAITING",
            players: [],
            currentRound: 0,
            cardLibrary: [],
        };
    },
});
