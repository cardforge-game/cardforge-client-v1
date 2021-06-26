<template>
    <div id="root">
        <AppHeader />
        <Nuxt />
    </div>
</template>

<style>
#root {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}

main {
    flex: 1;
    background: var(--light);
}
</style>
