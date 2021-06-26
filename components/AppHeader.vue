<template>
    <header>
        <span class="h5">CardFlow</span>

        <div class="right-side">
            <portal-target name="header"></portal-target>
        </div>
    </header>
</template>

<style scoped>
header {
    padding: 1rem;
    background: var(--dark);
    display: flex;
    align-items: center;
}

.h5 {
    color: var(--light);
}

.right-side {
    margin-left: auto;
}
</style>
