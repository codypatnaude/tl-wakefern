import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { LoaderService } from '../../services/loader/loader.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  lists = null;
  school = null;
  
  constructor(private route: ActivatedRoute, private model: SearchService, public loaderService: LoaderService) { }

  ngOnInit() {
    let schoolId = this.route.snapshot.params['id'];
    this.loaderService.show();
    forkJoin(
      this.model.getSchool(schoolId)
        .pipe(tap(res=>this.school = res)
      ),
      this.model.findListsBySchool(schoolId)
        .pipe(tap(res=>this.lists = res)
      )
    )
    .subscribe(responses=>this.loaderService.hide())
  }

}
