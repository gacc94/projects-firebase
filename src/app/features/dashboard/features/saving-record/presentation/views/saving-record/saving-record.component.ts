import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, Inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
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
import { merge, mergeMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

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
    DialogConfirmComponent,
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
    private readonly _dialog: MatDialog,
    @Inject(CREATE_SAVING_RECORD_TOKEN) private readonly _createUseCase: ICreateUseCase,
  ) {
    effect(() => {
      console.log(this.totalExpense());
    })
  }

  ngOnInit(): void {
    this._initForm();
    console.log(Boolean(this.form()!.value!));
    console.log(this.form()!.value);

    this.form().controls['category'].valueChanges.subscribe({
      next: (value: string) => {
        console.log({ value });
        const valueOption = Number(value);
        const expenseValue = this.form().controls['amount'].value;
        if (this.total() < expenseValue && value === '2') {
          this._openDialog();
        }
        if (this.total() < expenseValue && value === '1') {
          (this.form() as FormGroup)
        }
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form()!.valid) return;

    const formValue = this.form()!.getRawValue();
    const savingRecod = this._objDataTransformDate(formValue);

    if (formValue.category === '1') {
      this.income.update((income: number): number => income + Number(formValue.amount));
    }

    if (formValue.category === '2') {
      if (this.total() < formValue.amount) {
        this._openDialog(formValue.amount);
      } else {
        this._updateTotalExpense(formValue.amount);
      }
    }

    this.dataSource.update((value: Array<ISavingRecod>) => [...value, savingRecod])
  }

  isDisabledButton(): boolean {
    return !this.form().valid!;
  }

  private _convertirFechaConIntl(fecha: Date): string {
    return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(fecha);
  }

  private _objDataTransformDate({ date, amount, category, description }: any): ISavingRecod {
    return {
      date: this._convertirFechaConIntl(date),
      amount,
      category,
      description,
    }
  }

  private _initForm(): void {
    this.form!.set(this._fb.group({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl(new Date()),
      category: new FormControl('1'),
    }));
  }

  private _updateTotalExpense(amount: number = 0) {
    this.totalExpense.update((expense: number) => expense + amount);
  }

  private _openDialog(amount?: number) {
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      data: {},
      maxWidth: '350px',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this._updateTotalExpense(amount);
        }
      }
    })
  }

}
