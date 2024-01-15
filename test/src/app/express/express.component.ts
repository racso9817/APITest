import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrl: './express.component.css'
})
export class ExpressComponent implements OnInit {

  form!: FormGroup
  private archivoPDF: File | null = null;
  private archivoP12: File | null = null;

  get certificadoControl() {
    return this.form.get('certificado') as FormControl;
  }
  get archivoControl() {
    return this.form.get('archivo') as FormControl;
  }
  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.generateForm();
  }

  seleccionarPDF(event: any) {
    this.archivoPDF = (event.target as HTMLInputElement).files![0];
  }

  seleccionarP12(event: any) {
    this.archivoP12 = (event.target as HTMLInputElement).files![0];
  }

  generateForm(){
    this.form = new FormGroup({
      certificado: new FormControl('',[Validators.required]),
      archivo: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  onSubmit(){
    if(this.archivoPDF && this.archivoP12){
      const formData = new FormData()
      formData.append('pdf', this.archivoPDF, this.archivoPDF.name)
      formData.append('p12', this.archivoP12, this.archivoP12.name)
      formData.append('password', this.passwordControl.value)

      this.http.post('http://localhost:3000/firmar-pdf', formData, {responseType: 'blob'})
        .subscribe(
          (response: Blob) => {          
            const fileURL = URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'pdf-firmado.pdf';
            link.click();
          },
          error => console.error(error)
        )
    }
  }

}
