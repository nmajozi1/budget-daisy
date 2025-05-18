'use server'

import { redirect } from "next/navigation";
import { SignInFormSchema, SignUpFormSchema } from "../lib/definitions";
import db_connect from "../db/db-server";
import UserModel from "../db/user.model";
import { cookies } from "next/headers";
import { FormState } from "../types/item.type";
import { TUser } from "../types/user.type";

export const register = async (state: FormState, formData: FormData) => {
  const userData = SignUpFormSchema.safeParse({
    name: formData.get('name'),
    surname: formData.get('surname'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (userData.success) {
    await db_connect();
    const User = new UserModel(userData.data);
    await User.save();
    redirect('/');
  }

  return { success: false, message: 'failed to register new user', open: false, error: userData?.error?.flatten().fieldErrors };
}

export const login = async (state: FormState, formData: FormData) => {
  const cookieStore = await cookies();

  const userData = SignInFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password')
  });

  if (userData.success) {
    await db_connect();
    const user = await UserModel.findOne(userData?.data);
    if (user?._id) {
      cookieStore.set('id', user?._id);
      redirect(`/home`);
    }

    return { success: false, message: 'Incorrect username or password.', open: true }
  };

  return { success: false, message: 'failed to log in', open: false, error: userData?.error?.flatten().fieldErrors };
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('id');
  redirect('/');
}

export const fetchUser = async (id: string | string[] | undefined) => {
  try {
    const user = await UserModel.findById(id);
    return user.items;
  } catch (error) {
    return {success: false, message: error}
  }
}

export const goToRegister = async () => redirect('/register');
export const goToLogin = async () => redirect('/login');

export const listUsers = async () => {
  const user = await UserModel.find();
  console.log('USER: ', user);
}

export const findUserById = async (id: string | undefined) => {
  const user: TUser | null = await UserModel.findById(id);

  if (user) {
    return {success: true, message: user};
  }

  return {success: false, message: null, error: 'error finding the user' }
}




