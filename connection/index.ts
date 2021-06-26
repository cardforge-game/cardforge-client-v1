import Vue from "vue";
import { Client as ColyseusClient, Room } from "colyseus.js";
import Swal from "sweetalert2";

import { ROOM_NAME } from "./constants";
import { IRoom } from "~/@types";

export default new Vue({
    data() {
        return {
            client: new ColyseusClient(process.env.SERVER_ENDPOINT),
            room: undefined as Room<IRoom> | void,
            state: {
                phase: "WAITING",
            } as IRoom,
            temp: {
                username: "",
                host: false,
            },
        };
    },
    methods: {
        async createRoom(username: string) {
            try {
                this.room = await this.client.create<IRoom>(ROOM_NAME, {
                    name: username,
                });
                return true;
            } catch (e) {
                Swal.fire(
                    "That didn't work.",
                    `Unable to create a room.\nReason: ${e}`,
                    "error"
                );
                return false;
            }
        },

        async joinRoom(username: string, roomId: string) {
            try {
                this.room = await this.client.joinById<IRoom>(roomId, {
                    name: username,
                });
                return true;
            } catch (e) {
                Swal.fire(
                    "Hmm...",
                    `Unable to join the room ${roomId}.\nReason: ${e}`,
                    "error"
                );
                return false;
            }
        },
    },
});
