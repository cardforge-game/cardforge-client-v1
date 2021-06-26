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
    display: flex;
    flex-direction: column;
}

.page {
    flex: 1;
}
</style>
