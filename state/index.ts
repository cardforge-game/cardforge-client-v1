import Vue from "vue";
import { Client as ColyseusClient, Room } from "colyseus.js";
import Swal from "sweetalert2";

import { ROOM_NAME } from "./constants";

export default new Vue({
    data() {
        return {
            client: new ColyseusClient(process.env.SERVER_ENDPOINT),
            room: undefined as Room<IRoom> | void,
        };
    },
    methods: {
        async createRoom() {
            try {
                this.room = await this.client.create<IRoom>(ROOM_NAME);
            } catch (e) {
                Swal.fire(
                    "That didn't work.",
                    `Unable to create a room.\nReason: ${e}`,
                    "error"
                );
            }
        },

        async joinRoom(roomId: string) {
            try {
                this.room = await this.client.join<IRoom>(roomId);
            } catch (e) {
                Swal.fire(
                    "Hmm...",
                    `Unable to join the room ${roomId}.\nReason: ${e}`,
                    "error"
                );
            }
        },
    },
});
