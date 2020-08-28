import {Component, OnDestroy, OnInit} from '@angular/core';
import {GithubTrendsService} from '../../services/github/github-trends.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-repos',
  templateUrl: './top-repos.component.html',
  styleUrls: ['./top-repos.component.sass']
})
export class TopReposComponent implements OnInit, OnDestroy {
  repoList: any = [];
  loading=false;
  private sub: any;

  constructor(private git: GithubTrendsService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.git.getTopRepos().subscribe(data=>{
      this.repoList = data['items'];
      this.loading = false;
    }, error => this.loading = false)
  }

  viewDetails(user, id){
    console.log('called');
    this.router.navigate(['details',user,id])
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

}
