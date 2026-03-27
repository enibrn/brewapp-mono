import { Client, Account, type Models } from 'appwrite';

import type { AuthService, BackendService } from './service';
import type { MyUser, CloudConfig } from './types';

import { MyResult } from './result';

class AppwriteAuthService implements AuthService {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  async login(email: string, password: string): Promise<MyResult<MyUser>> {
    try {
      await this.account.createEmailPasswordSession(email, password);
      const user = await this.account.get();
      return MyResult.success(this.mapUser(user));
    } catch (error) {
      return MyResult.failure(error);
    }
  }

  async logout(): Promise<MyResult<void>> {
    try {
      await this.account.deleteSession('current');
      return MyResult.success(undefined);
    } catch (error) {
      return MyResult.failure(error);
    }
  }

  async init(): Promise<MyResult<MyUser|null>> {
    try {
      const user = await this.account.get();
      return MyResult.success(this.mapUser(user));
    } catch (error) {
      // per ora facciamo finta che l'errore sia sempre che l'utente non è loggato
      // in realtà dovremmo controllare il tipo di errore e fare un'azione diversa
      return MyResult.success(null);
    }
  }

  private mapUser(user: Models.User<Models.Preferences>): MyUser {
    return {
      id: user.$id,
      email: user.email
    };
  }
}

class AppwriteBackendService implements BackendService {
  public auth: AuthService | null = null;
  private client: Client = new Client();

  async init(config: CloudConfig): Promise<MyResult<void>> {
    const initializeAuth = async () => {
      const account = new Account(this.client);
      this.auth = new AppwriteAuthService(account);
      await this.auth.init();
    }

    try {
      this.client
      .setEndpoint(config.endpoint)
      .setProject(config.projectId);

      await initializeAuth();
      return MyResult.success(undefined);
    } catch (error) {
      return MyResult.failure(error);
    }
  }
}