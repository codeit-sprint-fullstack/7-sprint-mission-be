import { UserRepository } from "./userRepository";

export interface UnitOfWork {
  users: UserRepository;
}
export interface TransactionRunner {
  runInTransaction<T>(work: (uow: UnitOfWork) => Promise<T>): Promise<T>;
}
