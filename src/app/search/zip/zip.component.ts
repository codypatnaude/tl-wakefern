import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit{

  constructor(protected route: ActivatedRoute, private model: SearchService, public loaderService: LoaderService) { }

  schools = null;
  zip;
  ngOnInit() {
    this.loaderService.show();
    this.zip = this.route.snapshot.params['zip'];
    this.model.findSchoolsByZip(this.zip)
    .subscribe(res=>{
      this.schools = res;
      this.loaderService.hide();
    });
  }

}
