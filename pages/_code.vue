<template>
    <main>
        <ClockBar />

        <ViewWaiting v-if="connection.state.phase === 'WAITING'" />
        <ViewCreating v-else-if="connection.state.phase === 'CREATING'" />
        <ViewBuying v-else-if="connection.state.phase === 'BUYING'" />
        <ViewFighting v-else-if="connection.state.phase === 'FIGHTING'" />
        <ViewResults v-else-if="connection.state.phase === 'RESULTS'" />
    </main>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import Vue from "vue";
import connection from "~/connection";

export default Vue.extend({
    data() {
        return {
            interval: -1,
        };
    },
    computed: {
        connection() {
            return connection;
        },
        code() {
            return this.$route.params.code;
        },
    },
    async mounted() {
        // joinee (didn't create it)
        if (!connection.temp.host && connection.temp.username.length > 0) {
            await connection.joinRoom(
                connection.temp.username,
                this.code.trim()
            );

            connection.temp = {
                host: false,
                username: "",
            };
        } else if (!connection.temp.host) {
            const res = await Swal.fire({
                title: "Enter in a username.",
                input: "text",
                inputLabel:
                    "Make it short, sweet, and representative of your greatness.",
                showCancelButton: true,
                inputValidator: (value) =>
                    value.trim().length === 0 ? "Type in a code." : null,
            });

            if (res.isDenied || res.isDismissed) {
                return this.$router.push("/");
            }

            await connection.joinRoom(res.value.trim(), this.code.trim());

            connection.temp = {
                host: false,
                username: "",
            };
        }

        connection.room?.onMessage("resetClock", (count: number) => {
            connection.time = count;
            clearInterval(this.interval);
            this.interval = window.setInterval(
                () => (connection.time -= 1000),
                1000
            );
        });
    },
});
</script>

<style scoped>
.code-display,
.code-display * {
    color: var(--primary);
}
</style>
