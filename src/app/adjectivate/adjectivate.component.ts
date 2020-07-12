import { Component, OnInit } from '@angular/core'
import { AppService } from '../app.service'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from '../interfaces/user.interface'

@Component({
  selector: 'app-adjectivate',
  templateUrl: './adjectivate.component.html',
  styleUrls: ['./adjectivate.component.scss'],
})
export class AdjectivateComponent implements OnInit {
  public adjectives: Array<string> = []
  public selectedAdjective: string
  public loading = false

  public user: User
  private _userId: string

  constructor(
    private _appService: AppService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._userId = this._activatedRoute.snapshot.params['personId']
    this._getUser(this._userId)
    this._getRandomAdjectives()
  }

  public selectAdjective(adjective: string) {
    this.selectedAdjective =
      this.selectedAdjective === adjective ? '' : adjective
  }

  public getButtonColor(adjective: string) {
    return this.selectedAdjective === adjective ? 'accent' : ''
  }

  public saveAndGetAdjectives() {
    this._saveAdjectives()
    this._getRandomAdjectives()
  }

  private _getUser(userId: string) {
    this._appService.getUSer(userId).subscribe(
      (response) => {
        this.user = response
      },
      (response) => {
        this._snackBar.open(response.error.message, 'Error', {
          duration: 4000,
        })
      }
    )
  }

  private _saveAdjectives() {
    this.loading = true
    this._appService
      .adjectivateUser(this._userId, this.selectedAdjective)
      .subscribe(
        () => {
          this.selectedAdjective = ''
          this.loading = false
          this._snackBar.open('Saved successfully!', '', {
            duration: 4000,
          })
        },
        () => {
          this.loading = false
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

  private _getRandomAdjectives() {
    this._appService.getRandomAjectives(4).subscribe(
      (response) => {
        this.adjectives = response
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
