import type { UserModel } from '$/api/@types';
import { atom } from 'jotai';

export const userAtom = atom<UserModel | null>(null);
