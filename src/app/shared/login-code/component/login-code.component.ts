import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login-code',
  templateUrl: './login-code.component.html',
  styleUrls: ['./login-code.component.scss']
})
export class LoginCodeComponent implements OnInit {

  @ViewChild('start') startInput: ElementRef | null;
  @ViewChild('end') endInput: ElementRef | null;
  @ViewChild('def') defInput: ElementRef | null;

  public focus: boolean;
  public codeGroup: FormGroup;
  public codeStatus: boolean;
  public valid: boolean;
  public intervalUnsubscribe$: Subject<void>;

  constructor(private authentication: AuthenticationService) {
    this.intervalUnsubscribe$ = new Subject<void>();
    this.codeStatus = false;
    this.valid = false;
    this.startInput = null;
    this.endInput = null;
    this.defInput = null;
    this.focus = false;
    this.codeGroup = new FormGroup({
      start: new FormControl('', [Validators.required, Validators.minLength(3)]),
      end: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
    this.codeGroup.statusChanges.subscribe(res => {
      if (res === 'VALID') {
        const code: string = this.codeGroup.get('start')?.value + this.codeGroup.get('end')?.value;
        const email: string = localStorage.getItem('userEmail') || '';
        this.authentication.codeCheck(email, code).pipe(
          filter((data: any) => {
            if (data.status === 200) {
              return true;
            }
            this.codeStatus = true;
            return false;
          }),
          switchMap(flow => {
            this.codeStatus = false;
            return interval(1000).pipe(takeUntil(this.intervalUnsubscribe$));
          })
        ).subscribe((tick: any) => {
          this.valid = true;
          if (tick === 3) {
            this.valid = false;
            this.authentication.login(email, code);
            this.intervalUnsubscribe$.next();
            this.intervalUnsubscribe$.complete();
          }
        });
      }
    });
  }

  focusIn(event: any): void {
    this.focus = true;
    event.target.selectionStart = event.target.value.length;
  }

  focusOut(): void {
    this.focus = false;
  }

  changeFocusStartInput(event: any): void {
    if (event.target.value.length === 3) {
      this.endInput?.nativeElement.focus();
    }
  }

  changeFocusEndInput(event: any): void {
    if (event.target.value.length === 3) {
      this.defInput?.nativeElement.focus();
    }
    if (event.target.value.length === 0) {
      this.startInput?.nativeElement.focus();
    }
  }

  setSelectionStart(event: any): void {
    event.target.selectionStart = event.target.value.length;
  }

  submitCode(code: string, email: string): void {
    this.authentication.login(email, code);
  }

}
