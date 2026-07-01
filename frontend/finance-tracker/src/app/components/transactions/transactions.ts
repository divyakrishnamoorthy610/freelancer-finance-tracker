import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  transactions: any[] = [];
  newTransaction = {
    description: '',
    amount: 0,
    type: 'income',
    category: '',
    date: ''
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  addTransaction() {
    this.transactionService.addTransaction(this.newTransaction).subscribe(() => {
      this.loadTransactions();
      this.newTransaction = {
        description: '',
        amount: 0,
        type: 'income',
        category: '',
        date: ''
      };
    });
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id).subscribe(() => {
      this.loadTransactions();
    });
  }
}