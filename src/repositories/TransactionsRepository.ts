import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Payload {
  type: string;
  value: number;
}

const INITIAL_STATE = {
  income: 0,
  outcome: 0,
  total: 0,
};

export const INCOME = 'income';
export const OUTCOME = 'outcome';

const transactionsReducer = (state: Balance, transaction: Payload): Balance => {
  const payload = Number(transaction.value);
  switch (transaction.type) {
    case INCOME:
      return { ...state, income: state.income + payload };
    case OUTCOME:
      return { ...state, outcome: state.outcome + payload };
    default:
      return INITIAL_STATE;
  }
};

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const { income, outcome } = transactions.reduce(
      transactionsReducer,
      INITIAL_STATE,
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
