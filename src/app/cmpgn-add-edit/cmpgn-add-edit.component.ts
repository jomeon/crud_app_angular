import { Component, Inject,OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
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
import { CampaignService } from '../services/campaign.service';
import { DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../core/core.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';


interface City {
  value: string;
  viewValue: string;
}
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-cmpgn-add-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule,FormsModule,ReactiveFormsModule,NgbModule,MatChipsModule,MatIconModule,   FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe],
  templateUrl: './cmpgn-add-edit.component.html',
  styleUrl: './cmpgn-add-edit.component.scss',
})
export class CmpgnAddEditComponent implements OnInit{
  cmpgnForm: FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['please', 'hire', 'me', 'performance','finish','dose','cope','cabinet','employee'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  cities: City[] = [
    {value: 'city-0', viewValue: 'City1'},
    {value: 'city-1', viewValue: 'City2'},
    {value: 'city-2', viewValue: 'City3'},
  ];


  constructor(private _fb: FormBuilder, private _cmpgnService: CampaignService, private _dialogRef: MatDialogRef<CmpgnAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService) {
    this.cmpgnForm = this._fb.group(
      {
        campaignName: ['', Validators.required],
        keywords: [''],
        bidAmmount: ['',Validators.required],
        campaignFund: ['',Validators.required],
        selectStatus: ['',Validators.required],
        town: '',
        radius: ['',Validators.required],

      }
      
    );
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );

  }
  ngOnInit(): void {
    this.cmpgnForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.cmpgnForm.valid)
    {
      this.cmpgnForm.get('keywords')?.setValue(this.fruits);
      if(this.data)
      {
        this._cmpgnService.updateCampaign(this.data.id, this.cmpgnForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Campaign updated successfuly','done');
            this._dialogRef.close(true);
  
          },
          error: (err: any) =>{
            console.error(err);
          },
        });
      } else{
        this._cmpgnService.addCampaign(this.cmpgnForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Campaign added successfuly','done');
            this._dialogRef.close(true);
            
          },
          error: (err: any) =>{
            console.error(err);
          },
        });
      }
     
      //console.log(this.cmpgnForm.value);
    }
  }
}
