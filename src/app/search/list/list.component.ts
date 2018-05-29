import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list;

  constructor(private route: ActivatedRoute, private model: SearchService, public loaderService: LoaderService) { }

  ngOnInit() {
    let listId = this.route.snapshot.params['id'];
    this.loaderService.show();
    this.model.getList(listId)
    .subscribe(res=>{
      this.loaderService.hide();
      this.list = res
    })
  }

  resetList(){
    return true;
  }

}
