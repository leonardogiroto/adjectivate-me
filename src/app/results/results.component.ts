import { Component, AfterViewInit } from '@angular/core'
import { AppService } from '../app.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { ChartOptions } from 'chart.js'
import { Label, SingleDataSet } from 'ng2-charts'
import { Adjectivation } from '../interfaces/adjectivation.interface'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements AfterViewInit {
  public userId: string
  public siteUrl: string = window.location.origin
  public pieChartOptions: ChartOptions = {
    responsive: true,
  }
  public pieChartLabels: Array<Label>
  public pieChartData: SingleDataSet

  constructor(
    private _appService: AppService,
    private _snackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.userId = this._activatedRoute.snapshot.params['personId']
    this._appService.getUserResults(this.userId).subscribe(
      (response: Array<Adjectivation>) => {
        this.pieChartLabels = response.map((x) => x.adjective)
        this.pieChartData = response.map((x) => x.count)
      },
      () => {
        this._snackBar.open(
          'An error has occurred, please try again',
          'Error',
          {
            duration: 4000,
          }
        )
      }
    )
  }
}
