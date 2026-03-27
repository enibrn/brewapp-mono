export interface IUseAuth {
    login(user: string, pass: string): Promise<boolean>;
}