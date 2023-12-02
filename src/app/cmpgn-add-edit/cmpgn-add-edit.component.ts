import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of,OperatorFunction} from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

interface City {
  value: string;
  viewValue: string;
}
const states: { name: string }[] = [
	{ name: 'Alabama' },
	{ name: 'Alaska' },
	{ name: 'Arizona' },
	{ name: 'Arkansas' },
	{ name: 'California' },
	{ name: 'Colorado' },
	{ name: 'Connecticut' },
	{ name: 'Delaware' },
	{ name: 'Florida' },
	{ name: 'Georgia' },
	{ name: 'Hawaii' },
	{ name: 'Idaho' },
	{ name: 'Illinois' },
	{ name: 'Indiana' },
	{ name: 'Iowa' },
	{ name: 'Kansas' },
	{ name: 'Kentucky' },
	{ name: 'Louisiana' },
	{ name: 'Maine' },
	{ name: 'Maryland' },
	{ name: 'Massachusetts' },
	{ name: 'Michigan' },
	{ name: 'Minnesota' },
	{ name: 'Mississippi' },
	{ name: 'Missouri' },
	{ name: 'Montana' },
	{ name: 'Nebraska' },
	{ name: 'Nevada' },
	{ name: 'New Hampshire' },
	{ name: 'New Jersey' },
	{ name: 'New Mexico' },
	{ name: 'New York' },
	{ name: 'North Carolina' },
	{ name: 'North Dakota' },
	{ name: 'Ohio' },
	{ name: 'Oklahoma' },
	{ name: 'Oregon' },
	{ name: 'Pennsylvania' },
	{ name: 'Rhode Island' },
	{ name: 'South Carolina' },
	{ name: 'South Dakota' },
	{ name: 'Tennessee' },
	{ name: 'Texas' },
	{ name: 'Utah' },
	{ name: 'Vermont' },
	{ name: 'Virginia' },
	{ name: 'Washington' },
	{ name: 'West Virginia' },
	{ name: 'Wisconsin' },
	{ name: 'Wyoming' },
];

@Component({
  selector: 'app-cmpgn-add-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule,FormsModule,ReactiveFormsModule,NgbModule],
  templateUrl: './cmpgn-add-edit.component.html',
  styleUrl: './cmpgn-add-edit.component.scss',
})
export class CmpgnAddEditComponent {
  cmpgnForm: FormGroup;

  cities: City[] = [
    {value: 'city-0', viewValue: 'City1'},
    {value: 'city-1', viewValue: 'City2'},
    {value: 'city-2', viewValue: 'City3'},
  ];

  prePopulatedKeywords = ['please', 'hire', 'me', 'performance','finish','dose','cope','cabinet','employee'];

  
  selecter = (result: string) => result;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? this.prePopulatedKeywords : this.prePopulatedKeywords.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );



formatter =  (result: string) => result;
    
  constructor(private _fb: FormBuilder) {
    this.cmpgnForm = this._fb.group(
      {
        campaignName: ['', Validators.required],
        keywords: ['',Validators.required],
        bidAmmount: ['',Validators.required],
        campaingFund: ['',Validators.required],
        selectStatus: ['',Validators.required],
        town: '',
        radius: ['',Validators.required],

      }
    );

  }
  onFormSubmit(){
    if(this.cmpgnForm.valid)
    {
      console.log(this.cmpgnForm.value);
    }
  }
}
