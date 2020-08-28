import server from '../ApiEndpoint';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GithubTrendsService {
  constructor(private api: HttpClient) {}

  searchByUser(name, paginate?) {
    return this.api.get(`${server.baseURL}/search/users?q=${name}&per_page=10&page=${paginate || 1}`);
  }
  searchByRepo(name, paginate?) {
    return this.api.get(`${server.baseURL}/search/repositories?q=${name}&per_page=10&page=${paginate || 1}`);
  }

  getTopUsersByCountry(name) {
    return this.api.get(`${server.baseURL}/search/users?q=location:${name}&sort=followers&order=desc&per_page=10&page=1`);
  }

  getTopRepos() {
    return this.api.get(`${server.baseURL}/search/repositories?q=angular&sort=stars&order=desc&per_page=10&page=1`);
  }

  userDetail(name) {
    return this.api.get(`${server.baseURL}/users/${name}`);
  }
  repoDetail(owner, repo) {
    console.log('repo');
    return this.api.get(`${server.baseURL}/repos/${owner}/${repo}`);
  }


}
