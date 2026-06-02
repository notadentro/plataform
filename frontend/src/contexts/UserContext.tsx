'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface User {
  uid: string;
  name: string;
  displayName?: string;
  username: string;
  email: string;
  profileImage: string;
  experience: number;
  instagramProfile?: string;
  linkedInProfile?: string;
}

interface UserContextType {
  user: User | null;
  isUserLoading: boolean;
  login: (name: string, username: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  addXP: (amount: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    uid: 'demo-user-123',
    name: 'Aluno Demo',
    displayName: 'Aluno Demo',
    username: 'aluno_demo',
    email: 'aluno@demo.com',
    profileImage: 'https://picsum.photos/seed/aluno_demo/200',
    experience: 0,
    instagramProfile: '',
    linkedInProfile: '',
  });
  const [isUserLoading, setIsUserLoading] = useState(false);

  // Sync with Firestore when user changes
  useEffect(() => {
    async function syncUserWithDb() {
      if (!user?.uid) return;
      
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Update local state with DB experience
          const data = userSnap.data();
          if (data.experience !== undefined && data.experience !== user.experience) {
            setUser(prev => prev ? { ...prev, experience: data.experience } : null);
          }
        } else {
          // Create document if it doesn't exist
          await setDoc(userRef, {
            name: user.name,
            email: user.email,
            username: user.username,
            experience: user.experience,
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error syncing user with Firestore:', error);
      }
    }

    syncUserWithDb();
  }, [user?.uid]);

  const login = async (name: string, username: string, email: string) => {
    setUser({
      uid: `user-${Date.now()}`, // Temporary mock ID, in a real app this comes from Auth
      name,
      displayName: name,
      username,
      email,
      profileImage: `https://picsum.photos/seed/${username}/200`,
      experience: 0,
      instagramProfile: '',
      linkedInProfile: '',
    });
  };

  const logout = async () => {
    setUser(null);
  };

  const addXP = async (amount: number) => {
    if (!user?.uid) return;

    // Optimistic UI update
    setUser(prev => prev ? { ...prev, experience: prev.experience + amount } : null);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        experience: increment(amount)
      });
    } catch (error) {
      console.error('Failed to add XP to Firestore:', error);
      // Revert optimistic update on failure
      setUser(prev => prev ? { ...prev, experience: prev.experience - amount } : null);
    }
  };

  return (
    <UserContext.Provider value={{ user, isUserLoading, login, logout, addXP }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}