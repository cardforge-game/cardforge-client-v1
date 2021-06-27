import Vue from "vue";
import { Client as ColyseusClient, Room } from "colyseus.js";
import Swal from "sweetalert2";

import { ROOM_NAME } from "./constants";
import { IPlayer, IRoom } from "~/@types";

export default new Vue({
    data() {
        return {
            client: new ColyseusClient(process.env.SERVER_ENDPOINT),
            room: undefined as Room<IRoom> | void,
            eventRegistered: false,
            unsynced: {
                library: [],
            },
            state: {
                phase: "WAITING",
            } as IRoom,
            temp: {
                username: "",
                host: false,
            },
            time: -1,
        };
    },

    computed: {
        currentPlayer(): IPlayer | void {
            return (
                this.state.players &&
                this.room &&
                this.state.players[this.room.sessionId]
            );
        },
    },

    methods: {
        async createRoom(username: string) {
            try {
                this.room = await this.client.create<IRoom>(ROOM_NAME, {
                    name: username,
                });
                this.initEvents();
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
                this.initEvents();
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

        initEvents() {
            if (this.room) {
                this.room.removeAllListeners();
                this.eventRegistered = false;
                this.room.onStateChange.once((state) => {
                    this.state = JSON.parse(JSON.stringify(state));
                });
                this.room.onStateChange((state) => {
                    this.state = JSON.parse(JSON.stringify(state));
                    console.log(JSON.parse(JSON.stringify(state)));
                });
                this.room.onMessage("library", (lib) => {
                    this.unsynced.library = lib;
                });
                this.room.onMessage("profits", async (profit: number) => {
                    await Swal.fire({
                        title: "Profit!",
                        text: `You made $${profit} from players who bought your card!`,
                        toast: true,
                    });
                });
                this.room.onMessage("error", async (error: string) => {
                    await Swal.fire("Error", error, "error");

                    if (error.toLowerCase().includes("name already in use")) {
                        this.$router.push("/");
                    }
                });
            }
        },
    },
});
