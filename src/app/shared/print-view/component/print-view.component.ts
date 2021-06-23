import { Component, ElementRef, ViewChild } from '@angular/core';
import { IOrders, IProducts } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.scss']
})
export class PrintViewComponent {
  @ViewChild('order', { static: true }) orderContainer: ElementRef | null;
  public dataOrder: IOrders;
  public dataSourceTable: MatTableDataSource<IProducts>;
  public displayedColumnsItem: string[] = ['productCode', 'productName', 'unit', 'quantity'];
  public dateObj: Date;

  constructor(private route: ActivatedRoute) {
    this.orderContainer = null;
    this.dateObj = new Date();
    this.dataOrder = this.route.snapshot.data.post.data;
    this.dataSourceTable = new MatTableDataSource(this.dataOrder.products);
  }

  download(): void {
    html2canvas(this.orderContainer?.nativeElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'px', [canvas.width * 1.3, canvas.height * 1.3]);
      pdf.addImage(contentDataURL, 'PNG', canvas.width * 0.15, canvas.height * 0.15, canvas.width, canvas.height);
      pdf.save('test');
    });
  }
}
