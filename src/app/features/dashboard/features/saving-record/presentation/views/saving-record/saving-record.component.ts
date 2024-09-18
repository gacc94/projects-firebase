import { CurrencyPipe } from '@angular/common';
import { Component, computed, Inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CREATE_SAVING_RECORD_TOKEN } from '@app/shared/tokens/shared.token';
import { ICreateUseCase } from '../../../application/interfaces/create.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { ISavingRecod } from '../../../domain/interfaces/saving-record.interface';

export interface IFormRecord {
  date: FormControl<any>;
  amount: FormControl<any>;
  category: FormControl<any>;
  description: FormControl<any>;
}

@Component({
  selector: 'app-saving-record',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardTitle,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatButtonModule,
    TableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './saving-record.component.html',
  styleUrl: './saving-record.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter()],
})
export default class SavingRecordComponent implements OnInit {

  form = signal<FormGroup<IFormRecord> | any>({});
  income = signal<number>(6000);
  totalExpense = signal<number>(300);
  total = computed<number>((): number => this.income() - this.totalExpense());
  dataSource = signal<ISavingRecod[]>([]);

  constructor(
    private readonly _fb: FormBuilder,
    @Inject(CREATE_SAVING_RECORD_TOKEN) private readonly _createUseCase: ICreateUseCase
  ) { }

  ngOnInit(): void {
    this._initForm();
    console.log(Boolean(this.form().value));
    console.log(this.form().value);
  }

  private _initForm(): void {
    this.form!.set(this._fb.group({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl(0),
      // currency: [''],
      date: new FormControl(new Date()),
      category: new FormControl('1'),
    }));
  }

  async onSubmit(): Promise<void> {
    if (!this.form()?.valid) return;

    const { date, amount, category, description } = this.form().getRawValue();

    this.dataSource.update((value: Array<ISavingRecod>) => {
      return [...value, {
        date: this._convertirFechaConIntl(date),
        amount,
        category,
        description,
      }];
    })
  }

  private _convertirFechaConIntl(fecha: Date): string {
    return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(fecha);
  }
}
