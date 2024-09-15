import { CurrencyPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-saving-record',
  standalone: true,
  imports: [MatCardModule, MatCardTitle, CurrencyPipe, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule
  ],
  templateUrl: './saving-record.component.html',
  styleUrl: './saving-record.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
})
export default class SavingRecordComponent {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  recordData = [
    {
      title: 'Ingresos',
      monto: 5000.00,
      currency: '$',
    },
    {
      title: 'Gastos',
      monto: 200.00,
      currency: '$',
    },
    {
      title: 'Total',
      monto: 4800.00,
      currency: '$',
    },
  ]
}
