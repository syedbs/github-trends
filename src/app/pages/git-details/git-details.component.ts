import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GithubTrendsService} from '../../services/github/github-trends.service';

@Component({
  selector: 'app-git-details',
  templateUrl: './git-details.component.html',
  styleUrls: ['./git-details.component.sass']
})
export class GitDetailsComponent implements OnInit, OnDestroy {

  loading = true;
  isUser = true;
  data: any = {};
  private sub: any;
  private sub2: any;

  constructor(private route: ActivatedRoute, private git: GithubTrendsService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params['type'] == 'user'){
        this.sub2 = this.git.userDetail(params['id']).subscribe(data=>{
          this.data = data;
          this.loading = false;
        },error => this.loading = false)
      }else {
        this.isUser = false
        this.git.repoDetail(params['type'],params['id']).subscribe(data=>{
          this.data = data;
          this.loading = false;
        },error => this.loading = false);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2 && this.sub2.unsubscribe();
  }

}
