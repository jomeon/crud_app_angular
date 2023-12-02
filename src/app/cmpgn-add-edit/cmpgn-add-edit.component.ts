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

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cmpgn-add-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule,FormsModule,ReactiveFormsModule,NgbModule],
  templateUrl: './cmpgn-add-edit.component.html',
  styleUrl: './cmpgn-add-edit.component.scss',
})
export class CmpgnAddEditComponent implements OnInit{
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
    
  constructor(private _fb: FormBuilder, private _cmpgnService: CampaignService, private _dialogRef: MatDialogRef<CmpgnAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService) {
    this.cmpgnForm = this._fb.group(
      {
        campaignName: ['', Validators.required],
        keywords: ['',Validators.required],
        bidAmmount: ['',Validators.required],
        campaignFund: ['',Validators.required],
        selectStatus: ['',Validators.required],
        town: '',
        radius: ['',Validators.required],

      }
    );

  }
  ngOnInit(): void {
    this.cmpgnForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.cmpgnForm.valid)
    {
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
