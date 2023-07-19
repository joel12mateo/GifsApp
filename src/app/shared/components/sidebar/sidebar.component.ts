
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsModule } from '../../../gifs/gifs.module';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){ }
     get tags(){
      return this.gifsService.tagsHistory;
  }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  btnsearchTag(tag: string)
  {
    this.gifsService.searchTag(tag);
  }

}
