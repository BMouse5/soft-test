<template>
    <div class="account-editor">
        <div class="add-account">
            Учетные записи
            <n-button rect @click="accountStore.addAccount">
                <template #icon>
                    <n-icon size="30">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z" />
                        </svg>
                    </n-icon>
                </template>
            </n-button>
        </div>
        <div class="tooltip">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 64 64"
                enable-background="new 0 0 64 64" xml:space="preserve">
                <path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10"
                    d="M53.92,10.081c12.107,12.105,12.107,31.732,0,43.838c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838C22.186-2.027,41.813-2.027,53.92,10.081z" />
                <line stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="30" y1="43" x2="30" y2="47" />
                <path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M24,21c0-3,2-5,8-5c5,0,8,3,8,7s-6,7-6,7s-4,2-4,8v1" />
            </svg>
            <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
        </div>
        <account-form></account-form>
    </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../store/useAccountStore';
import AccountForm from '../components/AccountForm.vue';
import { onMounted } from 'vue';

const accountStore = useAccountStore()

onMounted(() => {
    accountStore.loadFromLocalStorage()
})
</script>

<style scoped lang="scss">
.account-editor {
    height: 100vh;
    padding: 40px 20px;
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .add-account {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
    }
    .tooltip {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: rgb(237, 237, 254);
        padding: 5px;
    }
}
</style>