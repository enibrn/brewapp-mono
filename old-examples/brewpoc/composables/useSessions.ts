import AppwriteService from '@/utils/appwrite';
import type { Models } from 'appwrite';
import { type Session, type SessionList } from '@/types/sessionTypes';

class SessionsUtility {
  static mapSessionList(sessionList: Models.SessionList): SessionList {
    return {
      total: sessionList.total,
      sessions: sessionList.sessions.map((session) => this.mapSession(session))
    } as SessionList;
  }

  static mapSession(session: Models.Session): Session {
    return {
      id: session.$id,
      client: `${session.clientName} ${session.clientVersion}`,
      os: `${session.osName} ${session.osVersion}`,
      device: `${session.deviceName} ${session.deviceBrand} ${session.deviceModel}`,
      location: session.countryName,
      ip: session.ip,
      current: session.current
    } as Session;
  }
}

export const useSessions = () => {
  const appwrite = new AppwriteService();
  const sessionStore = useMySessionStore();

  async function get(id: string): Promise<Models.Session> {
    return await appwrite.account.getSession(id);
  }

  async function list(): Promise<SessionList> {
    const data = await appwrite.account.listSessions();
    return SessionsUtility.mapSessionList(data);
  }

  async function deleteSession(id: string): Promise<void> {
    if (sessionStore.current?.$id === id) {
      await sessionStore.destroyCurrent();
      return;
    }

    await appwrite.account.deleteSession(id);
  }

  async function deleteSessions(): Promise<void> {
    await appwrite.account.deleteSessions();
  }

  return {
    get,
    list,
    deleteSession,
    deleteSessions
  };
};