import { Component } from '@angular/core'
import { AppService } from '../app.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent {
  public siteUrl: string = window.location.origin
  public name: string
  public email: string
  public generatedId: number
  public loading: boolean

  constructor(
    private _appService: AppService,
    private _snackBar: MatSnackBar
  ) {}

  public generatePage(name: string, email: string) {
    this.loading = true
    this._appService.generateUserPage(name, email).subscribe(
      (response) => {
        this.generatedId = response.id
        this.loading = false
        this._snackBar.open('Page created successfully', 'Error', {
          duration: 5000,
        })
      },
      (response) => {
        this.loading = false
        this._snackBar.open(response.error.message, 'Error', {
          duration: 5000,
        })
      }
    )
  }
}
