<template>
    <div class="account-form">
        <n-table>
            <thead>
                <tr>
                    <th style="width: 20%">Метки</th>
                    <th style="width: 15%">Тип записи</th>
                    <th style="width: 30%">Логин</th>
                    <th style="width: 30%">Пароль</th>
                    <th style="width: 5%"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <n-input v-model:value="markValue" type="text" placeholder="Значение" />
                    </td>
                    <td>
                        <n-select v-model:value="typeValue" :options="options" placeholder="Значение"/>
                    </td>
                    <td :colspan="typeValue === 'LDAP' ? 2 : 1">
                        <n-input v-model:value="loginValue" type="text" placeholder="Значение" />
                    </td>
                    <td v-if="typeValue !== 'LDAP'">
                        <n-input v-model:value="passwordValue" type="password" placeholder="Значение" />
                    </td>
                    <td>
                        <svg width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                            fill="#000000">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z" />
                        </svg>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const markValue = ref(null)
const typeValue = ref(null)
const loginValue = ref(null)
const passwordValue = ref(null)

const options = ref([
    {
        label: "Локальная",
        value: "Local"
    },
    {
        label: "LDAP",
        value: "LDAP"
    }
])
</script>

<style scoped lang="scss">
.account-form {
    table {
        td,
        th {
            padding: 8px;
            vertical-align: middle;

            // Подгонка ширины инпутов
            .n-input,
            .n-select {
                width: 100%;
            }
        }

        th:nth-child(1) {
            width: 20%;
        }
        th:nth-child(2) {
            width: 15%;
        }
        th:nth-child(3) {
            width: 30%;
        }
        th:nth-child(4) {
            width: 30%;
        }
        th:nth-child(5) {
            width: 5%;
        }

        .delete-icon-cell {
            text-align: center;
        }
    }
}

svg {
  cursor: pointer;

  path {
    transition: fill 0.3s ease;
  }

  &:hover path {
    fill: #e53935;
  }
}
</style>