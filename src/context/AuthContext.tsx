import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { db } from '../services/storage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  loginAsStudent: (identifier: string, pinOrPass: string) => Promise<{ success: boolean; message?: string }>;
  loginAsAdmin: (identifier: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  changeStudentPassword: (currentPin: string, newPin: string) => Promise<{ success: boolean; message?: string }>;
  quickDemoLogin: (role: 'admin' | 'siswa', specificId?: string) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => db.getCurrentUser());
  const [token, setToken] = useState<string | null>(() => db.getAuthToken());

  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = db.getCurrentUser();
      setUser(currentUser);
      setToken(db.getAuthToken());
    };

    window.addEventListener('infosekolah_db_updated', handleStorageChange);
    return () => window.removeEventListener('infosekolah_db_updated', handleStorageChange);
  }, []);

  const loginAsStudent = async (identifier: string, pinOrPass: string): Promise<{ success: boolean; message?: string }> => {
    const trimmedId = identifier.trim().toLowerCase();
    const allUsers = db.getAllUsers();
    
    // Check if user is actually an admin attempting to use student form
    const maybeAdmin = allUsers.find(
      (u) =>
        u.role === 'admin' &&
        (u.email.toLowerCase() === trimmedId || u.id.toLowerCase() === trimmedId || trimmedId === 'admin')
    );
    if (maybeAdmin) {
      return {
        success: false,
        message: 'Akses Ditolak: Akun ini terdaftar sebagai Administrator. Anda tidak dapat masuk melalui formulir siswa. Silakan pilih tab "Login Admin".',
      };
    }

    // Find matching student by NISN or email
    const student = allUsers.find(
      (u) =>
        u.role === 'siswa' &&
        (u.nisn?.toLowerCase() === trimmedId || u.email.toLowerCase() === trimmedId)
    );

    if (!student) {
      return {
        success: false,
        message: 'NISN atau Email Siswa tidak terdaftar di pangkalan data MTsN 2 Bombana.',
      };
    }

    if (student.status === 'Nonaktif') {
      return {
        success: false,
        message: 'Akun siswa berstatus non-aktif. Silakan hubungi bagian Tata Usaha madrasah.',
      };
    }

    // Student password verification: matches individual student.pin
    const expectedStudentPin = student.pin || '123456';
    if (pinOrPass.trim() !== expectedStudentPin) {
      return {
        success: false,
        message: 'Kata sandi / PIN siswa tidak cocok. Silakan periksa kembali atau hubungi pihak sekolah.',
      };
    }

    db.setCurrentUser(student);
    setUser(student);
    setToken(db.getAuthToken());
    return { success: true };
  };

  const loginAsAdmin = async (identifier: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    const trimmedId = identifier.trim().toLowerCase();
    const allUsers = db.getAllUsers();

    // Check if user is actually a student attempting to breach admin panel
    const maybeStudent = allUsers.find(
      (u) =>
        u.role === 'siswa' &&
        (u.nisn?.toLowerCase() === trimmedId || u.email.toLowerCase() === trimmedId)
    );
    if (maybeStudent) {
      return {
        success: false,
        message: 'Akses Ditolak: Akun siswa tidak memiliki hak akses Administrator. Silakan pilih tab "Login Siswa".',
      };
    }
    
    // Find matching admin by email or username
    const admin = allUsers.find(
      (u) =>
        u.role === 'admin' &&
        (u.email.toLowerCase() === trimmedId || u.id.toLowerCase() === trimmedId || trimmedId === 'admin')
    );

    if (!admin) {
      return {
        success: false,
        message: 'Akun Administrator tidak ditemukan atau belum diverifikasi.',
      };
    }

    // Strict Password verification: 'infosekolahmtsn2bombana12321'
    const expectedAdminPass = admin.pin || 'infosekolahmtsn2bombana12321';
    if (pass.trim() !== expectedAdminPass && pass.trim() !== 'infosekolahmtsn2bombana12321') {
      return {
        success: false,
        message: 'Kata sandi Administrator salah. Silakan masukkan kata sandi resmi administrator.',
      };
    }

    db.setCurrentUser(admin);
    setUser(admin);
    setToken(db.getAuthToken());
    return { success: true };
  };

  const changeStudentPassword = async (currentPin: string, newPin: string): Promise<{ success: boolean; message?: string }> => {
    if (!user || user.role !== 'siswa') {
      return { success: false, message: 'Hanya siswa terdaftar yang dapat memperbarui kata sandi profil siswa.' };
    }

    const expectedPin = user.pin || '123456';
    if (currentPin.trim() !== expectedPin) {
      return { success: false, message: 'Kata sandi saat ini yang Anda masukkan salah.' };
    }

    if (newPin.trim().length < 4) {
      return { success: false, message: 'Kata sandi baru minimal 4 karakter.' };
    }

    if (currentPin.trim() === newPin.trim()) {
      return { success: false, message: 'Kata sandi baru tidak boleh persis sama dengan kata sandi lama.' };
    }

    db.updateUserPassword(user.id, newPin.trim());
    const updatedUser = { ...user, pin: newPin.trim() };
    setUser(updatedUser);
    return { success: true, message: 'Kata sandi profil berhasil diperbarui! Silakan gunakan sandi baru ini saat login selanjutnya.' };
  };

  const quickDemoLogin = (role: 'admin' | 'siswa', specificId?: string) => {
    const allUsers = db.getAllUsers();
    if (role === 'admin') {
      const admin = specificId ? allUsers.find((u) => u.id === specificId) : allUsers.find((u) => u.role === 'admin');
      if (admin) {
        db.setCurrentUser(admin);
        setUser(admin);
        setToken(db.getAuthToken());
      }
    } else {
      const student = specificId ? allUsers.find((u) => u.id === specificId) : allUsers.find((u) => u.role === 'siswa');
      if (student) {
        db.setCurrentUser(student);
        setUser(student);
        setToken(db.getAuthToken());
      }
    }
  };

  const logout = () => {
    db.setCurrentUser(null);
    setUser(null);
    setToken(null);
  };

  const refreshUser = () => {
    const currentUser = db.getCurrentUser();
    setUser(currentUser);
    setToken(db.getAuthToken());
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'siswa';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isStudent,
        loginAsStudent,
        loginAsAdmin,
        changeStudentPassword,
        quickDemoLogin,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
