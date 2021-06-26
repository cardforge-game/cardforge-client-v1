<template>
    <main>
        {{ connection.state }}
        <section v-if="connection.state.phase === 'WAITING'">
            <portal to="header">
                <div class="code-display"><b>Code:</b> {{ code }}</div>
            </portal>
            waiting
        </section>
        <section v-else-if="connection.state.phase === 'CREATING'">
            creating
        </section>
        <section v-else-if="connection.state.phase === 'DECK'">deck</section>
        <section v-else-if="connection.state.phase === 'FIGHT'">fight</section>
    </main>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import Vue from "vue";

import connection from "~/connection";

export default Vue.extend({
    computed: {
        connection() {
            return connection;
        },
        code() {
            return this.$route.params.code;
        },
        type(): "c" | "j" {
            return this.$route.params.type as "c" | "j";
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
            const { value: username } = await Swal.fire({
                title: "Enter in a username.",
                input: "text",
                inputLabel:
                    "Make it short, sweet, and representative of your greatness.",
                showCancelButton: true,
                inputValidator: (value) =>
                    value.trim().length === 0 ? "Type in a code." : null,
            });

            await connection.joinRoom(username, this.code.trim());

            connection.temp = {
                host: false,
                username: "",
            };
        }
       
    },
});
</script>

<style scoped>
.code-display,
.code-display * {
    color: var(--primary);
}
</style>
