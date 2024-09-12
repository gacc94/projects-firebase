import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Auth } from '@app/utils/libraries/app-constant';
import { AuthService } from '@app/features/auth/services/auth.service';
import { AppRoutes } from '@app/utils/libraries/app-routes';

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
    private readonly _activateRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _destroyRef: DestroyRef,
    private readonly _authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = this._fb.group<IForm>({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  async onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const { email, password } = this.authForm.getRawValue();
    const userCredential = await this._authService.signIn(email, password);
    console.log({ userCredential })
    if (!userCredential) {
      return;
    }
    this._redirectDashboard();
  }

  async signInGoogle() {
    const credential = await this._authService.signInGoogleWithPopUp();
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
