import { Component, computed, effect, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  dataSource = input<any>([], { alias: 'dataSource' });

  displayedColumns: string[] = ['description', 'amount', 'date', 'category', 'option'];

}
