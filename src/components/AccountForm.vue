<template>
    <div class="account-form">
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th class="col-labels">Метки</th>
                    <th class="col-type">Тип записи</th>
                    <th class="col-login">Логин</th>
                    <th class="col-password">Пароль</th>
                    <th class="col-actions"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.id">
                    <td>
                        <n-input
                            :value="labelsToString(account.labels)"
                            @update:value="(value: string) => handleLabelInput(account.id, value)"
                            @blur="handleLabelBlur(account.id)"
                            type="text"
                            placeholder="метка1; метка2"
                            maxlength="50"
                        />
                    </td>
                    <td>
                        <n-select
                            :value="account.type"
                            @update:value="(value: AccountType) => handleTypeChange(account.id, value)"
                            :options="typeOptions"
                        />
                    </td>
                    <td :colspan="account.type === 'LDAP' ? 2 : 1">
                         <n-input
                            :value="account.login"
                            @update:value="(value: string) => store.updateAccountField(account.id, 'login', value)"
                            @blur="store.validateAndSave(account.id)"
                            type="text"
                            placeholder="Обязательное поле"
                            :status="account.errors.login ? 'error' : undefined"
                            maxlength="100"
                        />
                    </td>
                    <td v-if="account.type === 'Local'">
                        <n-input
                           :value="account.password"
                           @update:value="(value: string) => store.updateAccountField(account.id, 'password', value)"
                           @blur="store.validateAndSave(account.id)"
                           type="password"
                           show-password-on="mousedown"
                           placeholder="Обязательное поле"
                           :status="account.errors.password ? 'error' : undefined"
                           maxlength="100"
                        />
                    </td>
                    <td class="delete-icon-cell">
                        <n-button text @click="store.deleteAccount(account.id)">
                            <template #icon>
                                <n-icon class="delete-icon" size="20">
                                     <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z" />
                                    </svg>
                                </n-icon>
                            </template>
                        </n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
        <div v-if="!accounts.length" class="empty-state">
            Список учетных записей пуст. Нажмите "+", чтобы добавить новую.
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAccountStore } from '../store/useAccountStore';
import type { Label, AccountType } from '../types/account';

const store = useAccountStore();
const accounts = computed(() => store.accounts);

const typeOptions = ref([
    { label: "Локальная", value: "Local" as AccountType },
    { label: "LDAP", value: "LDAP" as AccountType }
]);

const labelInputValues = ref<Record<string, string>>({});

const labelsToString = (labels: Label[]): string => {
    const account = accounts.value.find(i => i.labels === labels);
    if (account && labelInputValues.value[account.id] !== undefined) {
        return labelInputValues.value[account.id];
    }
    return labels.map(l => l.text).join('; ');
}

const handleLabelInput = (id: string, value: string) => {
    labelInputValues.value[id] = value;
}

const handleLabelBlur = (id: string) => {
    if (labelInputValues.value[id] !== undefined) {
        store.updateAccountLabels(id, labelInputValues.value[id]);
        store.validateAndSave(id);
        delete labelInputValues.value[id];
    }
}

const handleTypeChange = (id: string, value: AccountType) => {
    store.updateAccountField(id, 'type', value);
    store.validateAndSave(id);
}
</script>

<style scoped lang="scss">
.account-form {
    th {
        font-weight: bold;
    }
    td,
    th {
        padding: 8px;
        vertical-align: middle;
        text-align: left;
    }

    .col-labels { width: 25%; }
    .col-type { width: 15%; }
    .col-login { width: 27.5%; }
    .col-password { width: 27.5%; }
    .col-actions { width: 5%; }

    .delete-icon-cell {
        text-align: center;
        .delete-icon {
            cursor: pointer;
            color: #555;
            transition: color 0.3s ease;
            &:hover {
                color: #e53935;
            }
        }
    }

    .empty-state {
        text-align: center;
        padding: 20px;
        color: #888;
        font-style: italic;
        background-color: #fafafa;
        border: 1px dashed #ddd;
        margin-top: 10px;
        border-radius: 4px;
    }
}
</style>