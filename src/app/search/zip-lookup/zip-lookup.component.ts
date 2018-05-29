import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zip-lookup',
  templateUrl: './zip-lookup.component.html',
  styleUrls: ['./zip-lookup.component.css']
})
export class ZipLookupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onZipSearch(form){
    //this.model.findSchoolsByZip(form.zip)
    this.router.navigate(['search', 'zip', form.zip])
  }

}
