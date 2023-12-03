import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { CmpgnAddEditComponent } from './cmpgn-add-edit/cmpgn-add-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CampaignService } from './services/campaign.service';
import { HttpClientModule } from '@angular/common/http';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CoreService } from './core/core.service';
import { BudgetService } from './services/budget.service';
// tu chyba nie trzeba tych importow

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule,HttpClientModule, MatTableModule,MatPaginatorModule,MatSortModule,MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'campaignName', 'keywords', 'bidAmmount', 'campaignFund', 'selectStatus', 'town', 'radius', 'action'];
  dataSource!: MatTableDataSource<any>;
  currentBudget!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog, private _cmpgnService: CampaignService, private _coreService: CoreService, private _budgetService: BudgetService) {

  }

  ngOnInit(): void {
    this.getCampaignList();
    this.getBudgetOnSite();
  }
  
  openAddEditCmpgnForm() {
    const dialogRef = this._dialog.open(CmpgnAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getCampaignList();
          this.getBudgetOnSite();
        }

      },
    })
  }
  getBudgetOnSite(){
    this._budgetService.getBudget().subscribe(budget => {
      this.currentBudget = budget.amount;
  });
  }

  getCampaignList(){
    this._cmpgnService.getCampaingList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteCampaign(id: number){
    this._cmpgnService.deleteCampaign(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Campaign removed succesfuly!','done');
        this.getCampaignList();
      },
      error: console.log,
    })
  }

  openEditCmpgnForm(data: any) {
    const dialogRef = this._dialog.open(CmpgnAddEditComponent, {
      data: data,
    
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getBudgetOnSite();
          this.getCampaignList();
        }

      },

    })
  
  
  }
}
