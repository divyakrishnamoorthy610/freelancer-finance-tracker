import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  transactions: any[] = [];
  totalIncome = 0;
  totalExpense = 0;
  netProfit = 0;
  estimatedTax = 0;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>('https://freelancer-finance-tracker-backend.onrender.com').subscribe({
      next: (data) => {
        this.transactions = data;
        this.calculateSummary();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error:', err);
      }
    });
  }

  calculateSummary() {
    this.totalIncome = 0;
    this.totalExpense = 0;
    for (let t of this.transactions) {
      if (t.type === 'income') {
        this.totalIncome += Number(t.amount);
      } else if (t.type === 'expense') {
        this.totalExpense += Number(t.amount);
      }
    }
    this.netProfit = this.totalIncome - this.totalExpense;
    this.estimatedTax = this.netProfit * 0.28;
  }
}