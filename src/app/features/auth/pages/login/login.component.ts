import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ApiResponseOfLoginResponse, LoginRequest } from '../../../../api/api-client';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';
import { IError } from '../../../../shared/interfaces/error.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
    selector: 'login-page',
    imports: [ReactiveFormsModule, ButtonModule, InputTextModule, RippleModule, PasswordModule, Message],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    animations: [
        trigger('errorSlide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
            ])
        ])
    ]
})
export class LoginComponent {
    private _authService = inject(AuthService);
    private _router = inject(Router);

    loading = signal(false);
    error: WritableSignal<Partial<IError> | null> = signal<Partial<IError> | null>(null);

    form = inject(FormBuilder).group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading.set(true);
        this.error.set(null);

        const loginData = this.form.value as LoginRequest;

        this._authService.login(loginData).subscribe({
            next: (res: ApiResponseOfLoginResponse) => {
                this.loading.set(false);
                if (res && res.data?.token) {
                    this._authService.saveDataUser(res.data);
                    console.log('Connexion réussie');
                    this.error.set(null); // ✅ réinitialise l'erreur
                    // Ici tu peux naviguer ou autre
                    this._router.navigate(['']);
                } else {
                    console.warn('Échec de la connexion');
                    this.error.set({ message: 'Connexion impossible. Réponse invalide.' });
                }
            },
            error: (err: IError) => {
                this.loading.set(false);
                console.error('Erreur de connexion :', err);
                this.error.set(err); // ✅ mettre à jour un signal
            }
        });
    }
}
