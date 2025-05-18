export type IItem = {
  name: string;
  description: string;
  amount: number;
  paid?: boolean;
  userId?: string;
  _id?: string;
};

export type IItemPaidUpdate = {
  paid: boolean;
};

export type FormState =
| {
    errors?: {
      name?: string[]
      surname?: string[]
      username?: string[]
      email?: string[]
      password?: string[]
    }
    message?: string
  }
| undefined

export type ItemFormState =
| {
    errors?: {
      item?: string[]
      description?: string[]
      amount?: string[]
    }
    message?: string
  }
| undefined

export type IncomeFormState =
| {
    errors?: {
      item?: string[]
      description?: string[]
      amount?: string[]
    }
    message?: string
  }
| undefined
