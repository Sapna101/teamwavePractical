import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  pagecount : any = 1 ;
  searchdata : any = [];
  errorcount = false;
  searchParameters : any = {
    fromdate : null,
    todate : null,
    order : null,
    sort : null,
    que : null,
    accepted : null,
    answers : null,
    body : null,
    closed : null,
    migrated : null,
    tagged : null,
    title : null,
    user : null,
    url : null,
    views : null,
    wiki : null,
  }


  constructor(private http : HttpClient) { }

  ngOnInit() {}

  getstackdata(){
    let newobj = {};
    this.errorcount=false;
    for (const property in this.searchParameters) {
      if(this.searchParameters[property] != null){
        newobj[property] = this.searchParameters[property];
      }
    }
    // let newobj = Object.fromEntries(Object.entries(this.searchParameters).filter(([_, v]) => v != null));
    this.http.get('https://api.stackexchange.com/2.2/search/advanced?site=stackoverflow&page='+this.pagecount,{params:newobj}).subscribe((res) => {
      this.searchdata=res;
      if(this.searchdata.items.length <=0){
        this.errorcount=true;
      }else{
        this.searchdata.items.map((item)=>{
          item.last_activity_date = new Date( item.last_activity_date *1000).toString().substr(0,25);
          item.creation_date = new Date( item.creation_date *1000).toString().substr(0,25);
        });
      }
    });
    //scroll to view list
    var elmntToView = document.getElementById("sectionId");
    elmntToView.scrollIntoView(true);
  }

  setPrevPageCount(){
    this.pagecount--;
    this.getstackdata();
  }

  setNextPageCount(){
    this.pagecount++;
    this.getstackdata();
  }

}
