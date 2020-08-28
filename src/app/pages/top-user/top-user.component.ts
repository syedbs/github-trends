import {Component, OnDestroy, OnInit} from '@angular/core';
import {GithubTrendsService} from '../../services/github/github-trends.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-user',
  templateUrl: './top-user.component.html',
  styleUrls: ['./top-user.component.sass']
})
export class TopUserComponent implements OnInit,OnDestroy {

  userList: any = [];
  loading= false;
  country= 'bangladesh';
  countryList = [
    'bangladesh', 'india', 'pakistan',  'usa', 'uk','russia'
  ]
  private sub: any;

  constructor(private git: GithubTrendsService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.filter(this.country);
  }

  filter(location){
    this.git.getTopUsersByCountry(location).subscribe(data=>{
      this.userList = data['items'];
      this.loading = false;
    }, error => this.loading = false)
  }

  onSelectCountry(e){
    this.loading = true;
    this.filter(e.target.value);
  }

  viewDetails(user, id){
    this.router.navigate(['details',user,id])
  }
  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

}
