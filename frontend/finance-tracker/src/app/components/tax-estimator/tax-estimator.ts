import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-tax-estimator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tax-estimator.html',
  styleUrl: './tax-estimator.scss'
})
export class TaxEstimator implements OnInit {
  totalIncome = 0;
  totalExpense = 0;
  netProfit = 0;
  taxRate = 0;
  estimatedTax = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(data => {
      this.totalIncome = data
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      this.totalExpense = data
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      this.netProfit = this.totalIncome - this.totalExpense;
      this.calculateTax();
    });
  }

  calculateTax() {
    if (this.netProfit <= 250000) {
      this.taxRate = 0;
    } else if (this.netProfit <= 500000) {
      this.taxRate = 5;
    } else if (this.netProfit <= 1000000) {
      this.taxRate = 20;
    } else {
      this.taxRate = 30;
    }
    this.estimatedTax = (this.netProfit * this.taxRate) / 100;
  }
}