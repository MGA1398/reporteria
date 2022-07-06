import { Component, OnInit } from '@angular/core';
import {Transaction} from "../models/transaction";
import {TransactionService} from "../services/transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

  delete(transaction: Transaction): void {
    this.transactions = this.transactions.filter(h => h !== transaction);
    this.transactionService.deleteTransaction(transaction.id).subscribe();
  }

}
