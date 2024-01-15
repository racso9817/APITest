import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-flask',
  templateUrl: './flask.component.html',
  styleUrl: './flask.component.css'
})
export class FlaskComponent implements OnInit {

  form!: FormGroup
  payment_link: any
  validity: boolean = false

  get validityTimeControl() {
    return this.form.controls['validityTime'] as FormControl
  }

  constructor(private payment: PaymentService) { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm() {
    this.form = new FormGroup({
      validityTime: new FormControl('', [Validators.required])
    })
  }

  verifyNumberInput(event: any) {
    const input = event.target
    const valorActual = input.value
    const nuevoValor = valorActual.replace(/[^0-9]/g, '')

    if(nuevoValor !== valorActual){
      input.value = nuevoValor
    }
  }

  onSubmit(){
    const validityTime = this.validityTimeControl.value
    console.log(validityTime)
    try {
      this.payment.payment(validityTime).subscribe(
        res => {
          this.payment.checkLinkValid(validityTime).subscribe(validez=>{
            if(validez){
              this.validity = validez
              if(res.valid){
                this.payment_link = res.approval_url
              }
            } else {
              this.validity = validez
              this.payment_link = null
            }
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

}
