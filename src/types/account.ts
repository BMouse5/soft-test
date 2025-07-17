export interface Label {
    text: string
}

export type AccountType = 'LDAP' | 'Local'

export interface Account {
    id: string,
    labels: Label[],
    type: AccountType,
    login: string,
    password: string | null,
    errors: {
        login: boolean;
        password: boolean;
    };
}