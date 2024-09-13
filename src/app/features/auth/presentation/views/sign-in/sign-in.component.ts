import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppRoutes } from '@app/utils/libraries/app-routes';
import { ISignInGoogleUseCase } from '@app/features/auth/application/interfaces/sign-in-google.interface';
import { ISignInUseCase } from '@app/features/auth/application/interfaces/sign-in.interface';
import { IStateUseCase } from '@app/features/auth/application/interfaces/state.interface';
import { SIGN_IN_GOOGLE_TOKEN, SIGN_IN_TOKEN, STATE_AUTH_TOKEN } from '@app/shared/tokens/shared.token';

export interface IForm {
  email: FormControl,
  password: FormControl
}
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export default class SignInComponent implements OnInit {

  authForm !: FormGroup<IForm>;
  email = 'a94@gmail.com';
  password = '123456';

  constructor(
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    @Inject(SIGN_IN_GOOGLE_TOKEN) private readonly _signInGoogleUseCase: ISignInGoogleUseCase,
    @Inject(SIGN_IN_TOKEN) private readonly _signInUseCase: ISignInUseCase,
    @Inject(STATE_AUTH_TOKEN) private readonly _stateUseCase: IStateUseCase,
  ) { }
  async ngOnInit() {
    this.initForm();
    const res = await this._stateUseCase.execute();
    console.log(res);
  }

  initForm() {
    this.authForm = this._fb.group<IForm>({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  async onSubmit() {
    if (!this.authForm.valid) return;

    const { email, password } = this.authForm.getRawValue();
    const userCredential = await this._signInUseCase.execute(email, password);
    console.log({ userCredential })
    if (!userCredential) return;

    this._redirectDashboard();
  }

  async signInGoogle() {
    const credential = await this._signInGoogleUseCase.execute();
    if (!credential) {
      return;
    }
    console.log({ credential });
    this._redirectDashboard();
  }

  private _redirectDashboard(): void {
    this._router.navigateByUrl(AppRoutes.DASHBOARD_BASE);
  }
}
