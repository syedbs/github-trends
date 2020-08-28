import {Component, OnDestroy, OnInit} from '@angular/core';
import {GithubTrendsService} from '../../services/github/github-trends.service';
import {forkJoin} from 'rxjs';
import {Router} from '@angular/router';

interface Paginate {
  totalPage: number;
  currentPage: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  loading = false;
  hasResults = false;
  searchKey = '';
  userList: any = [];
  repoList: any = [];
  userPaginate: Paginate = {
    totalPage: 0,
    currentPage: 1
  };
  repoPaginate: Paginate = {
    totalPage: 0,
    currentPage: 1
  };
  tabId = 1;
  private sub: any;
  private sub2: any;
  private sub3: any;

  constructor(private git: GithubTrendsService, private router: Router) { }

  ngOnInit(): void {}

  search(){
    this.loading = true;
    this.sub = forkJoin([this.git.searchByUser(this.searchKey),this.git.searchByRepo(this.searchKey)])
      .subscribe((results)=>{
        this.loading = false;
        this.hasResults = true;
        this.setUserList(results[0]);
        this.setRepoList(results[1]);

      },error => {
        this.loading = false;
        this.hasResults = false;
      });
  }

  searchByUser(page?){
    this.loading = true;
     this.sub2 = this.git.searchByUser(this.searchKey,page).subscribe((data: any) => {
      this.loading = false;
      this.setUserList(data,page);
    }, error => {
      this.loading = false;
      this.hasResults = false;
    });
  }

  setUserList(data,page?) {
    this.userList = data.items;
    this.userPaginate.totalPage = data.total_count ? Math.ceil(data.total_count / 10) : 0 ;
    page && (this.userPaginate.currentPage = page);
  }

  searchByRepo(page?){
    this.loading = true;
    this.sub3 = this.git.searchByRepo(this.searchKey, page).subscribe((data: any) => {
      this.loading = false;
      this.setRepoList(data,page);
    }, error => {
      this.loading = false;
      this.hasResults = false;
    });
  }

  setRepoList(data,page?) {
    this.repoList = data.items;
    this.repoPaginate.totalPage = data.total_count ? Math.ceil(data.total_count / 10) : 0 ;
    page && (this.repoPaginate.currentPage = page);
  }

  changeTab(number: number) {
    this.tabId = number;
  }

  viewDetails(user, id){
    this.router.navigate(['details',user,id])
  }
  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
    this.sub2 && this.sub2.unsubscribe();
    this.sub3 && this.sub3.unsubscribe();
  }
}
